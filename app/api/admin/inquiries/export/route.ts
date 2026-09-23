import { NextResponse } from 'next/server';
import { getAllContactInquiries } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const inquiries = await getAllContactInquiries();

    // Generate CSV
    const headers = [
      'Inquiry ID',
      'Date Submitted',
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Message',
      'Email Opt-In',
      'Status'
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = inquiries.map((inq) => [
      escapeCsv(inq.inquiry_id),
      escapeCsv(new Date(inq.created_at).toLocaleString('en-IN')),
      escapeCsv(inq.name),
      escapeCsv(inq.email),
      escapeCsv(inq.phone || 'N/A'),
      escapeCsv(inq.subject || 'General Inquiry'),
      escapeCsv(inq.message),
      escapeCsv(inq.opt_in ? 'Yes' : 'No'),
      escapeCsv(inq.status)
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="sil-contact-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
