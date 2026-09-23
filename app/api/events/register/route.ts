import { NextResponse } from 'next/server';
import { getEventConfig, createAttendeeRegistration } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, designation, category, event_slug = 'ibc-turns-10' } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email address is required.' }, { status: 400 });
    }
    if (!phone || phone.trim().length < 8) {
      return NextResponse.json({ success: false, error: 'Valid phone number is required.' }, { status: 400 });
    }

    const config = await getEventConfig(event_slug);
    if (!config.is_registration_open) {
      return NextResponse.json({
        success: false,
        error: 'Registrations for this conference are currently closed.',
      }, { status: 403 });
    }

    const userCategory = (category || 'General Delegate').trim();
    const isStudent = userCategory.toLowerCase().includes('student');
    const price = isStudent
      ? (config.student_price_inr !== undefined && config.student_price_inr !== null ? config.student_price_inr : 1000)
      : (config.price_inr !== undefined && config.price_inr !== null ? config.price_inr : 2000);
    const payment_status = price === 0 ? 'free' : 'pending';

    const attendee = await createAttendeeRegistration({
      event_slug,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      organization: organization ? organization.trim() : '',
      designation: designation ? designation.trim() : '',
      category: userCategory,
      amount_paid: price,
      payment_status,
    });

    return NextResponse.json({
      success: true,
      attendee,
      requiresPayment: price > 0,
      price,
      message: 'Registration confirmed successfully!',
    });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Registration failed.' }, { status: 500 });
  }
}
