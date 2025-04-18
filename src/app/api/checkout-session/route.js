import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/Stripe/stripe'

export async function POST(req) {
  try {
     const headersList = await headers()
     const origin = headersList.get('origin')

    const body=await req.json()
    console.log(body)

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: body.map(item => ({
          price_data: {
            currency: 'pkr',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // cents
          },
          quantity: item.quantity,
        })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?canceled=true`,
    });
    return NextResponse.json({
        success : true,
        session_id : session.id
    })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}