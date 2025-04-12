
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-finance-blue">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0M20 40L40 20M0 20L20 0" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-6 animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-finance-blue dark:text-white">
                Financial Intelligence for <span className="text-finance-gold">Institutional Investors</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Premium investment reports, AI-powered research, institutional advisory services, and an exclusive investor community.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="bg-finance-blue hover:bg-finance-accent text-white rounded-md px-6 py-3">
                  <Link to="/research-platform">Explore Platform <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                {/* <Button asChild variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10 rounded-md px-6 py-3">
                  <Link to="/contact">Book a Demo</Link>
                </Button> */}
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                        alt="Client" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">100+</span> institutional clients trust our insights
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative animate-fade-in">
              <div className="bg-white dark:bg-finance-gray shadow-xl rounded-lg overflow-hidden">
                <div className="bg-finance-blue p-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="rounded-full w-3 h-3 bg-red-500"></div>
                    <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                    <div className="rounded-full w-3 h-3 bg-green-500"></div>
                  </div>
                  <p className="text-white text-sm">FinIntel Dashboard</p>
                  <div></div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">S&P 500</h3>
                      <div className="flex items-end justify-between mt-2">
                        <p className="text-2xl font-bold text-finance-blue dark:text-white">4,782.21</p>
                        <p className="text-green-600 flex items-center">+1.2% <ArrowRight className="h-3 w-3 rotate-45 ml-1" /></p>
                      </div>
                      <div className="mt-4 h-24 w-full bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded relative overflow-hidden">
                        <svg viewBox="0 0 100 20" className="absolute bottom-0 w-full h-full">
                          <path 
                            fill="none"
                            stroke="#3A7CA5"
                            strokeWidth="1"
                            d="M0,10 L5,8 L10,12 L15,7 L20,9 L25,5 L30,8 L35,6 L40,10 L45,8 L50,11 L55,9 L60,7 L65,10 L70,6 L75,8 L80,5 L85,9 L90,7 L95,11 L100,10"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Sentiment</h3>
                      <div className="mt-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-4 bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>Bearish</span>
                          <span>Neutral</span>
                          <span>Bullish</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">AI Prediction:</p>
                        <p className="text-lg font-medium text-finance-blue dark:text-white">Strong Bullish Trend</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on 24 indicators</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Recommendations</h3>
                      <div className="mt-2 space-y-2">
                        {[
                          { symbol: "AAPL", name: "Apple Inc", change: "+2.4%", action: "BUY", confidence: "High" },
                          { symbol: "MSFT", name: "Microsoft Corp", change: "+1.8%", action: "BUY", confidence: "High" },
                          { symbol: "NVDA", name: "NVIDIA Corp", change: "+3.6%", action: "STRONG BUY", confidence: "Very High" },
                        ].map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                            <div>
                              <p className="font-medium text-finance-blue dark:text-white">{stock.symbol}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                            </div>
                            <div className="text-green-600">{stock.change}</div>
                            <div className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-800 dark:text-green-300 text-xs font-medium">
                              {stock.action}
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
      </div>
    </div>
  );
};

export default Hero;
