"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { LoaderOne, LoaderTwo } from "@/components/ui/loader";

export default function SuccessPage() {
  const searchParams = useSearchParams();
   const sessionId = searchParams.get("session_id");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
        
      if (!sessionId) return;
      try {
        
        const { data } = await axios.get(`/api/payment-status?session_id=${sessionId}`);
      
        setPayment(data);
      } catch (error) {
        console.error("Failed to fetch payment details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        <LoaderTwo/>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        No payment found or payment failed.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful 🎉</h1>
        <p className="text-gray-700 mb-4">
          Thank you for your booking! Your payment of{" "}
          <span className="font-semibold">${payment.amount}</span> was successful.
        </p>
        <p className="text-sm text-gray-500 mb-4">Session ID: {payment.sessionId}</p>
        <Link
          href="/"
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}