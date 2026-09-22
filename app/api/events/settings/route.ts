import { NextResponse } from 'next/server';
import { getEventConfig, isNeonConfigured } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || 'ibc-turns-10';
    const config = await getEventConfig(slug);
    return NextResponse.json({
      success: true,
      config,
      isNeon: isNeonConfigured(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
