"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    img: "https://i.pravatar.cc/64?img=1",
    name: "Sophia",
    username: "@sophia_travels",
    body: "Loved my stay! Booking was smooth and the apartment was spotless.",
  },
  {
    img: "https://i.pravatar.cc/64?img=2",
    name: "Liam",
    username: "@liam_nomad",
    body: "EasyStay made it super easy to find a last-minute rental in Paris!",
  },
  {
    img: "https://i.pravatar.cc/64?img=3",
    name: "Ava",
    username: "@ava_wanderlust",
    body: "The host was so friendly and check-in was seamless. Highly recommend!",
  },
  {
    img: "https://i.pravatar.cc/64?img=4",
    name: "Noah",
    username: "@noah_explorer",
    body: "Affordable and safe – I’ll definitely use EasyStay again on my next trip.",
  },
  {
    img: "https://i.pravatar.cc/64?img=5",
    name: "Emma",
    username: "@emma_backpacker",
    body: "Best platform for travelers. Love the flexible cancellation policy!",
  },
  {
    img: "https://i.pravatar.cc/64?img=6",
    name: "Oliver",
    username: "@oliver_global",
    body: "Great experience overall. Smooth payment process and nice support team.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-[80%] sm:w-64 cursor-pointer overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-300",
        "border-gray-200 bg-white hover:bg-gray-100",
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {body}
      </blockquote>
    </figure>
  );
};

export default function EasyStayReviews() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gray-50 py-10 sm:py-16 dark:bg-gray-950">
      <h2 className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white">
        What Our Guests Say
      </h2>

      <div className="w-full flex flex-col gap-6">
        {/* First Row */}
        <Marquee pauseOnHover className="[--duration:25s] gap-4">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Second Row */}
        <Marquee reverse pauseOnHover className="[--duration:25s] gap-4">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-gray-50 dark:from-gray-950"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-gray-50 dark:from-gray-950"></div>
    </section>
  );
}
