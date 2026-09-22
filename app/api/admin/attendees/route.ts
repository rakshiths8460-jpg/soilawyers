import { NextResponse } from 'next/server';
import { getAllAttendees, getEventConfig, isNeonConfigured } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const attendees = await getAllAttendees('ibc-turns-10', search);
    const config = await getEventConfig('ibc-turns-10');

    const totalRegistrations = attendees.length;
    const totalRevenue = attendees.reduce((acc, a) => acc + (a.amount_paid || 0), 0);
    const seatsRemaining = Math.max(0, (config.max_capacity || 200) - totalRegistrations);

    return NextResponse.json({
      success: true,
      attendees,
      stats: {
        totalRegistrations,
        totalRevenue,
        seatsRemaining,
        maxCapacity: config.max_capacity,
        priceInr: config.price_inr,
        isOpen: config.is_registration_open,
        isNeon: isNeonConfigured(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
