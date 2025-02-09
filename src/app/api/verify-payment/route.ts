import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia" // Make sure this version is correct for your needs
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const payment_intent = searchParams.get("payment_intent")

  // Return an error if no payment intent is provided
  if (!payment_intent) {
    return NextResponse.json({ error: "No payment intent provided" }, { status: 400 })
  }

  try {
    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)

    // Check if the payment was successful
    if (paymentIntent.status === "succeeded") {
      // Retrieve payment method object using the ID if it's just a string
      const paymentMethod = typeof paymentIntent.payment_method === "string"
        ? await stripe.paymentMethods.retrieve(paymentIntent.payment_method)
        : paymentIntent.payment_method;

      // Get the customer name from metadata or payment method
      const customerName = paymentMethod?.metadata?.name ||
                           paymentIntent.metadata?.name ||
                           'No name provided';

      // Convert the amount from cents to dollars
      const amountInDollars = paymentIntent.amount / 100;

      // Return a successful response with customer name and amount
      return NextResponse.json({
        success: true,
        customerName: customerName,
        amount: amountInDollars // Amount in dollars
      })
    } else {
      // If payment is not successful, return an error
      return NextResponse.json({ error: "Payment not successful" }, { status: 400 })
    }
  } catch (err) {
    // Log error and return a server error response
    console.error("Error verifying payment:", err)
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 })
  }
}
