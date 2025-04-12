import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At <strong>FinIntel </strong>, we are committed to protecting your
          privacy. This Privacy Policy outlines how we collect, use, and
          safeguard your information when you join our exclusive investor
          community and thought leadership platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Personal identification information (Name, email address, phone
            number, etc.)
          </li>
          <li>
            Professional details (Title, organization, investment focus, etc.)
          </li>
          <li>Usage data and preferences within the platform</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            To connect you with like-minded institutional investors and
            financial professionals
          </li>
          <li>To personalize your experience and recommend relevant content</li>
          <li>To improve our platform and services</li>
          <li>To communicate updates, newsletters, and event invitations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell your personal information. We may share information
          with trusted partners solely for the purpose of enhancing your
          experience within the FinIntel  network.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Your Privacy Rights
        </h2>
        <p className="mb-4">
          You have the right to access, modify, or delete your personal
          information at any time. To do so, please contact us at{" "}
          <a href="mailto:info@FinIntel .com" className="text-blue-600">
            info@FinIntel .com
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or how we handle
          your information, please contact us:
        </p>
        <address className="not-italic mb-4">
          FinIntel 
          <br />
          123 Wall Street
          <br />
          New York, NY
          <br />
          Phone: +1 (555) 123-4567
          <br />
          Email:{" "}
          <a href="mailto:info@FinIntel .com" className="text-blue-600">
            info@FinIntel .com
          </a>
        </address>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
