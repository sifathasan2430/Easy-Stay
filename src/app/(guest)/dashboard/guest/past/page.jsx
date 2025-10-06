"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";

export default function PastBookings() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = session?.user?._id;

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`/api/bookings/past?userId=${userId}`);
        const data = await res.json();
        setBookings(data.data || []);
      } catch (err) {
        console.error("Failed to fetch past bookings:", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchBookings();
  }, [userId]);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-white text-sm font-medium";
    switch (status) {
      case "confirmed":
        return <span className={`${baseClasses} bg-green-500`}>Confirmed</span>;
      case "completed":
        return <span className={`${baseClasses} bg-gray-500`}>Completed</span>;
      case "cancelled":
        return <span className={`${baseClasses} bg-red-500`}>Cancelled</span>;
      case "pending":
        return <span className={`${baseClasses} bg-yellow-500`}>Pending</span>;
      default:
        return <span className={`${baseClasses} bg-blue-500`}>{status}</span>;
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (bookings.length === 0) return <p className="text-center py-4">No past bookings found.</p>;

  return (
    <Card className="w-full shadow-lg border border-gray-200">
      <CardHeader className="">
        <CardTitle className="text-3xl font-bold text-gray-800">Past Stays</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-left">Property ID</TableHead>
                <TableHead className="text-left">Check-In</TableHead>
                <TableHead className="text-left">Check-Out</TableHead>
                <TableHead className="text-center">Guests</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{booking.propertyId}</TableCell>
                  <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{booking.guests}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right font-semibold">${booking.totalPrice.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
