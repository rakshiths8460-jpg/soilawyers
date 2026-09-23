import { NextResponse } from 'next/server';
import { getEventConfig, updateEventConfig } from '@/lib/db';

export async function GET() {
  try {
    const config = await getEventConfig('ibc-turns-10');
    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price_inr, student_price_inr, is_registration_open, max_capacity } = body;
    const updated = await updateEventConfig('ibc-turns-10', {
      price_inr: Number(price_inr),
      student_price_inr: student_price_inr !== undefined ? Number(student_price_inr) : undefined,
      is_registration_open: Boolean(is_registration_open),
      max_capacity: Number(max_capacity) || 200,
    });
    return NextResponse.json({ success: true, config: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
