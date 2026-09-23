import { NextResponse } from 'next/server';
import { getEventConfig, createAttendeeRegistration, updateAttendeePayment } from '@/lib/db';
import { createRazorpayOrder, isRazorpayConfigured, getRazorpayKeyId } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, designation, category, event_slug = 'ibc-turns-10' } = body;

    // Strict input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Full name is required (at least 2 characters).' }, { status: 400 });
    }
    const cleanEmail = (email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: 'A valid email address is required for ticket accreditation.' }, { status: 400 });
    }
    const cleanPhone = (phone || '').trim().replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ success: false, error: 'A valid 10-digit phone number is required.' }, { status: 400 });
    }

    const config = await getEventConfig(event_slug);
    if (!config.is_registration_open) {
      return NextResponse.json({
        success: false,
        error: 'Registrations for this conference are currently closed.',
      }, { status: 403 });
    }

    // Server-enforced pricing (client cannot manipulate)
    const userCategory = (category || 'General Delegate').trim();
    const isStudent = userCategory.toLowerCase().includes('student');
    const price = isStudent
      ? (config.student_price_inr !== undefined && config.student_price_inr !== null ? config.student_price_inr : 1000)
      : (config.price_inr !== undefined && config.price_inr !== null ? config.price_inr : 2000);

    // Initial registration record (marked pending for paid events, or free for 0 fee)
    const initialPaymentStatus = price === 0 ? 'free' : 'pending';

    const attendee = await createAttendeeRegistration({
      event_slug,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      organization: organization ? organization.trim() : '',
      designation: designation ? designation.trim() : '',
      category: userCategory,
      fee_amount: price,
      amount_paid: price === 0 ? 0 : 0,
      payment_status: initialPaymentStatus,
    });

    // Complimentary / Free event bypass
    if (price === 0) {
      return NextResponse.json({
        success: true,
        attendee,
        requiresPayment: false,
        price: 0,
        message: 'Accreditation confirmed successfully!',
      });
    }

    // Paid event: Generate Razorpay Order
    if (isRazorpayConfigured()) {
      try {
        const order = await createRazorpayOrder({
          amountInPaise: price * 100,
          currency: 'INR',
          receipt: attendee.ticket_id,
          notes: {
            ticket_id: attendee.ticket_id,
            name: attendee.name,
            email: attendee.email,
            phone: attendee.phone,
            category: attendee.category || userCategory,
            event_slug,
          },
        });

        // Store official Razorpay Order ID on registration
        await updateAttendeePayment(
          { ticket_id: attendee.ticket_id },
          {
            payment_status: 'pending',
            razorpay_order_id: order.id,
            fee_amount: price,
            amount_paid: 0,
          }
        );
        attendee.razorpay_order_id = order.id;

        return NextResponse.json({
          success: true,
          requiresPayment: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: getRazorpayKeyId(),
          ticket_id: attendee.ticket_id,
          price,
          attendee,
        });
      } catch (rzpErr: any) {
        console.error('Razorpay order creation error:', rzpErr);
        return NextResponse.json({
          success: false,
          error: `Payment gateway initialization failed: ${rzpErr.message}`,
        }, { status: 502 });
      }
    }

    // Mock Mode fallback for local testing when API keys are not yet configured in .env
    const mockOrderId = `mock_order_${attendee.ticket_id}_${Date.now()}`;
    await updateAttendeePayment(
      { ticket_id: attendee.ticket_id },
      { payment_status: 'pending', fee_amount: price, amount_paid: 0 }
    );
    attendee.razorpay_order_id = mockOrderId;

    return NextResponse.json({
      success: true,
      requiresPayment: true,
      isMock: true,
      orderId: mockOrderId,
      amount: price * 100,
      currency: 'INR',
      key: 'rzp_test_mock_mode',
      ticket_id: attendee.ticket_id,
      price,
      attendee,
      message: 'Payment gateway initialized in development mode.',
    });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Registration failed.' }, { status: 500 });
  }
}
