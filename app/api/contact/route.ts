import { NextResponse } from 'next/server';
import { createContactInquiry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, optIn } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message content is required.' }, { status: 400 });
    }

    const inquiry = await createContactInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      opt_in: Boolean(optIn),
    });

    return NextResponse.json({
      success: true,
      inquiry_id: inquiry.inquiry_id,
      message: 'Inquiry successfully submitted to the Secretariat.',
    });
  } catch (err: any) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error while processing inquiry.' },
      { status: 500 }
    );
  }
}
