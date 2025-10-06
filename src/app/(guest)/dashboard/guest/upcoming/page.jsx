"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function UpcomingBookings() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = session?.user?._id;

  // Fetch bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`/api/bookings/upcoming?userId=${userId}`);
        const data = await res.json();
        setBookings(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch upcoming bookings.");
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchBookings();
  }, [userId]);

  // Update booking
  const handleUpdate = async (id, checkIn, checkOut) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkInDate: checkIn, checkOutDate: checkOut }),
      });

      if (res.ok) {
        const updatedBooking = await res.json();
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? updatedBooking : b))
        );
        toast.success("Booking updated successfully!");
      } else {
        toast.error("Failed to update booking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating.");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await fetch("/api/bookings/cancel", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
        );
        toast.success("Booking cancelled!");
      } else {
        toast.error("Cancel failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while cancelling.");
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (!bookings.length) return <p className="text-center py-4">No upcoming bookings.</p>;

  return (
    <Card className="w-full shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800">Upcoming Stays</CardTitle>
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
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b._id} className="hover:bg-gray-50">
                  <TableCell>{b.propertyId}</TableCell>

                  {/* Editable dates */}
                  <TableCell>
                    <input
                      type="date"
                      value={b.checkInDate.slice(0, 10)}
                      onChange={(e) =>
                        setBookings((prev) =>
                          prev.map((bk) =>
                            bk._id === b._id ? { ...bk, checkInDate: e.target.value } : bk
                          )
                        )
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="date"
                      value={b.checkOutDate.slice(0, 10)}
                      onChange={(e) =>
                        setBookings((prev) =>
                          prev.map((bk) =>
                            bk._id === b._id ? { ...bk, checkOutDate: e.target.value } : bk
                          )
                        )
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </TableCell>

                  <TableCell className="text-center">{b.guests}</TableCell>
                  <TableCell className="text-center">{b.status}</TableCell>
                  <TableCell className="text-right">${b.totalPrice}</TableCell>

                  <TableCell className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      className="bg-green-500 text-white hover:bg-green-600 hover:scale-105 transform transition-all"
                      onClick={() => handleUpdate(b._id, b.checkInDate, b.checkOutDate)}
                      disabled={b.status === "cancelled"}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600 hover:scale-105 transform transition-all"
                      onClick={() => handleCancel(b._id)}
                      disabled={b.status === "cancelled"}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
