"use client";

import { FaUserPlus, FaSearchLocation, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus className="w-8 h-8 text-primary" />,
      title: "Sign Up",
      desc: "Create your EasyStay account in just a few clicks and get started right away.",
    },
    {
      icon: <FaSearchLocation className="w-8 h-8 text-primary" />,
      title: "Find Your Stay",
      desc: "Browse thousands of short-term rentals, filter by location, price, and comfort.",
    },
    {
      icon: <FaCheckCircle className="w-8 h-8 text-primary" />,
      title: "Book & Enjoy",
      desc: "Securely book your stay, check in smoothly, and enjoy your trip stress-free.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          With EasyStay, booking your next short-term stay is simple and hassle-free.  
          Just follow these three easy steps!
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition dark:bg-gray-800"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
