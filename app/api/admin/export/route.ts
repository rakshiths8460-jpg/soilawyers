import { NextResponse } from 'next/server';
import { getAllAttendees } from '@/lib/db';

export async function GET() {
  try {
    const attendees = await getAllAttendees('ibc-turns-10');
    
    // Generate CSV
    const headers = ['Ticket ID', 'Name', 'Email', 'Phone', 'Category', 'Organization', 'Designation', 'Fee (INR)', 'Payment Status', 'Registration Date'];
    const rows = attendees.map(a => [
      a.ticket_id,
      `"${(a.name || '').replace(/"/g, '""')}"`,
      a.email,
      a.phone,
      `"${(a.category || '').replace(/"/g, '""')}"`,
      `"${(a.organization || '').replace(/"/g, '""')}"`,
      `"${(a.designation || '').replace(/"/g, '""')}"`,
      a.amount_paid,
      a.payment_status,
      new Date(a.created_at).toLocaleString('en-IN')
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="IBC_Turns_10_Attendees_${new Date().toISOString().slice(0,10)}.csv"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
