
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BrainCircuit, BarChart3, Users, Briefcase } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-finance-gray/30">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-finance-blue rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-finance-blue dark:text-white mb-6">
                Ready to elevate your investment strategy?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Join leading institutions and gain access to premium financial intelligence, AI-powered research, and our exclusive investor community.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild className="bg-finance-blue hover:bg-finance-accent text-white">
                  <Link to="/contact">Schedule a Demo</Link>
                </Button>
                {/* <Button asChild variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10 dark:border-white dark:text-white">
                  <Link to="/pricing">View Pricing</Link>
                </Button> */}
              </div>
              
              <div className="flex flex-wrap gap-y-4 gap-x-8">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">7-day free trial</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">No credit card required</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Cancel anytime</span>
                </div>
              </div>
            </div>
            
            <div className="bg-finance-blue/5 dark:bg-white/5 p-8 md:p-12 lg:p-16 flex items-center">
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="bg-white dark:bg-finance-gray/80 rounded-xl p-6 shadow-md">
                  <BarChart3 className="h-8 w-8 text-finance-blue dark:text-blue-400 mb-4" />
                  <h3 className="font-semibold text-lg text-finance-blue dark:text-white mb-2">Investment Reports</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive market analysis and recommendations</p>
                </div>
                <div className="bg-white dark:bg-finance-gray/80 rounded-xl p-6 shadow-md">
                  <BrainCircuit className="h-8 w-8 text-finance-green dark:text-green-400 mb-4" />
                  <h3 className="font-semibold text-lg text-finance-blue dark:text-white mb-2">AI Research</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Predictive analytics and algorithmic insights</p>
                </div>
                <div className="bg-white dark:bg-finance-gray/80 rounded-xl p-6 shadow-md">
                  <Briefcase className="h-8 w-8 text-finance-accent dark:text-purple-400 mb-4" />
                  <h3 className="font-semibold text-lg text-finance-blue dark:text-white mb-2">Advisory Services</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Customized strategies for institutions</p>
                </div>
                <div className="bg-white dark:bg-finance-gray/80 rounded-xl p-6 shadow-md">
                  <Users className="h-8 w-8 text-finance-gold dark:text-yellow-400 mb-4" />
                  <h3 className="font-semibold text-lg text-finance-blue dark:text-white mb-2">Investor Community</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Exclusive network and thought leadership</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
