
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, LineChart, BarChart3, Shield, Users, FileText, AlertTriangle, Settings, Building, Search } from "lucide-react";

const AdvisoryServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-finance-blue py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 bg-white/10 p-3 rounded-xl">
                <Briefcase className="h-10 w-10 text-blue-300" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Institutional Advisory & Hedge Fund Services
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Customized investment research, strategy development, and risk management for portfolio managers and institutional investors.
              </p>
              <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                  Our Advisory Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  We provide tailored financial intelligence and advisory services designed specifically for institutional investors, hedge funds, and wealth managers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <FileText className="h-10 w-10 text-finance-blue dark:text-blue-400" />,
                    title: "Bespoke Investment Research",
                    description: "Custom research reports tailored to your specific investment mandate, strategy, and areas of focus.",
                    features: [
                      "Proprietary valuation frameworks",
                      "Sector-specific deep dives",
                      "Competitive analysis",
                      "Management quality assessment"
                    ]
                  },
                  {
                    icon: <LineChart className="h-10 w-10 text-finance-green dark:text-green-400" />,
                    title: "Asset Allocation & Portfolio Structuring",
                    description: "Strategic portfolio construction to optimize risk-adjusted returns across market cycles.",
                    features: [
                      "Macro-driven allocation models",
                      "Cross-asset correlation analysis",
                      "Portfolio optimization algorithms",
                      "Risk-adjusted return enhancement"
                    ]
                  },
                  {
                    icon: <BarChart3 className="h-10 w-10 text-finance-accent dark:text-purple-400" />,
                    title: "Quantitative & Algo-Driven Strategies",
                    description: "Sophisticated algorithmic trading strategies leveraging advanced quantitative models.",
                    features: [
                      "Factor-based investing models",
                      "Statistical arbitrage strategies",
                      "Momentum and mean-reversion signals",
                      "Machine learning algorithms"
                    ]
                  },
                  {
                    icon: <AlertTriangle className="h-10 w-10 text-finance-gold dark:text-yellow-400" />,
                    title: "Crisis & Black Swan Event Monitoring",
                    description: "Proactive risk identification and monitoring for potential market disruptions and tail events.",
                    features: [
                      "Early warning indicator system",
                      "Stress testing scenarios",
                      "Cross-market contagion analysis",
                      "Real-time risk alerts"
                    ]
                  }
                ].map((service, index) => (
                  <Card key={index} className="finance-card">
                    <CardHeader>
                      <div className="mb-4">{service.icon}</div>
                      <CardTitle className="text-xl font-bold text-finance-blue dark:text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="rounded-full bg-finance-blue/10 dark:bg-blue-900/30 p-1 mr-2 mt-0.5">
                              <svg className="h-3 w-3 text-finance-blue dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client Types */}
        <section className="py-16 bg-gray-50 dark:bg-finance-gray/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                  Who We Serve
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our institutional advisory services are designed for sophisticated investors managing significant capital.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Briefcase className="h-14 w-14 text-finance-blue dark:text-blue-400" />,
                    title: "Hedge Funds",
                    clients: ["Long/Short Equity Funds", "Global Macro Funds", "Quantitative Funds", "Event-Driven Funds"]
                  },
                  {
                    icon: <Building className="h-14 w-14 text-finance-green dark:text-green-400" />,
                    title: "Asset Managers",
                    clients: ["Mutual Fund Companies", "ETF Issuers", "Pension Funds", "Sovereign Wealth Funds"]
                  },
                  {
                    icon: <Users className="h-14 w-14 text-finance-accent dark:text-purple-400" />,
                    title: "Private Wealth",
                    clients: ["Family Offices", "UHNW Advisors", "Private Banks", "Wealth Management Firms"]
                  }
                ].map((clientType, index) => (
                  <div key={index} className="bg-white dark:bg-finance-gray rounded-xl p-8 shadow-lg text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-finance-blue/10 dark:bg-blue-900/30 p-4 rounded-full">
                        {clientType.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-4">
                      {clientType.title}
                    </h3>
                    <ul className="space-y-2">
                      {clientType.clients.map((client, i) => (
                        <li key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                          {client}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                  Our Advisory Process
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  We follow a structured yet flexible approach to deliver customized advisory services to our institutional clients.
                </p>
              </div>
              
              <div className="relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
                
                <div className="space-y-12 relative">
                  {[
                    {
                      step: 1,
                      title: "Discovery & Assessment",
                      description: "We begin with a comprehensive assessment of your investment strategy, objectives, constraints, and risk tolerance.",
                      icon: <Search className="h-6 w-6 text-white" />
                    },
                    {
                      step: 2,
                      title: "Strategic Planning",
                      description: "Our team develops a customized research and advisory plan aligned with your specific needs and investment mandate.",
                      icon: <Settings className="h-6 w-6 text-white" />
                    },
                    {
                      step: 3,
                      title: "Implementation",
                      description: "We deploy our institutional-grade resources, including proprietary models and AI tools, to execute the strategic plan.",
                      icon: <BarChart3 className="h-6 w-6 text-white" />
                    },
                    {
                      step: 4,
                      title: "Ongoing Monitoring & Refinement",
                      description: "Regular review meetings ensure our advisory services continue to meet your evolving needs and market conditions.",
                      icon: <LineChart className="h-6 w-6 text-white" />
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                        {index % 2 === 0 ? (
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {step.description}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      
                      <div className="z-10 flex items-center justify-center bg-finance-blue w-12 h-12 rounded-full mb-4 md:mb-0 order-1 md:order-2">
                        <span className="text-white font-bold">{step.step}</span>
                      </div>
                      
                      <div className="md:w-1/2 md:pl-12 order-3">
                        {index % 2 !== 0 ? (
                          <div className="mt-4 md:mt-0">
                            <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {step.description}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 finance-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white/10 p-8 md:p-12 rounded-xl backdrop-blur-sm">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Partner with Financial Intelligence Experts
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let our team of experienced analysts and strategists help you navigate today's complex market environment.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                    Book a Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Request Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdvisoryServices;
