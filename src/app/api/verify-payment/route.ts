import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentIntentId = searchParams.get("payment_intent")

  if (!paymentIntentId) {
    return NextResponse.json({ error: "Missing payment_intent parameter" }, { status: 400 })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({
        success: true,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: `Payment not successful. Status: ${paymentIntent.status}`,
      })
    }
  } catch (error) {
    console.error("Error retrieving payment intent:", error)
    return NextResponse.json({ error: "Error retrieving payment intent" }, { status: 500 })
  }
}

