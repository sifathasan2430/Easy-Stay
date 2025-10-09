"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!sessionId) return;
    axios.get(`/api/payment-status?session_id=${sessionId}`).then((res) => {
      setSession(res.data);
    });
  }, [sessionId]);

  if (!session) return <p className="text-center mt-20">Verifying payment...</p>;

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-4 text-gray-700">
        Amount: ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
      </p>
      <p>Status: {session.payment_status}</p>
      <a href="/dashboard" className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-lg">
        Back to Dashboard
      </a>
    </div>
  );
}