"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Container } from "lucide-react";

export default function FAQ() {
  return (
    <Container>
    <section className=" px-4 py-24">
      {/* Animated Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center font-heading mb-8 text-gray-900 p-5 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Frequently  <span className="text-blue-500">Asked Questions</span>
      </motion.h2>

      {/* Animated Accordion Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-heading text-lg text-gray-800 dark:text-gray-100">
              What is EasyStay?
            </AccordionTrigger>
            <AccordionContent className="font-body text-gray-600 dark:text-gray-300">
              EasyStay is a short-term rental platform where travelers can find and book unique
              stays, while hosts can list their properties to earn income.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-heading text-lg text-gray-800 dark:text-gray-100">
              How do I book a property?
            </AccordionTrigger>
            <AccordionContent className="font-body text-gray-600 dark:text-gray-300">
              Simply search for your desired destination, select your dates, choose a property, and
              complete the booking process through our secure checkout.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-heading text-lg text-gray-800 dark:text-gray-100">
              Is my payment secure?
            </AccordionTrigger>
            <AccordionContent className="font-body text-gray-600 dark:text-gray-300">
              Yes, all payments are processed securely through trusted payment gateways to ensure
              your safety and privacy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="font-heading text-lg text-gray-800 dark:text-gray-100">
              Can I cancel a booking?
            </AccordionTrigger>
            <AccordionContent className="font-body text-gray-600 dark:text-gray-300">
              Yes, cancellations are possible depending on the host’s cancellation policy. Please
              check the property’s details before booking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="font-heading text-lg text-gray-800 dark:text-gray-100">
              How can I become a host?
            </AccordionTrigger>
            <AccordionContent className="font-body text-gray-600 dark:text-gray-300">
              You can easily sign up as a host on EasyStay, list your property, set your own prices,
              and start welcoming guests.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </section>
    </Container>
  );
}