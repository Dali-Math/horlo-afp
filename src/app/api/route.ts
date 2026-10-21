// app/api/create-checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',

      // Stripe moderne : plus besoin de payment_method_types
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/outils/chronographe-banc-pro`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json({ error: 'Erreur création session' }, { status: 500 });
  }
}
