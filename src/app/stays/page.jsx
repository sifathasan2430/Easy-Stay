"use client";

import { useState, useEffect } from "react"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Reverting to root-based path aliases for component imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Lucide Icons
import { MapPin, LocateFixed, XCircle } from "lucide-react"; 
import { motion } from "framer-motion";

// Reverting to root-based path aliases
import MapView from "@/components/MapView/MapView";
import { LoaderOne } from "@/components/ui/loader";
import ReuseableCard from "@/components/reuseableCard/ReuseableCard";
import Link from "next/link";


export default function ExploreProperties() {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [page, setPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const limit = 8;

  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null); 

  // Function to clear the user's current location
  const clearUserLocation = () => {
    setUserLocation({ latitude: null, longitude: null });
    setLocationError(null);
    setPage(1); // Reset page to 1
  };

  // Function to get user's current location
  const fetchUserLocation = () => {
    setLocationError(null);
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: Set location and reset page/filters
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setPage(1); // Reset page to 1 when a new location search starts
          setIsLocating(false);
        },
        (error) => {
          // Failure: Log detailed error info and handle UI state
          console.error("Geolocation failed (Code:", error.code, "Message:", error.message, ")");
          
          let errorMessage;
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please manually search or click 'Detect Location' again.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "Location detection timed out. Try again.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is currently unavailable (position unavailable).";
          } else {
            errorMessage = "Failed to get location. Check browser settings.";
          }
          
          setLocationError(errorMessage);
          setIsLocating(false);
          setUserLocation({ latitude: null, longitude: null }); // Clear location on error
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setUserLocation({ latitude: null, longitude: null });
    }
  };
  
  // Logic to determine if we should send location data to the API
  // Location is active only if coords are present AND no manual search/filter is applied
  const isLocationActive = userLocation.latitude !== null && userLocation.longitude !== null && search === "" && roomType === "";

  // Fetch data using React Query
  const { data:properties =[], isLoading } = useQuery({
    queryKey: ["properties", search, roomType, page, userLocation],
    queryFn: async () => {
      // API call parameters
      const params = {
        search,
        roomType,
        page,
        limit,
        // Conditionally add location parameters only if active
        ...(isLocationActive && {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      };
      
      const res = await axios.get("/api/property", { params });
      return res.data.data || []; 
    },
    // Prevent the query from running while actively locating to avoid race conditions
    enabled: !isLocating, 
    staleTime:1000*60*5
  });

  // The location detection is now triggered ONLY by the button click (fetchUserLocation).
  // The properties will load normally on mount based on initial empty search/filter states.


  // Reset location state if user starts a manual search or filter
  useEffect(() => {
    if (search.length > 0 || roomType) {
      setUserLocation({ latitude: null, longitude: null });
      setLocationError(null); // Clear error if user starts manual search
      // IMPORTANT: Reset page to 1 whenever search or roomType changes
      if (page !== 1) setPage(1);
    }
  }, [search, roomType]);


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
          <Select onValueChange={setRoomType} value={roomType || ""}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entire_place">Entire place</SelectItem>
              <SelectItem value="private_room">Private room</SelectItem>
              <SelectItem value="shared_room">Shared room</SelectItem>
            </SelectContent>
          </Select>

          {/* Location Detection Button */}
          <Button
            onClick={fetchUserLocation}
            variant="outline"
            className="rounded-xl flex items-center gap-2"
            disabled={isLocating}
          >
            <LocateFixed className="w-4 h-4" />
            {isLocating ? "Locating..." : "Detect Location"}
          </Button>
          
          {/* Clear Location Button (Visible only when location search is active) */}
          {isLocationActive && (
            <Button
              onClick={clearUserLocation}
              variant="ghost"
              className="rounded-xl flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <XCircle className="w-4 h-4" />
              Clear Location Search
            </Button>
          )}

          <Button
            onClick={() => setShowMap((prev) => !prev)}
            variant="outline"
            className="rounded-xl"
          >
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
        </div>
      </div>

      {/* Conditional message if location search is active */}
      {isLocationActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm"
        >
          <MapPin className="inline-block w-4 h-4 mr-2" />
          Showing properties near your current location. Type or filter to override.
        </motion.div>
      )}

      {/* Location Error Display */}
      {locationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
        >
          <XCircle className="inline-block w-4 h-4 mr-2" />
          {locationError}
        </motion.div>
      )}

      {/* Map View Toggle (rest of your component) */}
      {showMap ? (
        <div className="h-[600px] rounded-2xl overflow-hidden mb-8 border">
          <MapView properties={properties} /> 
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {(isLoading || isLocating) ? ( 
            <div className="flex justify-center items-center w-full h-[70vh]">
              <LoaderOne />
            </div>
          ) : properties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property) => (
                <ReuseableCard property={property} key={property._id} />
              ))}
            </div>
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No properties found. Please try a wider search or detect your location again.
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
              disabled={properties.length < limit} 
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
