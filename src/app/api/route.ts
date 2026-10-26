// app/api/create-checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'placeholder', {
  apiVersion: '2022-11-15',
});

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',

      // Stripe moderne : plus besoin de payment_method_types
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID || 'placeholder',
          quantity: 1,
        },
      ],

      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/outils/chronographe-banc-pro`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json({ error: 'Erreur création session' }, { status: 500 });
  }
}
