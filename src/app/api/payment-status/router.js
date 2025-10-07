import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
   
    const sessionId = searchParams.get("session_id");
   if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    // ✅ Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent;

    const paymentData = {
      sessionId: session.id,
      amount: session.amount_total / 100,
      currency: session.currency.toUpperCase(),
      email: session.customer_email,
      paymentStatus: session.payment_status,
      createdAt: new Date(session.created * 1000).toLocaleString(),
      paymentIntentId:
        typeof paymentIntent === "object" ? paymentIntent.id : paymentIntent,
    };

    return NextResponse.json(paymentData, { status: 200 });
  } catch (error) {
    console.error(" Stripe payment status fetch failed:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}