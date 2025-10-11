"use client";
import dbConnect from "@/lib/dbConnect";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use } from "react";

export default  function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.session_id;
  const bookingId = searchParams.booking_id;
console.log(bookingId,'this is for test')
  
 const booking=false
  // const booking = await Booking.findById(bookingId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p>Session ID: {sessionId}</p>
      {booking ? (
        <div className="mt-4">
          <p>Booking ID: {bookingId}</p>
          <p>Product: {booking.productName}</p>
          <p>Price: ${booking.price.toFixed(2)}</p>
          <p>Status: {booking.payment_status}</p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
      <Link href="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to Shop</Link>
    </div>
  );
}