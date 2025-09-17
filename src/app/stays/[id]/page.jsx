'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const StayDetailsPage = () => {
    const { id } = useParams(); // get id from URL
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch('/listings.json'); //  JSON file
                if (!response.ok) throw new Error('Failed to fetch listings');

                const data = await response.json();
                const found = data.find((p) => p.id === parseInt(id)); // find by id
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

    if (loading) return <div className="text-center p-6 text-gray-600 text-lg">Loading...</div>;
    if (error) return <div className="text-center p-6 text-red-500 text-lg font-medium">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Hero Image Section */}
            <div className="relative mb-8">
                <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                    loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{property.title}</h1>
                    <p className="text-lg text-gray-200">{property.city}</p>
                </div>
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pricing and Room Type */}
                    <div>
                        <p className="text-2xl font-bold text-blue-600">
                            ${property.price_per_night}
                            <span className="text-base font-normal text-gray-600">/night</span>
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <span className="font-medium">Room Type:</span> {property.room_type}
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <span className="font-medium">Available:</span> {property.available_from} to {property.available_to}
                        </p>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Amenities</h2>
                        <ul className="grid grid-cols-2 gap-2">
                            {property.amenities.map((amenity, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full flex items-center"
                                >
                                    <span className="mr-2 text-blue-500">•</span> {amenity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                    <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StayDetailsPage;