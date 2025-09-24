import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Booking } from "../../../models/booking.models";

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("GET /bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // <-- parse JSON body
    const { propertyId, userId, checkInDate, checkOutDate, guests, totalPrice } = body;

    // Validate required fields manually (optional)
    if (!propertyId || !userId || !checkInDate || !checkOutDate || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      propertyId,
      userId,
      checkInDate,
      checkOutDate,
      guests: guests || 1,
      totalPrice,
      status: "pending"
    });

    return NextResponse.json(
      { message: "Booking created", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /bookings error:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
    );
  }
}

