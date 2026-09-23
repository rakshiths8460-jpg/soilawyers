import { NextResponse } from 'next/server';
import { updateAttendeePayment, getAttendeeByOrderId, getAttendeeByTicketId } from '@/lib/db';
import { verifyWebhookSignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    // 1. Read raw body as string (CRITICAL: parsing before signature verification breaks HMAC)
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      console.warn('[Webhook Warning] Received webhook without x-razorpay-signature header.');
      return NextResponse.json({ success: false, error: 'Signature header missing.' }, { status: 400 });
    }

    // 2. Cryptographic signature check
    const isValid = verifyWebhookSignature({
      rawBody,
      signature,
    });

    if (!isValid) {
      console.error('[Security Alert] Invalid Razorpay webhook signature detected.');
      return NextResponse.json({ success: false, error: 'Invalid webhook signature.' }, { status: 400 });
    }

    // 3. Parse validated payload
    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error('Failed to parse webhook JSON payload:', parseErr);
      return NextResponse.json({ success: false, error: 'Malformed JSON payload.' }, { status: 400 });
    }

    const eventType = event.event;
    console.log(`[Razorpay Webhook] Received verified event: ${eventType} (ID: ${event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id || 'unknown'})`);

    // 4. Handle Payment Capture & Order Paid
    if (eventType === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      if (payment) {
        const orderId = payment.order_id;
        const paymentId = payment.id;
        const amountInRupees = payment.amount ? Math.round(payment.amount / 100) : undefined;
        const ticketId = payment.notes?.ticket_id;

        const existing = (orderId ? await getAttendeeByOrderId(orderId) : null) ||
                         (ticketId ? await getAttendeeByTicketId(ticketId) : null);

        if (existing) {
          // Idempotent update
          await updateAttendeePayment(
            { ticket_id: existing.ticket_id },
            {
              payment_status: 'paid',
              razorpay_payment_id: paymentId,
              amount_paid: amountInRupees || existing.amount_paid,
            }
          );
          console.log(`[Razorpay Webhook] Successfully marked ticket ${existing.ticket_id} as paid via payment.captured (${paymentId})`);
        } else {
          console.warn(`[Razorpay Webhook] No matching registration found for payment ${paymentId}, order ${orderId}, ticket ${ticketId}`);
        }
      }
    } else if (eventType === 'order.paid') {
      const order = event.payload?.order?.entity;
      if (order) {
        const orderId = order.id;
        const ticketId = order.notes?.ticket_id;
        const existing = (orderId ? await getAttendeeByOrderId(orderId) : null) ||
                         (ticketId ? await getAttendeeByTicketId(ticketId) : null);

        if (existing && existing.payment_status !== 'paid') {
          await updateAttendeePayment(
            { ticket_id: existing.ticket_id },
            { payment_status: 'paid' }
          );
          console.log(`[Razorpay Webhook] Marked ticket ${existing.ticket_id} as paid via order.paid (${orderId})`);
        }
      }
    } else if (eventType === 'payment.failed') {
      const payment = event.payload?.payment?.entity;
      if (payment) {
        const orderId = payment.order_id;
        const ticketId = payment.notes?.ticket_id;
        const existing = (orderId ? await getAttendeeByOrderId(orderId) : null) ||
                         (ticketId ? await getAttendeeByTicketId(ticketId) : null);

        if (existing && existing.payment_status === 'pending') {
          await updateAttendeePayment(
            { ticket_id: existing.ticket_id },
            { payment_status: 'failed' }
          );
          console.log(`[Razorpay Webhook] Marked ticket ${existing.ticket_id} as failed for order ${orderId}`);
        }
      }
    }

    // 5. Always return 200 OK to acknowledge receipt
    return NextResponse.json({ received: true, event: eventType });
  } catch (error: any) {
    console.error('Razorpay webhook processing error:', error);
    // Return 500 so Razorpay retries if an unexpected crash occurred
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
