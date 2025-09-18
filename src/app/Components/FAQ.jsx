// src/components/FAQ.tsx
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is EasyStay?</AccordionTrigger>
          <AccordionContent>
            EasyStay is a short-term rental platform where travelers can find and book unique stays,
            while hosts can list their properties to earn income.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I book a property?</AccordionTrigger>
          <AccordionContent>
            Simply search for your desired destination, select your dates, choose a property, and
            complete the booking process through our secure checkout.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is my payment secure?</AccordionTrigger>
          <AccordionContent>
            Yes, all payments are processed securely through trusted payment gateways to ensure your
            safety and privacy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I cancel a booking?</AccordionTrigger>
          <AccordionContent>
            Yes, cancellations are possible depending on the host’s cancellation policy. Please check
            the property’s details before booking.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How can I become a host?</AccordionTrigger>
          <AccordionContent>
            You can easily sign up as a host on EasyStay, list your property, set your own prices,
            and start welcoming guests.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
