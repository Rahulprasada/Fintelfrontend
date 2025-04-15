import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    return (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow px-6 py-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    
            <p className="mb-4">
              Welcome to <strong>FinIntel </strong>. By accessing or using our Exclusive Investor Community & Thought Leadership platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Platform</h2>
            <p className="mb-4">
              FinIntel  provides a platform for institutional investors, portfolio managers, and financial leaders to connect, collaborate, and share insights. You agree to use the platform only for lawful purposes and in accordance with these Terms.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration</h2>
            <p className="mb-4">
              To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
            <p className="mb-4">
              All content on the platform, including text, graphics, logos, and software, is the property of FinIntel  or its content contributors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Community Guidelines</h2>
            <p className="mb-4">
              Users are expected to engage respectfully and professionally. Harassment, spam, and inappropriate content are strictly prohibited and may result in account suspension or termination.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Termination</h2>
            <p className="mb-4">
              FinIntel  reserves the right to suspend or terminate your access to the platform at our discretion, without notice, if you violate these Terms or engage in harmful behavior.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The platform is provided "as is" without warranties of any kind. FinIntel  does not guarantee the accuracy, completeness, or reliability of content shared on the platform.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              FinIntel  shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p className="mb-4">
              We may update these Terms from time to time. Continued use of the platform after changes means you accept the updated terms.
            </p>
    
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
            <p className="mb-4">
              For questions regarding these Terms of Service, please contact us:
            </p>
            <address className="not-italic mb-4">
              FinIntel <br />
              123 Wall Street<br />
              New York, NY<br />
              Phone: +1 (555) 123-4567<br />
              Email: <a href="mailto:info@FinIntel .com" className="text-blue-600">info@FinIntel .com</a>
            </address>
          </main>
          <Footer />
        </div>
      );
    };

export default TermsOfService
