import { NextResponse } from 'next/server';
import {
  getAllContactInquiries,
  updateContactInquiryStatus,
  deleteContactInquiry,
  isNeonConfigured
} from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;

    const inquiries = await getAllContactInquiries(search, status);
    const all = await getAllContactInquiries();

    const counts = {
      total: all.length,
      unread: all.filter((i) => i.status === 'unread').length,
      read: all.filter((i) => i.status === 'read').length,
      resolved: all.filter((i) => i.status === 'resolved').length,
      optIns: all.filter((i) => i.opt_in).length,
    };

    return NextResponse.json({
      success: true,
      inquiries,
      counts,
      isNeon: isNeonConfigured(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { inquiry_id, status } = body;

    if (!inquiry_id || !status) {
      return NextResponse.json({ success: false, error: 'inquiry_id and status are required.' }, { status: 400 });
    }

    if (!['unread', 'read', 'resolved'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value.' }, { status: 400 });
    }

    const updated = await updateContactInquiryStatus(inquiry_id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const inquiry_id = searchParams.get('inquiry_id');

    if (!inquiry_id) {
      return NextResponse.json({ success: false, error: 'inquiry_id is required.' }, { status: 400 });
    }

    await deleteContactInquiry(inquiry_id);
    return NextResponse.json({ success: true, message: 'Inquiry deleted.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
