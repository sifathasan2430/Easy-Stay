"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";
import Link from "next/link";
import { LoaderOne } from "@/components/ui/loader";

// Lazy load the Map component
const MapView = dynamic(() => import("@/components/MapView/MapView"), { ssr: false });

export default function ExploreProperties() {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [page, setPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const limit = 8;

  // Fetch data using React Query
  const { data:properties =[], isLoading } = useQuery({
    queryKey: ["properties", search, roomType, page],
    queryFn: async () => {
      const res = await axios.get("/api/property", {
        params: { search, roomType, page, limit },
      });
      return res.data.data;
    },
    staleTime:1000,
    
    
  });
  const {data:mapProperties=[]}=useQuery({
    queryKey:'mapProperty',
    queryFn:async () => {
      const response=await axios.get('/api/property')
      return response.data.data
    }
  })

 

 return (
  <div className="max-w-7xl mx-auto px-4 my-40">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Explore Homes</h1>
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search city or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 sm:w-60"
        />
        <Select onValueChange={setRoomType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Room Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entire_place">Entire place</SelectItem>
            <SelectItem value="private_room">Private room</SelectItem>
            <SelectItem value="shared_room">Shared room</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setShowMap((prev) => !prev)}
          variant="outline"
          className="rounded-xl"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>
    </div>

    {/* Map View Toggle */}
    {showMap ? (
      <div className="h-[600px] rounded-2xl overflow-hidden mb-8 border">
        <MapView properties={mapProperties} />
      </div>
    ) : (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-[70vh]">
            <LoaderOne />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Link href={`/stays/${p._id}`} className="block"> <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                 
                    {/* Image Section */}
                    <div className="relative w-full h-56">
                      <img
                        src={p.images?.[0]?.url}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        {p.averageRating || "4.8"}
                      </div>
                    </div>
                  
                  <CardContent className="p-4 pt-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{p.title} </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-10 h-4" />
                     {p.city} 
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium text-gray-900">${p.pricePerNight}</span>{" "}
                      / night
                    </p>
                  </CardContent>
                </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No properties found.
          </p>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            variant="outline"
          >
            Prev
          </Button>
          <span className="text-gray-600 text-sm">Page {page}</span>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    )}
  </div>
)
}