import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log("Received request body:", body)

  const { amount, priceId } = body

  console.log("Extracted amount:", amount)
  console.log("Extracted priceId:", priceId)

  if (typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
  }

  try {
    // Retrieve the price from Stripe
    const price = await stripe.prices.retrieve(priceId)
    console.log("Retrieved price:", price)

    // Calculate the amount in cents
    const amountInCents = Math.round(amount * 100)
    console.log("Amount in cents:", amountInCents)

    // Create a payment intent with the user-specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: price.currency,
      payment_method_types: ["card"],
      metadata: {
        priceId: priceId,
        originalAmount: amount.toString(),
      },
    })

    console.log("Created payment intent:", paymentIntent.id)
    console.log("Payment intent amount:", paymentIntent.amount)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: amountInCents,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}

