"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Next.js 13 app router
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LoaderOne } from "@/components/ui/loader";


export default function PaymentStatusTable() {
  const { data: session } = useSession();
  
 


const {data:bookings,isLoading:bookingsLoading,isError}=useQuery({
  queryKey:['bookings',session?.user?._id],
  queryFn:async()=>{
    const res=await axios.get(`/api/bookings/upcoming?userId=${session.user._id}`);
     return res.data.data || [];
  },
  enabled:!!session?.user?._id,
  })
const router = useRouter();

const handleInvoice = (booking) => {
  // Redirect to invoice page with query params
  router.push(`/dashboard/guest/invoice/?bookingId=${booking._id}&amount=${booking.totalPrice}`);
};


  const handleCheckout = async (propertyId,amount,bookingId) => {

    
    try {
      const response = await axios.post('/api/checkout', {
        bookingId,
        amount: parseFloat(amount),
        userId:session?.user?._id,
        email:session?.user?.email,
        propertyId
      });
      const { url } = response.data;
      console.log(response.data, 'Checkout URL:', url);
      if (url) window.location.href = url;
    } catch (error) {
      console.log(error)
      console.error('Checkout error:', error.response?.data?.error || error.message);
      toast.error('Failed to initiate payment. Please try again.');
  }
  }
 
  if (isError) return <div> <p className="p-6 text-red-700 text-center text-4xl">Failed to load bookings. Please try again later.</p></div>;
  
  if (bookingsLoading) {
  return (<div className="flex items-center justify-center min-h-[50vh]">
      <LoaderOne />
    </div>)}
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
          {bookings && bookings.map((b) => (
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
                {b.payment_status === "success" ? (
                  <Button onClick={() => handleInvoice(b)}>Invoice</Button>
                ) : (
                  <Button className='bg-green-600 cursor-pointer hover:bg-green-600' onClick={() => handleCheckout(b?.propertyId,b.totalPrice,b._id)}>Pay</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}