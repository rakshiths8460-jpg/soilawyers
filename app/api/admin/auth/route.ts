import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    const expected = process.env.ADMIN_PASSWORD || 'sil2026';
    if (passcode === expected) {
      return NextResponse.json({ success: true, token: 'sil-admin-session-active' });
    }
    return NextResponse.json({ success: false, error: 'Incorrect administrator passcode.' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
