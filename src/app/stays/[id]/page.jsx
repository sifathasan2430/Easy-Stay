"use client"
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Users, Bed, Bath } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderFive } from "@/components/ui/loader";
import ReviewsList from "@/components/ReviewsList";
import { useSession } from "next-auth/react";

export default  function PropertyDetails({ params }) {
  const unwrappedParams = React.use(params);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
 
const {data:property,isLoading}=useQuery({
  queryKey:['property'],
  queryFn:async()=>{
    const response=await axios.get(`/api/property/${unwrappedParams.id}`)
    return response.data.data
  }
})

const { data: reviewsData } = useQuery({
  queryKey: ["property-reviews", unwrappedParams.id],
  queryFn: async () => {
    const res = await axios.get(`/api/reviews?propertyId=${unwrappedParams.id}`);
    return res.data;
  },
});

const handleReserve = async () => {
  setLoading(true);
  try {
    const bookingDetails = {
      propertyId: property._id,
    
      userId: session.user._id,
      checkInDate: new Date(),
      checkOutDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      guests: 2,
      totalPrice: property.pricePerNight * 3,
    };

    // 1️⃣ Save the booking first
    const bookingResponse = await axios.post("/api/bookings", bookingDetails);

    // 2️⃣ Create Stripe Checkout Session
    if (bookingResponse.data.booking) {
      const { data: stripeResponse } = await axios.post("/api/stripe", {
        propertyTitle: property.title, // ✅ required for Stripe product_data.name
        amount: bookingResponse.data.booking.totalPrice, // ✅ required for unit_amount
        userEmail: "customer@example.com", // ✅ your logged-in user’s email
      });

      // 3️⃣ Redirect to Stripe Checkout
      window.location.href = stripeResponse.url;
    }
  } catch (error) {
    console.error("Failed to create booking or Stripe session", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 my-30">
      {/* Title Section */}
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mt-1 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {property.address}, {property.city}, {property.country}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">
                {reviewsData?.averageRating||property.averageRating} · {reviewsData?.reviewCount||property.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-6 rounded-2xl overflow-hidden">
            {property.images?.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.url}
                alt={`Property Image ${idx + 1}`}
                className={`object-cover w-full h-64 md:h-72 ${
                  img.isPrimary ? "md:col-span-2 md:row-span-2" : ""
                }`}
                whileHover={{ scale: 1.02 }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            {/* Left: Property Info */}
            <div className="lg:col-span-2">
              {/* Basic Info */}
              <div className="flex flex-wrap gap-4 text-gray-700 text-sm mt-2">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {property.maxGuests} guests
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" /> {property.bedrooms} bedrooms
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" /> {property.bathrooms} baths
                </div>
              </div>

              <Separator className="my-5" />

              {/* Description */}
              <p className="text-gray-800 leading-relaxed">{property.description}</p>

              {/* Amenities */}
              <h2 className="text-lg font-semibold mt-8 mb-3">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities?.map((a) => (
                  <div
                    key={a._id}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span>• {a.name}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />
              <ReviewsList propertyId={unwrappedParams.id}></ReviewsList>
              <Separator className="my-6" />

              {/* Check-in / out */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>🕑 Check-in: {property.checkInTime}</p>
                <p>🕚 Check-out: {property.checkOutTime}</p>
              </div>

              {/* Map Section */}
              <h2 className="text-lg font-semibold mt-8 mb-3">Where you’ll be</h2>
              <div className="rounded-xl overflow-hidden border">
                <iframe
                  title="map"
                  src={`https://maps.google.com/maps?q=${property.location.coordinates[1]},${property.location.coordinates[0]}&z=15&output=embed`}
                  className="w-full h-64"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Booking Card */}
            <div>
              <Card className="shadow-lg sticky top-20 border rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-xl font-semibold">
                      ${property.pricePerNight}
                      <span className="text-sm text-gray-500 font-normal"> / night</span>
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="ml-1">{reviewsData?.averageRating||4.8}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button 
                      className="w-full bg-[#4f46e5] text-white font-medium rounded-xl"
                      onClick={handleReserve}
                      disabled={loading}
                    >
                      {loading ? 'Reserving...' : 'Reserve'}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    You won’t be charged yet
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}