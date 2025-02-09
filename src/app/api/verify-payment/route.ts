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
      // Check if payment_method is a string before retrieving
      const paymentMethodId = paymentIntent.payment_method;
      if (typeof paymentMethodId === 'string') {
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
        const customerName = paymentMethod.metadata?.name || 
                            paymentIntent.metadata?.name || 
                            'Anonymous';
        
        return NextResponse.json({
          success: true,
          customerName: customerName,
          amount: paymentIntent.amount // This is in cents
        })
      } else {
        return NextResponse.json({ error: "Payment method not found" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Payment not successful" }, { status: 400 })
    }
  } catch (err) {
    console.error("Error verifying payment:", err)
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 })
  }
} 