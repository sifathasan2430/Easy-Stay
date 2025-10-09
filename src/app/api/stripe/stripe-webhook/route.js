import Stripe from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await dbConnect();

    await Payment.findOneAndUpdate(
      { stripeSessionId: session.id },
      { status: "paid" }
    );

    console.log("✅ Payment updated in DB:", session.id);
  }

  return new NextResponse("OK", { status: 200 });
}

export const config = {
  api: { bodyParser: false }, // ensures raw body for Stripe signature
};