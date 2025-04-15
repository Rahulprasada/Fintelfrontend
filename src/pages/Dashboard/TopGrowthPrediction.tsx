import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@mui/material";

interface StockPrediction {
  ticker: string;
  company: string;
  growth: number;
  status: "Very High" | "High" | "Medium" | "Low";
}

const stockPredictions: StockPrediction[] = [
  { ticker: "NVDA", company: "NVIDIA Corp", growth: 42, status: "Very High" },
  { ticker: "TSLA", company: "Tesla Inc", growth: 38, status: "High" },
  { ticker: "AMD", company: "Advanced Micro Devices", growth: 35, status: "High" },
  { ticker: "MSFT", company: "Microsoft Corp", growth: 28, status: "Very High" },
];

const TopGrowthPredictions = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold text-finance-blue">Top Growth Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stockPredictions.map((stock) => (
            <>
            <div key={stock.ticker} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-finance-blue">{stock.ticker}</span>
                <span className="text-xs text-gray-500">{stock.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-medium ${
                  stock.growth > 40 ? "text-green-600" : 
                  stock.growth > 30 ? "text-green-500" : "text-green-400"
                }`}>
                  {stock.growth}%
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stock.status === "Very High" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {stock.status}
                </span>
              </div>
            </div>
            <div  className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10"/>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopGrowthPredictions;