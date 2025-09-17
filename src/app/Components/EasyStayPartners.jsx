"use client";

import { Marquee } from "@/components/ui/marquee";



const partners = [
  {
    name: "Booking.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "TripAdvisor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Tripadvisor_Logo_stacked.svg",
  },
  {
    name: "Expedia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Expedia_Logo_2023.svg",
  },
  {
    name: "Agoda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Agoda_logo_2019.svg",
  },
  {
    name: "Vrbo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Vrbo.svg",
  },
];

export default function EasyStayPartners() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white py-10 dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
        Trusted by Leading Travel Platforms
      </h2>

      {/* Top Marquee */}
      <Marquee pauseOnHover className="[--duration:50s] sm:[--duration:40s]">
        {partners.map((p) => (
          <div
            key={p.name}
            className="mx-4 sm:mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-8 w-auto object-contain sm:h-10 md:h-12"
            />
          </div>
        ))}
      </Marquee>

      {/* Bottom Marquee */}
      <Marquee reverse pauseOnHover className="[--duration:50s] sm:[--duration:40s]">
        {partners.map((p) => (
          <div
            key={p.name + "-reverse"}
            className="mx-4 sm:mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-8 w-auto object-contain sm:h-10 md:h-12"
            />
          </div>
        ))}
      </Marquee>

      {/* Gradient Fade Effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-gray-900"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-gray-900"></div>
    </section>
  );
}
