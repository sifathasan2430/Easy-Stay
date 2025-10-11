"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionDetails, setSessionDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from your backend (optional)
      const fetchSessionDetails = async () => {
        try {
          const response = await axios.get(`/api/stripe/session?session_id=${sessionId}`);
          console.log(response.data);
          setSessionDetails(response.data);
       
        } catch (err) {
          setError("Error fetching session details");
        }
      };
      fetchSessionDetails();
    }
  }, [sessionId]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your booking.</p>
      {sessionId ? (
        <p>Session ID: {sessionId}</p>
      ) : (
        <p>No session ID found in URL.</p>
      )}
      {sessionDetails && (
        <div>
          <p>Booking ID: {sessionDetails.metadata?.booking_id}</p>
          <p>Property ID: {sessionDetails.metadata?.propertyId}</p>
          <p>Amount Paid: ${(sessionDetails.amount_total / 100).toFixed(2)}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}