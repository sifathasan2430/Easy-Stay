import React from 'react';
import Link from 'next/link';

const StayCard = ({ property }) => {
  return (
    <div className="border rounded-lg shadow-sm p-3 bg-white hover:shadow-md transition-shadow">
      <img
        src={property.image_url}
        alt={property.title}
        className="w-full h-40 object-cover rounded-md"
        loading="lazy"
      />
      <div className="mt-2">
        <h3 className="text-base font-medium text-gray-800 truncate">{property.title}</h3>
        <p className="text-sm text-gray-500">{property.city}</p>
        <p className="text-lg font-semibold text-gray-900">${property.price_per_night}/night</p>
        <p className="text-sm text-gray-500">{property.room_type}</p>
        <Link href={`/stays/${property.id}`}>
          <button className="mt-2 w-full bg-blue-500 text-white text-sm py-1.5 rounded-md hover:bg-blue-600 transition-colors">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StayCard;