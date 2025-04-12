import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Career = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-12 bg-gray">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Careers at FinIntel </h1>
          <p className="text-lg text-gray-600 mb-10">
            Join a mission-driven team building the future of institutional finance and collaborative investment insight.
          </p>
        </div>

        <section className="max-w-5xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Innovative Culture</h3>
              <p className="text-gray-600">We embrace creativity, experimentation, and bold ideas that drive real change in the financial world.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Flexible Environment</h3>
              <p className="text-gray-600">Work remotely or from our HQ in New York. We value balance, flexibility, and performance.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Impactful Work</h3>
              <p className="text-gray-600">Shape the conversations and innovations that guide portfolio managers and institutional investors.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Open Positions</h2>

          {/* Example job cards */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-800">Senior Investment Analyst</h3>
              <p className="text-gray-600">Remote / Full-time</p>
              <p className="text-gray-600 mt-2">
                Lead in-depth financial analysis and contribute to high-level discussions within our investor community.
              </p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Apply Now
              </button>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-800">Community Growth Manager</h3>
              <p className="text-gray-600">New York, NY / Hybrid</p>
              <p className="text-gray-600 mt-2">
                Help grow and nurture our thought leadership network with strategic partnerships and content planning.
              </p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Apply Now
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Don't see the right role?</h2>
          <p className="text-gray-600 mb-4">We’re always looking for talent. Send your resume and tell us why you’d be a great fit at FinIntel .</p>
          <a
            href="mailto:careers@FinIntel .com"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
          >
            careers@FinIntel .com
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Career;
