import { NextResponse } from 'next/server';
import { updateAttendeePayment, getAttendeeByTicketId, getAttendeeByOrderId } from '@/lib/db';
import { verifyPaymentSignature, isRazorpayConfigured } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticket_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, isMock } = body;

    if (!ticket_id) {
      return NextResponse.json({ success: false, error: 'Ticket ID is required for verification.' }, { status: 400 });
    }

    // In mock mode when keys are not configured
    if (isMock || !isRazorpayConfigured()) {
      const mockUpdated = await updateAttendeePayment(
        { ticket_id },
        {
          payment_status: 'paid',
          razorpay_payment_id: razorpay_payment_id || `mock_pay_${Date.now()}`,
        }
      );
      return NextResponse.json({
        success: true,
        message: 'Payment verified in development mock mode.',
        attendee: mockUpdated,
      });
    }

    // Production / Live verification: strict cryptographic signature validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({
        success: false,
        error: 'Missing required Razorpay payment signature parameters.',
      }, { status: 400 });
    }

    const isValid = verifyPaymentSignature({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      console.warn(`[Security Alert] Tampered or invalid Razorpay signature attempt for ticket ${ticket_id}, order ${razorpay_order_id}`);
      return NextResponse.json({
        success: false,
        error: 'Cryptographic signature verification failed. Payment cannot be verified.',
      }, { status: 400 });
    }

    // Verify attendee existence and order correspondence
    const existing = (await getAttendeeByTicketId(ticket_id)) || (await getAttendeeByOrderId(razorpay_order_id));
    if (!existing) {
      return NextResponse.json({
        success: false,
        error: 'No registration record found matching the verified payment order.',
      }, { status: 404 });
    }

    // Idempotent update: mark paid
    const updatedAttendee = await updateAttendeePayment(
      { ticket_id: existing.ticket_id },
      {
        payment_status: 'paid',
        razorpay_payment_id,
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Payment verified and registration confirmed!',
      attendee: updatedAttendee,
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Payment verification failed.',
    }, { status: 500 });
  }
}
