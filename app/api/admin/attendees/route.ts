import { NextResponse } from 'next/server';
import { getAllAttendees, getEventConfig, isNeonConfigured } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const attendees = await getAllAttendees('ibc-turns-10', search);
    const config = await getEventConfig('ibc-turns-10');

    const totalRegistrations = attendees.length;
    const confirmedAttendees = attendees.filter((a) => a.payment_status === 'paid' || a.payment_status === 'free');
    const totalConfirmed = confirmedAttendees.length;
    const totalPaid = attendees.filter((a) => a.payment_status === 'paid').length;
    const totalPending = attendees.filter((a) => a.payment_status === 'pending').length;
    
    // CRITICAL: Total Revenue strictly counts ONLY successfully captured payments (payment_status === 'paid')
    const totalRevenue = attendees
      .filter((a) => a.payment_status === 'paid')
      .reduce((acc, a) => acc + (a.amount_paid || 0), 0);

    // Confirmed delegate seats decrease capacity; abandoned/pending attempts do not lock out real delegates
    const seatsRemaining = Math.max(0, (config.max_capacity || 200) - totalConfirmed);

    return NextResponse.json({
      success: true,
      attendees,
      stats: {
        totalRegistrations,
        totalConfirmed,
        totalPaid,
        totalPending,
        totalRevenue,
        seatsRemaining,
        maxCapacity: config.max_capacity,
        priceInr: config.price_inr,
        studentPriceInr: config.student_price_inr ?? 1000,
        isOpen: config.is_registration_open,
        isNeon: isNeonConfigured(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
