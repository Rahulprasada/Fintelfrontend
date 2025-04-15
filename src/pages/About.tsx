import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">About FinIntel </h1>
          <p className="text-lg text-gray-600 mb-10">
            Connecting institutional investors, portfolio managers, and financial leaders through thought leadership and a thriving investor community.
          </p>
        </div>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At <strong>FinIntel </strong>, our mission is to empower investment professionals with the tools, insights, and community needed to make informed and impactful financial decisions. 
            We foster a collaborative space for industry leaders to share knowledge, discover trends, and shape the future of finance together.
          </p>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Expert Network</h3>
              <p className="text-gray-600">Gain access to a curated network of top institutional investors and financial experts from around the globe.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Thought Leadership</h3>
              <p className="text-gray-600">Stay ahead with exclusive insights, research papers, and strategic discussions led by industry leaders.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Collaboration Hub</h3>
              <p className="text-gray-600">Engage in collaborative problem-solving, roundtables, and private forums for investment ideation and innovation.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Headquarters</h2>
          <div className="bg-white shadow-md rounded-xl p-6 text-gray-700">
            <p><strong>FinIntel </strong></p>
            <p>123 Wall Street</p>
            <p>New York, NY</p>
            <p className="mt-2">📞 +1 (555) 123-4567</p>
            <p>📧 <a href="mailto:info@FinIntel .com" className="text-blue-600">info@FinIntel .com</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
