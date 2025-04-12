import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Legal Disclaimer</h1>

        <p className="mb-4">
          The following legal disclaimer applies to all content, communications, and services provided through the <strong>FinIntel</strong> platform, including its Exclusive Investor Community & Thought Leadership initiatives.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. No Investment Advice</h2>
        <p className="mb-4">
          The content provided on this platform is for informational purposes only and does not constitute financial, investment, legal, or other professional advice. FinIntel does not endorse any specific strategies, products, or investments discussed on the platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. No Offer or Solicitation</h2>
        <p className="mb-4">
          Nothing on this platform constitutes an offer or solicitation to buy or sell securities or any other financial instruments. Users should perform their own due diligence before making investment decisions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Accuracy of Information</h2>
        <p className="mb-4">
          While we strive to ensure that all information shared on the platform is accurate and current, FinIntel makes no warranties or representations as to the completeness or accuracy of any content. Users rely on information at their own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Content</h2>
        <p className="mb-4">
          The platform may contain links to third-party websites or content contributed by other users. FinIntel is not responsible for the accuracy or reliability of any third-party material and disclaims all liability in connection with it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, FinIntel shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our platform or any content therein.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Legal Jurisdiction</h2>
        <p className="mb-4">
          These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles. Any legal action or proceeding shall be brought exclusively in the courts located in New York, NY.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding this legal disclaimer, please contact us:
        </p>
        <address className="not-italic mb-4">
          FinIntel<br />
          123 Wall Street<br />
          New York, NY<br />
          Phone: +1 (555) 123-4567<br />
          Email: <a href="mailto:info@finintel.com" className="text-blue-600">info@finintel.com</a>
        </address>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
