import React from "react";

const HelpCenter = () => {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 font-heading">Help Center</h1>
      <p className="mb-4 font-body">
        Welcome to easyStay Help Center! Here you can find answers to frequently asked questions and contact support if needed.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 font-heading">Booking Issues</h2>
      <p className="mb-4 font-body">
        If you face issues while booking a property, please ensure your payment details are correct and try again. Contact support if the issue persists.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 font-heading">Account Support</h2>
      <p className="mb-4 font-body">
        For account-related issues such as login problems, password reset, or account verification, reach out to our support team.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 font-heading">Property Support</h2>
      <p className="mb-4 font-body">
        Hosts and guests can contact support for property-related concerns, cancellations, or refunds.
      </p>

      <p className="mt-6 font-body">Still have questions? <a href="mailto:support@easystay.com" className="text-blue-600 hover:underline">Contact Support</a></p>
    </main>
  );
};

export default HelpCenter;
