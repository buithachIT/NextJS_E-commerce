import { CartItem } from '@/types/cartItem';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, billingInfo, uid } = body;

    const line_items = cart.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email: billingInfo.email,
      metadata: {
        uid: uid.toString(),
        billingInfo: JSON.stringify(billingInfo),
        cart: JSON.stringify(cart),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log('[BODY]', body);
    console.log('[LINE_ITEMS]', line_items);
    console.log('[SESSION_URL]', session.url);

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('[CHECKOUT_SESSION_ERROR]', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      {
        status: 500,
      }
    );
  }
}
