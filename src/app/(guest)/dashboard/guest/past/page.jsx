"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function PastBookings() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "", photos: [] });

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

  const openReviewModal = (booking) => {
    setCurrentBooking(booking);
    setReviewData({ rating: 0, comment: "", photos: [] });
    setShowModal(true);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReview = async () => {
    if (!reviewData.rating || !reviewData.comment) {
      toast.error("Please enter rating and comment");
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: currentBooking.propertyId,
          bookingId: currentBooking._id,
          userId,
          rating: parseFloat(reviewData.rating),
          comment: reviewData.comment,
          photos: reviewData.photos, // optional: array of photo URLs
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Review added successfully!");
        setShowModal(false);
      } else {
        toast.error(data.error || "Failed to add review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add review");
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-white text-sm font-medium";
    switch (status) {
      case "confirmed": return <span className={`${baseClasses} bg-green-500`}>Confirmed</span>;
      case "completed": return <span className={`${baseClasses} bg-gray-500`}>Completed</span>;
      case "cancelled": return <span className={`${baseClasses} bg-red-500`}>Cancelled</span>;
      case "pending": return <span className={`${baseClasses} bg-yellow-500`}>Pending</span>;
      default: return <span className={`${baseClasses} bg-blue-500`}>{status}</span>;
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (bookings.length === 0) return <p className="text-center py-4">No past bookings found.</p>;

  return (
    <>
      <Card className="w-full shadow-lg border border-gray-200">
        <CardHeader>
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
                  <TableHead className="text-center">Review</TableHead>
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
                    <TableCell className="text-center">
                      <Button size="sm" onClick={() => openReviewModal(booking)}>Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Review</h2>
            <div className="space-y-3">
              <Input
                type="number"
                min={1}
                max={5}
                step={0.5}
                name="rating"
                placeholder="Rating (1-5)"
                value={reviewData.rating}
                onChange={handleReviewChange}
              />
              <Textarea
                name="comment"
                placeholder="Write your comment..."
                value={reviewData.comment}
                onChange={handleReviewChange}
              />
              <Input
                name="photos"
                placeholder="Photo URLs (comma separated)"
                value={reviewData.photos.join(",")}
                onChange={(e) => setReviewData(prev => ({ ...prev, photos: e.target.value.split(",") }))}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button onClick={handleAddReview}>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
