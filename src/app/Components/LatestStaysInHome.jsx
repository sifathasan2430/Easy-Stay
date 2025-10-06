'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoLocation } from 'react-icons/go';
import { Skeleton } from '@/components/ui/skeleton';
import Container from './Container/Container';

const LatestStaysInHome = () => {
  const [latestProperties, setLatestProperties] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    router.push(`/stays/${id}`); // navigate to details page
  };

  return (
    <Container>
    <div className=" py-24">
      <h2 className="text-4xl font-bold mb-6 text-center p-5">
        Latest <span className="text-blue-500">Stays</span>
      </h2>

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border rounded-lg shadow-lg overflow-hidden cursor-pointer"
            >
              <Skeleton className="w-full h-48" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProperties.map((property) => (
            <div
              key={property._id}
              onClick={() => handleCardClick(property._id)}
              className="border rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <GoLocation className="mr-1" /> {property.city}
                </div>
                <p className="font-bold mt-2">
                  ${property.price_per_night} 
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </Container>
  );
};

export default LatestStaysInHome;
