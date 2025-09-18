"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Justin",
    location: "Rancho Cordova, California",
    time: "6 days ago",
    img: "https://i.pravatar.cc/100?img=12",
    review:
      "Beautiful condo home right by Gwangalli beach with attentive hosts. Very thoughtful amenities and snacks provided. Hosts communicated promptly throughout entire stay.",
    rating: 5,
  },
  {
    name: "Jacqueline",
    location: "11 years on EasyStay",
    time: "April 2025",
    img: "https://i.pravatar.cc/100?img=15",
    review:
      "One of the best stays we’ve had in South Korea. The host designed every corner of the house with so much thought and attention to detail — very tastefully done!",
    rating: 5,
  },
  {
    name: "David",
    location: "New York, USA",
    time: "March 2025",
    img: "https://i.pravatar.cc/100?img=18",
    review:
      "Great place to stay, very clean and comfortable. Location was perfect and close to everything. Highly recommend!",
    rating: 4,
  },
  {
    name: "Sophia",
    location: "London, UK",
    time: "February 2025",
    img: "https://i.pravatar.cc/100?img=20",
    review:
      "Absolutely loved our stay. The host was super kind and helpful, the apartment was spotless and beautifully decorated.",
    rating: 5,
  },
  {
    name: "Michael",
    location: "Toronto, Canada",
    time: "January 2025",
    img: "https://i.pravatar.cc/100?img=22",
    review:
      "Fantastic experience. Smooth check-in process, modern amenities, and breathtaking views. Will definitely come back again!",
    rating: 4,
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <div className="flex  flex-col gap-3 border rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={r.img}
          alt={r.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-xs text-gray-500">{r.location}</p>
          <Stars count={r.rating} />
        </div>
      </div>
      <p className="text-xs text-gray-400">{r.time}</p>
      <p className="text-sm text-gray-700">{r.review}</p>
    </div>
  );
}

export default function EasyStayReviews() {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white">
        What Our Guests Say
      </h2>

      {/* Show first 4 reviews */}
      <div className="grid sm:grid-cols-2 gap-8 mt-8">
        {reviews.slice(0, 4).map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>

      {/* See All Reviews Button */}
      <div className="mt-10 flex justify-center">
        <Button variant="outline" onClick={() => setOpen(true)}>
          See all reviews
        </Button>
      </div>

      {/* Custom Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-6">All Reviews</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {reviews.map((r, i) => (
                <ReviewCard key={i} r={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
