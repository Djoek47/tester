import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia"
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const payment_intent = searchParams.get("payment_intent")

  if (!payment_intent) {
    return NextResponse.json({ error: "No payment intent provided" }, { status: 400 })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)
    
    if (paymentIntent.status === "succeeded") {
      // Get name from metadata or payment method
      const customerName = paymentIntent.metadata?.name || 
                          (paymentIntent.payment_method && typeof paymentIntent.payment_method === 'object' && paymentIntent.payment_method.metadata?.name) || 
                          'Anonymous';
      
      return NextResponse.json({
        success: true,
        customerName: customerName,
        amount: paymentIntent.amount // This is in cents
      })
    } else {
      return NextResponse.json({ error: "Payment not successful" }, { status: 400 })
    }
  } catch (err) {
    console.error("Error verifying payment:", err)
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 })
  }
} 