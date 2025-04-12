
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, TrendingUp, LineChart, Briefcase, DollarSign, BrainCircuit } from "lucide-react";

const InvestmentReports = () => {
  const marketReports = [
    {
      id: 1,
      title: "Q2 2023 Tech Sector Analysis",
      description: "In-depth analysis of the technology sector performance, trends, and future outlook.",
      type: "Sector Analysis",
      date: "Jun 15, 2023",
      premium: true,
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Global Macroeconomic Update",
      description: "Comprehensive review of global economic trends, central bank policies, and market implications.",
      type: "Macro",
      date: "May 22, 2023",
      premium: true,
      icon: <LineChart className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Institutional Fund Flows Report",
      description: "Analysis of institutional investment patterns, capital flows, and sector rotations.",
      type: "Fund Flows",
      date: "Apr 10, 2023",
      premium: false,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const equityReports = [
    {
      id: 1,
      title: "AI & Machine Learning Stocks",
      description: "Fundamental analysis of top AI companies with growth projections and valuation metrics.",
      type: "Sector Deep Dive",
      date: "Jun 30, 2023",
      premium: true,
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Fortune 100 Forensic Analysis",
      description: "Risk assessment and financial health analysis of Fortune 100 companies.",
      type: "Risk Analysis",
      date: "Jun 12, 2023",
      premium: true,
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Dividend Aristocrats Portfolio",
      description: "Analysis of top dividend-paying stocks with consistent growth and strong fundamentals.",
      type: "Income Strategy",
      date: "May 05, 2023",
      premium: false,
      icon: <DollarSign className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-finance-blue py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Premium Investment Reports & Analytics
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Access institutional-grade market intelligence, equity analysis, and investment recommendations.
              </p>
              <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                Explore Reports
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50 dark:bg-finance-gray/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="market" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-white dark:bg-finance-gray">
                    <TabsTrigger value="market" className="text-sm sm:text-base">Market Intelligence</TabsTrigger>
                    <TabsTrigger value="equity" className="text-sm sm:text-base">Equity Analysis</TabsTrigger>
                    <TabsTrigger value="thematic" className="text-sm sm:text-base">Thematic Research</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="market">
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                        Market Intelligence Reports
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Gain insights into sector trends, macroeconomic developments, and institutional fund flows with our comprehensive market intelligence reports.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {marketReports.map((report) => (
                        <Card key={report.id} className="finance-card">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="bg-finance-blue/10 dark:bg-blue-900/30 p-2 rounded-md text-finance-blue dark:text-blue-400">
                                {report.icon}
                              </div>
                              {report.premium && (
                                <span className="bg-finance-gold/90 text-white text-xs font-bold py-1 px-2 rounded">
                                  PREMIUM
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-xl font-bold mt-4 text-finance-blue dark:text-white">
                              {report.title}
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                              <span>{report.type}</span>
                              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                              <span>{report.date}</span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-300">
                              {report.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">View Report</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="gap-2">
                        <span>View All Market Reports</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="equity">
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                        Equity & Portfolio Analysis
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Access in-depth equity analysis, forensic risk scoring, and AI-driven growth predictions to optimize your portfolio.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {equityReports.map((report) => (
                        <Card key={report.id} className="finance-card">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="bg-finance-green/10 dark:bg-green-900/30 p-2 rounded-md text-finance-green dark:text-green-400">
                                {report.icon}
                              </div>
                              {report.premium && (
                                <span className="bg-finance-gold/90 text-white text-xs font-bold py-1 px-2 rounded">
                                  PREMIUM
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-xl font-bold mt-4 text-finance-blue dark:text-white">
                              {report.title}
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                              <span>{report.type}</span>
                              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                              <span>{report.date}</span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-300">
                              {report.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">View Report</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="gap-2">
                        <span>View All Equity Reports</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="thematic">
                  <div className="text-center py-12">
                    <div className="bg-white dark:bg-finance-gray rounded-lg p-8 shadow-md max-w-2xl mx-auto">
                      <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-4">
                        Thematic & Event-Driven Reports
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Our premium thematic research covers M&A activity, IPOs, corporate restructurings, and earnings surprises to give you an edge in the market.
                      </p>
                      <Button>
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                  Why Choose Our Investment Reports?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our reports combine fundamental analysis, advanced data science, and institutional expertise to provide actionable investment insights.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Institutional-Grade Research",
                    description: "The same quality analysis used by top hedge funds and asset managers worldwide.",
                    icon: <Briefcase className="h-10 w-10 text-finance-blue dark:text-blue-400" />
                  },
                  {
                    title: "AI-Enhanced Insights",
                    description: "Cutting-edge machine learning algorithms to identify patterns and opportunities.",
                    icon: <BrainCircuit className="h-10 w-10 text-finance-green dark:text-green-400" />
                  },
                  {
                    title: "Proprietary Valuation Models",
                    description: "Exclusive frameworks for assessing intrinsic value and growth potential.",
                    icon: <BarChart3 className="h-10 w-10 text-finance-accent dark:text-purple-400" />
                  },
                  {
                    title: "Expert Analysis",
                    description: "Written by seasoned financial analysts with decades of market experience.",
                    icon: <FileText className="h-10 w-10 text-finance-blue dark:text-blue-400" />
                  },
                  {
                    title: "Actionable Recommendations",
                    description: "Clear buy, hold, and sell guidance with price targets and risk assessments.",
                    icon: <TrendingUp className="h-10 w-10 text-finance-green dark:text-green-400" />
                  },
                  {
                    title: "Timely Updates",
                    description: "Real-time insights on market-moving events and opportunities.",
                    icon: <LineChart className="h-10 w-10 text-finance-accent dark:text-purple-400" />
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-finance-gray p-6 rounded-xl shadow-md">
                    <div className="mb-4 bg-finance-blue/10 dark:bg-blue-900/30 p-3 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-finance-blue dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentReports;
