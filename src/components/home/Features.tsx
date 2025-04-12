
import { BarChart3, BrainCircuit, Briefcase, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <BarChart3 className="h-10 w-10 text-finance-blue dark:text-blue-400" />,
      title: "Premium Investment Reports & Analytics",
      description: "Comprehensive market intelligence, equity analysis, and buy/sell recommendations powered by advanced valuation models.",
      items: [
        "Market Intelligence Reports",
        "Equity & Portfolio Analysis",
        "Thematic & Event-Driven Reports",
        "Buy/Sell Recommendations"
      ],
      link: "/investment-reports"
    },
    {
      id: 2,
      icon: <BrainCircuit className="h-10 w-10 text-finance-green dark:text-green-400" />,
      title: "AI-Powered Financial Research Platform",
      description: "Leverage artificial intelligence for predictive modeling, screening, and portfolio optimization with institutional-grade tools.",
      items: [
        "AI-Based Stock Screening & Signals",
        "Institutional Trading Activity Tracker",
        "Portfolio Optimization & Risk Tools",
        "Alternative Data & Macro Correlations"
      ],
      link: "/research-platform"
    },
    {
      id: 3,
      icon: <Briefcase className="h-10 w-10 text-finance-accent dark:text-purple-400" />,
      title: "Institutional Advisory & Hedge Fund Services",
      description: "Bespoke investment research and strategy development for portfolio managers, wealth advisors, and institutional investors.",
      items: [
        "Bespoke Investment Research",
        "Asset Allocation & Portfolio Structuring",
        "Quantitative & Algo-Driven Strategies",
        "Crisis & Black Swan Event Monitoring"
      ],
      link: "/advisory-services"
    },
    {
      id: 4,
      icon: <Users className="h-10 w-10 text-finance-gold dark:text-yellow-400" />,
      title: "Exclusive Investor Community & Thought Leadership",
      description: "Join a network of institutional investors for strategy calls, webinars, and private roundtables with industry leaders.",
      items: [
        "Strategy Calls & Market Webinars",
        "Quarterly Macro & Earnings Forecasts",
        "Private Investment Roundtables",
        "Exclusive Research Access"
      ],
      link: "/community"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-finance-gray/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-blue dark:text-white mb-4">
            Our Key Offerings
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Comprehensive financial intelligence solutions designed for institutional investors, hedge funds, and wealth managers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="finance-card">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold text-finance-blue dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {feature.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="rounded-full bg-finance-blue/10 dark:bg-blue-900/30 p-1 mr-2 mt-0.5">
                        <svg className="h-3 w-3 text-finance-blue dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={feature.link} 
                  className="text-finance-blue dark:text-blue-400 font-medium hover:underline text-sm inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
