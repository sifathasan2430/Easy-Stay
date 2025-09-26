'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Heart, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react';

const StayDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();

    // Calendar states
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    // Guest selector states
    const [guests, setGuests] = useState(1);
    const [showGuestMenu, setShowGuestMenu] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch('/listings.json');
                if (!response.ok) throw new Error('Failed to fetch listings');

                const data = await response.json();
                const found = data.find((p) => p._id === id);
                if (!found) throw new Error('Property not found');

                setProperty(found);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    // POST booking handler
    const handleReserve = async () => {
        if (!checkIn || !checkOut || guests < 1) {
            return alert("Please select check-in, check-out dates and at least 1 guest.");
        }

        // Make sure property and price exist
        if (!property || !property._id || !property.price_per_night) {
            return alert("Property data is missing. Cannot create booking.");
        }

        // Prepare booking data
        const bookingData = {
            propertyId: property._id,                    // Mongoose ObjectId reference
            userId: session?.user?._id,                    // actual logged-in user ID
            checkInDate: checkIn.toISOString(),          // Date in ISO format
            checkOutDate: checkOut.toISOString(),        // Date in ISO format
            guests: guests,                              // minimum 1
            totalPrice: property.price_per_night * guests // total cost
        };

        console.log("Booking data sent:", bookingData);

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create booking");
            }

            const data = await res.json();
            console.log("Booking success:", data);
            alert("Booking created successfully!");
        } catch (err) {
            console.error("Booking error:", err);
            alert("Something went wrong while booking.");
        }
    };




    if (loading)
        return <div className="text-center p-6 text-lg">Loading...</div>;
    if (error)
        return (
            <div className="text-center p-6 text-red-500 text-lg font-medium">
                {error}
            </div>
        );

    return (
        <div className="max-w-11/12 mx-auto py-15">
            {/* Title & Header */}
            <div className="flex flex-col items-start mb-6 ">
                <h1 className="text-2xl md:text-3xl font-semibold">{property.title}</h1>
                <div className='flex  items-center gap-6 mt-1'>
                    <p className="">{property.city} · {property.room_type}</p>
                    <button className="flex items-center space-x-2 text-primary hover:text-red-500 transition">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">Save</span>
                    </button>
                </div>
            </div>

            {/* Image */}
            <div className="relative mb-8">
                <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-[450px] object-cover rounded-2xl shadow"
                />
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Host & Rating */}
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium">
                            Entire {property.room_type} hosted by {property.host_name || 'Host'}
                        </p>
                        <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-accent mr-1" />
                            <span>{property.rating || '4.8'}</span>
                        </div>
                    </div>

                    <hr />

                    {/* Amenities */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                        <ul className="grid grid-cols-2 gap-3">
                            {property.amenities.map((amenity, index) => (
                                <li
                                    key={index}
                                    className="flex items-center border justify-between text-sm px-3 py-2 rounded-full cursor-pointer 
                  hover:scale-[1.02] transition transform"
                                >
                                    <span className="flex items-center">
                                        <span className="mr-2 text-primary">•</span>
                                        {amenity}
                                    </span>
                                    <button className="ml-2 p-1 rounded-full hover:shadow">
                                        <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 transition" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column → Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 border rounded-2xl shadow-md p-6 space-y-4">
                        <p className="text-xl font-bold">
                            ${property.price_per_night}
                            <span className="font-normal text-base"> / night</span>
                        </p>

                        {/* Calendar Section */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-sm font-medium">Check-in</p>
                                <DatePicker
                                    selected={checkIn}
                                    onChange={(date) => setCheckIn(date)}
                                    selectsStart
                                    startDate={checkIn}
                                    endDate={checkOut}
                                    minDate={new Date()}
                                    placeholderText="Add date"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                                    popperPlacement="bottom-start"
                                    portalId="root-portal"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium">Check-out</p>
                                <DatePicker
                                    selected={checkOut}
                                    onChange={(date) => setCheckOut(date)}
                                    selectsEnd
                                    startDate={checkIn}
                                    endDate={checkOut}
                                    minDate={checkIn || new Date()}
                                    placeholderText="Add date"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                                    popperPlacement="bottom-start"
                                    portalId="root-portal"
                                />
                            </div>
                        </div>

                        {/* Guests Section */}
                        <div className="relative">
                            <div
                                onClick={() => setShowGuestMenu(!showGuestMenu)}
                                className="w-full p-3 text-left text-sm border rounded-lg cursor-pointer"
                            >
                                <p className="font-medium">Guests</p>
                                <p>{guests} guest{guests > 1 ? 's' : ''}</p>
                            </div>

                            {showGuestMenu && (
                                <div className="mt-2 w-full border shadow-lg rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{guests} guest{guests > 1 ? 's' : ''}</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                                            >
                                                -
                                            </button>
                                            <span className="px-2">{guests}</span>
                                            <button
                                                type="button"
                                                onClick={() => setGuests(guests + 1)}
                                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleReserve}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium
              shadow-md hover:shadow-xl hover:scale-105 active:scale-95
              transition transform duration-200 ease-out"
                        >
                            Reserve
                        </button>

                        <p className="text-xs text-center text-gray-500">
                            You won't be charged yet
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StayDetailsPage;
