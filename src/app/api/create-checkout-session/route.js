import Stripe from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Payment } from "@/models/payment.models";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  const { amount, userId, email } = await req.json();
console.log('this is from checkout session',amount,userId,email)
  // 1️⃣ Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Room Booking Payment" },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    metadata: { userId, email },
   
  });

  // 2️⃣ Save pending payment
  await Payment.create({
    userId,
    email,
    amount,
    currency: "usd",
    stripeSessionId: session.id,
  });

  return NextResponse.json({ id: session.id });
}