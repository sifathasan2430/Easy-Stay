"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Payment Page</h1>
      <div className="border p-4 rounded shadow">
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Amount:</strong> {amount}</p>
        
       
      </div>
    </div>
  );
}
