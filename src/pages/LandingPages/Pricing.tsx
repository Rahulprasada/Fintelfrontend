import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Pricing = () => {
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Hero section with image */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl">Choose a plan that fits your investing journey</p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-indigo-500">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Starter</h2>
              <p className="text-gray-600 mb-6">Ideal for individuals exploring financial insights</p>
              <div className="text-4xl font-bold text-indigo-600 mb-6">$29<span className="text-base font-normal">/month</span></div>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>✔ Access to community discussions</li>
                <li>✔ Monthly insight reports</li>
                <li>✔ Newsletter subscription</li>
              </ul>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-purple-600 transform scale-105">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Professional</h2>
              <p className="text-gray-600 mb-6">For portfolio managers and financial strategists</p>
              <div className="text-4xl font-bold text-purple-600 mb-6">$79<span className="text-base font-normal">/month</span></div>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>✔ All Starter features</li>
                <li>✔ Access to expert roundtables</li>
                <li>✔ Early research previews</li>
                <li>✔ Priority support</li>
              </ul>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                Upgrade Now
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-blue-600">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Enterprise</h2>
              <p className="text-gray-600 mb-6">Custom solutions for institutions and investment firms</p>
              <div className="text-4xl font-bold text-blue-600 mb-6">Custom</div>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>✔ All Professional features</li>
                <li>✔ Dedicated relationship manager</li>
                <li>✔ Exclusive networking events</li>
                <li>✔ API & Data integrations</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
