
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, BarChart3, TrendingUp, Search, Shield, LineChart, Database, Zap } from "lucide-react";

const ResearchPlatform = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-finance-blue py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 bg-white/10 p-3 rounded-xl">
                <BrainCircuit className="h-10 w-10 text-blue-300" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                AI-Powered Financial Research Platform
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Leverage cutting-edge artificial intelligence to identify investment opportunities and optimize your portfolio.
              </p>
              <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                Explore Platform
              </Button>
            </div>
          </div>
        </section>

        {/* Platform Preview */}
        <section className="py-16 bg-white dark:bg-finance-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-finance-blue dark:text-white mb-4">
                  Institutional-Grade Research Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our AI-powered platform gives you access to the same sophisticated tools and data used by top hedge funds and asset managers.
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-white dark:bg-finance-gray shadow-xl rounded-lg overflow-hidden">
                  <div className="bg-finance-blue p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="rounded-full w-3 h-3 bg-red-500"></div>
                      <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                      <div className="rounded-full w-3 h-3 bg-green-500"></div>
                    </div>
                    <p className="text-white text-sm">FinIntel AI Research Platform</p>
                    <div></div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left Sidebar */}
                      <div className="col-span-12 lg:col-span-3">
                        <div className="space-y-4">
                          <div className="bg-finance-blue/5 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-finance-blue dark:text-blue-300 mb-3">AI Screener</h3>
                            <div className="space-y-2">
                              <div className="bg-white dark:bg-finance-gray/80 p-2 rounded flex items-center">
                                <Search className="h-4 w-4 text-finance-blue mr-2" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Buffett Value Stocks</span>
                              </div>
                              <div className="bg-finance-blue dark:bg-blue-700 p-2 rounded flex items-center">
                                <Zap className="h-4 w-4 text-white mr-2" />
                                <span className="text-sm text-white">AI Growth Prediction</span>
                              </div>
                              <div className="bg-white dark:bg-finance-gray/80 p-2 rounded flex items-center">
                                <Shield className="h-4 w-4 text-finance-blue mr-2" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Defensive Portfolio</span>
                              </div>
                              <div className="bg-white dark:bg-finance-gray/80 p-2 rounded flex items-center">
                                <TrendingUp className="h-4 w-4 text-finance-blue mr-2" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Momentum Leaders</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-finance-blue/5 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-finance-blue dark:text-blue-300 mb-3">Recent Activity</h3>
                            <div className="space-y-3">
                              {[
                                { text: "Unusual volume in tech sector", time: "10m ago" },
                                { text: "New hedge fund 13F filings", time: "1h ago" },
                                { text: "Smart money flow alert", time: "2h ago" },
                                { text: "Portfolio risk analysis", time: "Yesterday" }
                              ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                                  <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{item.text}</p>
                                    <p className="text-xs text-gray-400">{item.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="col-span-12 lg:col-span-9">
                        <div className="space-y-6">
                          <div className="bg-white dark:bg-finance-gray/80 shadow p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-finance-blue dark:text-white mb-3">AI Growth Prediction Model</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Model Confidence</p>
                                <p className="text-lg font-bold text-finance-blue dark:text-white">87%</p>
                              </div>
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Signals Analyzed</p>
                                <p className="text-lg font-bold text-finance-blue dark:text-white">26,543</p>
                              </div>
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                                <p className="text-lg font-bold text-finance-blue dark:text-white">5m ago</p>
                              </div>
                            </div>
                            
                            <div className="relative h-64 w-full bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 rounded">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full px-4">
                                  <div className="flex items-end h-40">
                                    {[20, 40, 65, 45, 50, 62, 80, 75, 90, 85, 92].map((height, index) => (
                                      <div key={index} className="flex-1 flex items-end mx-0.5">
                                        <div 
                                          className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                                          style={{ height: `${height}%` }}
                                        ></div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    <span>Now</span>
                                    <span>3 months</span>
                                    <span>6 months</span>
                                    <span>1 year</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-finance-gray/80 shadow p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-finance-blue dark:text-blue-300 mb-3">Top Growth Predictions</h3>
                              <div className="space-y-2">
                                {[
                                  { symbol: "NVDA", name: "NVIDIA Corp", growth: "42%", confidence: "Very High" },
                                  { symbol: "TSLA", name: "Tesla Inc", growth: "38%", confidence: "High" },
                                  { symbol: "AMD", name: "Advanced Micro Devices", growth: "35%", confidence: "High" },
                                  { symbol: "MSFT", name: "Microsoft Corp", growth: "28%", confidence: "Very High" },
                                ].map((stock) => (
                                  <div key={stock.symbol} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                    <div>
                                      <p className="font-medium text-finance-blue dark:text-white">{stock.symbol}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-green-600">{stock.growth}</p>
                                      <p className="text-xs text-gray-500 text-right">{stock.confidence}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-white dark:bg-finance-gray/80 shadow p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-finance-blue dark:text-blue-300 mb-3">Risk Assessment</h3>
                              <div className="space-y-3">
                                {[
                                  { name: "Market Risk", score: 65 },
                                  { name: "Volatility", score: 48 },
                                  { name: "Economic Sensitivity", score: 72 },
                                  { name: "Liquidity Risk", score: 25 },
                                ].map((risk) => (
                                  <div key={risk.name} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-600 dark:text-gray-300">{risk.name}</span>
                                      <span className="text-finance-blue dark:text-blue-300">{risk.score}/100</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          risk.score > 70 ? 'bg-red-500' : risk.score > 40 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${risk.score}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button className="bg-finance-blue hover:bg-finance-accent">
                    View Full Platform Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50 dark:bg-finance-gray/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-finance-blue dark:text-white mb-4">
                Advanced AI Research Capabilities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Our AI platform combines machine learning, natural language processing, and quantitative analysis to provide institutional-grade insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Search className="h-10 w-10 text-finance-blue dark:text-blue-400" />,
                  title: "AI-Based Stock Screening",
                  description: "Identify investment opportunities using predictive earnings models and Buffett-style intrinsic valuation techniques.",
                  features: [
                    "Predictive earnings models",
                    "Intrinsic value calculations",
                    "Growth potential scoring",
                    "Financial health analysis"
                  ]
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-finance-green dark:text-green-400" />,
                  title: "Institutional Trading Activity",
                  description: "Track smart money flows, unusual volume patterns, and institutional investor positions through 13F filings.",
                  features: [
                    "Unusual volume detection",
                    "Smart money flow analysis",
                    "Hedge fund 13F tracking",
                    "Institutional ownership changes"
                  ]
                },
                {
                  icon: <Shield className="h-10 w-10 text-finance-accent dark:text-purple-400" />,
                  title: "Portfolio Optimization",
                  description: "Optimize your portfolio with advanced risk modeling, custom backtesting, and factor-based investing tools.",
                  features: [
                    "Factor-based investing",
                    "Portfolio backtesting",
                    "Risk-adjusted returns",
                    "Tail-risk hedging strategies"
                  ]
                },
                {
                  icon: <Database className="h-10 w-10 text-finance-gold dark:text-yellow-400" />,
                  title: "Alternative Data Analysis",
                  description: "Incorporate alternative data sources including AI sentiment analysis, Google Trends, and sector correlations.",
                  features: [
                    "Sentiment analysis",
                    "Web search trends",
                    "Social media signals",
                    "Alternative data integration"
                  ]
                }
              ].map((feature, index) => (
                <Card key={index} className="finance-card">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold text-finance-blue dark:text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
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
        </section>
        
        {/* CTA Section */}
        <section className="py-20 finance-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to harness the power of AI for your investment strategy?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Join leading institutions that trust our AI-powered research platform to gain an edge in the market.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
                  Schedule a Demo
                </Button>
                {/* <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  View Pricing
                </Button> */}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPlatform;
