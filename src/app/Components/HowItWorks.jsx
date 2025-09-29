"use client";

import { motion } from "framer-motion";
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
    <section className="bg-gray-50 dark:bg-gray-950/30 py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Animated Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 p-5 font-heading dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How <span className="text-blue-500">It Works</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-400 max-w-2xl font-body mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          With EasyStay, booking your next short-term stay is simple and hassle-free.  
          Just follow these three easy steps!
        </motion.p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition dark:bg-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm font-body text-gray-600 dark:text-gray-400 mt-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
