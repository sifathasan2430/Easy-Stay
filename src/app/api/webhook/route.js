
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import { Booking } from "@/models/booking.models";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook error: ${error.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { bookingId } = session.metadata;

    try {
      await dbConnect();
      await Booking.findByIdAndUpdate(bookingId, {
        payment_status: "paid",
        status: "confirmed",
      });
    } catch (error) {
      console.error("Failed to update booking status:", error);
      return NextResponse.json(
        { error: "Failed to update booking status" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
