'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoLocation } from 'react-icons/go';

const LatestStaysInHome = () => {
    const [latestProperties, setLatestProperties] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/listings.json')
            .then((res) => res.json())
            .then((data) => {
                const sorted = data
                    .sort(
                        (a, b) => new Date(b.available_from) - new Date(a.available_from)
                    )
                    .slice(0, 4); // latest 4
                setLatestProperties(sorted);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleCardClick = (id) => {
        router.push(`/stays/${id}`); // navigate to details page
    };

    return (
        <div className="w-11/12 mx-auto py-6">
            <h2 className="text-4xl font-bold mb-6 text-center">Latest Stays</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestProperties.map((property) => (
                    <div
                        key={property.id}
                        onClick={() => handleCardClick(property.id)}
                        className="border rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={property.image_url}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{property.title}</h3>
                            <div className="flex items-center mt-1">
                                <GoLocation className="mr-1" /> {property.city}
                            </div>              <p className="font-bold mt-2">${property.price_per_night} / night</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestStaysInHome;
