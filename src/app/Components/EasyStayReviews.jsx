"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "./Container/Container";

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

function ReviewCard({ r, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="flex flex-col gap-3 border font-body rounded-xl p-4 shadow-sm bg-white dark:bg-gray-800"
    >
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
      <p className="text-sm text-gray-700 dark:text-gray-300">{r.review}</p>
    </motion.div>
  );
}

// Skeleton card for loading
function ReviewSkeleton({ i }) {
  return (
    <div className="flex flex-col gap-3 border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export default function EasyStayReviews() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
    <section className=" px-4 py-24">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-center p-5 text-gray-900 dark:text-white"
      >
        What Our <span className="text-blue-500">Guests Say</span>
      </motion.h2>

      {/* Show Skeletons or Reviews */}
      <div className="grid sm:grid-cols-2 gap-8 mt-8">
        {loading
          ? [1, 2, 3, 4].map((i) => <ReviewSkeleton key={i} />)
          : reviews.slice(0, 4).map((r, i) => <ReviewCard key={i} r={r} i={i} />)}
      </div>

      {/* See All Reviews Button */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Button variant="outline" onClick={() => setOpen(true)}>
            See all reviews
          </Button>
        </motion.div>
      )}

      {/* Animated Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold font-heading mb-6">
                All Reviews
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {reviews.map((r, i) => (
                  <ReviewCard key={i} r={r} i={i} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </Container>
  );
}
