"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Next.js 13 app router


export default function PaymentStatusTable() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (session?.user?._id) {
      fetch(`/api/bookings/upcoming?userId=${session.user._id}`)
        .then((res) => res.json())
        .then((data) => setBookings(data.data || []))
        .catch(() => toast.error("Failed to fetch bookings"));
    }
  }, [session]);


const router = useRouter();

const handleInvoice = (booking) => {
  // Redirect to invoice page with query params
  router.push(`/dashboard/guest/invoice/?bookingId=${booking._id}&amount=${booking.totalPrice}`);
};
const handlePayNow = (booking) => {
  // Redirect to payment page with query params
  router.push(`/dashboard/guest/payment/?bookingId=${booking._id}&amount=${booking.totalPrice}`);
};

  if (!bookings.length) return <p className="p-6">No upcoming stays found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upcoming Stays</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Property ID</th>
            <th className="px-4 py-2 border">Check-in</th>
            <th className="px-4 py-2 border">Check-out</th>
            <th className="px-4 py-2 border">Guests</th>
            <th className="px-4 py-2 border">Total Price</th>
            <th className="px-4 py-2 border">Payment Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{b.propertyId}</td>
              <td className="px-4 py-2 border">{new Date(b.checkInDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{new Date(b.checkOutDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border text-center">{b.guests}</td>
              <td className="px-4 py-2 border text-center">${b.totalPrice}</td>
              <td className={`px-4 py-2 border text-center font-semibold ${b.payment_status === "paid" ? "text-green-600" : "text-red-600"}`}>
                {b.payment_status}
              </td>
              <td className="px-4 py-2 border text-center">
                {b.payment_status === "paid" ? (
                  <Button onClick={() => handleInvoice(b)}>Invoice</Button>
                ) : (
                  <Button className='bg-green-600 hover:bg-green-600' onClick={() => handlePayNow(b)}>Pay</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}