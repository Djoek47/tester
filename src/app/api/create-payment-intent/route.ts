import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const amount = Number.parseFloat(body.amount)

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Please enter a valid amount greater than 0" }, { status: 400 })
    }

    console.log("Creating payment intent with amount:", amount)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: {
        integration_check: "accept_a_payment",
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount,
    })
  } catch (error) {
    console.error("Payment Intent Error:", error)
    return NextResponse.json({ error: "Unable to process payment. Please try again." }, { status: 500 })
  }
}

