import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createOrder } from '@/lib/action/order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const rawBody = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return new Response('Missing Stripe signature', { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      bodyBuffer,
      sig,
      webhookSecret
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const billingInfo = JSON.parse(session.metadata?.billingInfo ?? '{}');
      const cart = JSON.parse(session.metadata?.cart ?? '[]');
      const uid = parseInt(session.metadata?.uid ?? '0');

      await createOrder(billingInfo, cart, uid);
      console.log('Order created');
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: unknown) {
    let message = 'Unknown error';

    if (err instanceof Error) {
      message = err.message;
    }

    console.error('Webhook Error:', message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }
}
