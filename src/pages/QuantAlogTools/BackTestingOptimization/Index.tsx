import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  Download,
  Play,
  Settings,
  Save,
  RefreshCw,
} from "lucide-react";
import {
  BacktestResults,
  PositionSizing,
  SignalStrategy,
} from "../SignalGenerator/QuantEngine";
import { DatePicker } from "@/components/ui/date-picker";

// Mock data for backtesting
const mockStrategies: SignalStrategy[] = [
  {
    id: "strategy-1",
    name: "RSI Rebound",
    description: "Buy when RSI < 30 and price > SMA 50",
    source: "rule-based",
    timeFrame: "daily",
    indicators: ["RSI", "SMA"],
    rules: [
      {
        id: "rule-1",
        indicator: "RSI",
        comparator: "<",
        value: 30,
        conjunction: "AND",
      },
      { id: "rule-2", indicator: "SMA", comparator: ">", value: 50 },
    ],
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-15"),
  },
  {
    id: "strategy-2",
    name: "ML Trend Following",
    description: "Follow trends identified by ML model",
    source: "ml",
    timeFrame: "daily",
    indicators: [],
    mlModel: "trend-classification",
    rules: [],
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-04-10"),
  },
];

const mockSizingStrategies: PositionSizing[] = [
  {
    id: "sizing-1",
    name: "Kelly Criterion",
    method: "Kelly",
    initialCapital: 1000000,
    rules: [
      { id: "sizing-rule-1", type: "max-per-trade", value: 10 },
      { id: "sizing-rule-2", type: "max-per-sector", value: 25 },
    ],
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-04-05"),
  },
  {
    id: "sizing-2",
    name: "Fixed Percentage",
    method: "Fixed",
    initialCapital: 500000,
    rules: [{ id: "sizing-rule-3", type: "max-per-trade", value: 5 }],
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-15"),
  },
];

// Sample backtest results
const mockBacktestResults: BacktestResults = {
  id: "backtest-1",
  settingsId: "settings-1",
  metrics: {
    cagr: 14.2,
    sharpe: 1.1,
    sortino: 1.4,
    maxDrawdown: 18,
    winRate: 62,
    averageGain: 3.8,
    averageLoss: 2.1,
  },
  equityCurve: Array.from({ length: 24 }, (_, i) => ({
    date: new Date(2022, i % 12, 1),
    value: 1000000 * (1 + (0.01 * (i + 1) + Math.sin(i / 3) * 0.05)),
  })),
  drawdownCurve: Array.from({ length: 24 }, (_, i) => ({
    date: new Date(2022, i % 12, 1),
    value: -Math.abs(Math.sin(i / 4) * 18),
  })),
  trades: Array.from({ length: 10 }, (_, i) => ({
    id: `trade-${i + 1}`,
    entryDate: new Date(2022, i % 12, i + 1),
    entryPrice: 1000 + i * 10 + Math.random() * 50,
    exitDate: new Date(2022, i % 12, i + 3 + Math.floor(Math.random() * 5)),
    exitPrice: 1000 + i * 10 + Math.random() * 100,
    symbol: ["TCS", "INFY", "RELIANCE", "HDFCBANK", "ICICIBANK"][i % 5],
    action: ["BUY", "SELL"][i % 2] as "BUY" | "SELL",
    quantity: 100 + i * 10,
    pnl: (i % 2 === 0 ? 1 : -1) * (Math.random() * 5000 + 1000),
    returnPercentage: (i % 2 === 0 ? 1 : -1) * (Math.random() * 5 + 1),
  })),
  optimizationResults: Array.from({ length: 5 }, (_, i) => ({
    parameter: "RSI Threshold",
    value: 25 + i,
    sharpe: 1.0 + i * 0.1,
    cagr: 12 + i * 0.8,
  })),
};

// Mock asset universe
const mockAssets = [
  { value: "NIFTY50", label: "Nifty 50" },
  { value: "BANKNIFTY", label: "Bank Nifty" },
  { value: "TCS", label: "TCS" },
  { value: "INFY", label: "Infosys" },
  { value: "RELIANCE", label: "Reliance" },
  { value: "HDFCBANK", label: "HDFC Bank" },
  { value: "ICICIBANK", label: "ICICI Bank" },
];

const BackTestingOptimization = () => {
  const [selectedTab, setSelectedTab] = useState("backtest");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2022, 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedStrategy, setSelectedStrategy] =
    useState<string>("strategy-1");
  const [selectedSizingStrategy, setSelectedSizingStrategy] =
    useState<string>("sizing-1");
  const [selectedAssetUniverse, setSelectedAssetUniverse] = useState<string[]>([
    "NIFTY50",
  ]);
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [backtestResults, setBacktestResults] =
    useState<BacktestResults | null>(null);
  const [optimizationParameter, setOptimizationParameter] =
    useState<string>("RSI Threshold");
  const [optimizationMin, setOptimizationMin] = useState<number>(20);
  const [optimizationMax, setOptimizationMax] = useState<number>(40);
  const [optimizationStep, setOptimizationStep] = useState<number>(5);

  const runBacktest = () => {
    setIsBacktesting(true);
    // Simulate API call delay
    setTimeout(() => {
      setBacktestResults(mockBacktestResults);
      setIsBacktesting(false);
    }, 1500);
  };

  const runOptimization = () => {
    setIsBacktesting(true);
    // Simulate API call delay
    setTimeout(() => {
      setBacktestResults(mockBacktestResults);
      setIsBacktesting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <div className="mb-6">
            <TabsList className="grid grid-cols-1 sm:grid-cols-2 w-full bg-gray-100">
              <TabsTrigger
                value="backtest"
                className="data-[state=active]:bg-finance-blue data-[state=active]:text-white"
              >
                Backtest
              </TabsTrigger>
              <TabsTrigger
                value="optimization"
                className="data-[state=active]:bg-finance-blue data-[state=active]:text-white"
              >
                Parameter Optimization
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {/* Common inputs for both tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signal Strategy
                </label>
                <Select
                  value={selectedStrategy}
                  onValueChange={setSelectedStrategy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStrategies.map((strategy) => (
                      <SelectItem key={strategy.id} value={strategy.id}>
                        {strategy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Sizing
                </label>
                <Select
                  value={selectedSizingStrategy}
                  onValueChange={setSelectedSizingStrategy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sizing" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSizingStrategies.map((sizing) => (
                      <SelectItem key={sizing.id} value={sizing.id}>
                        {sizing.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Universe
                </label>
                <Select
                  value={selectedAssetUniverse[0]}
                  onValueChange={(val) => setSelectedAssetUniverse([val])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assets" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAssets.map((asset) => (
                      <SelectItem key={asset.value} value={asset.value}>
                        {asset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  placeholder="Select start date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                  placeholder="Select end date"
                />
              </div>
            </div>

            <TabsContent value="backtest" className="mt-4 space-y-4">
              <div className="flex justify-center">
                <Button
                  onClick={runBacktest}
                  disabled={isBacktesting}
                  className="bg-finance-blue hover:bg-finance-blue/90 text-white"
                >
                  {isBacktesting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Running Backtest...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Backtest
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parameter
                  </label>
                  <Select
                    value={optimizationParameter}
                    onValueChange={setOptimizationParameter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parameter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RSI Threshold">
                        RSI Threshold
                      </SelectItem>
                      <SelectItem value="SMA Period">SMA Period</SelectItem>
                      <SelectItem value="Stop-Loss %">Stop-Loss %</SelectItem>
                      <SelectItem value="Take-Profit %">
                        Take-Profit %
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Value
                  </label>
                  <Input
                    type="number"
                    value={optimizationMin}
                    onChange={(e) => setOptimizationMin(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Value
                  </label>
                  <Input
                    type="number"
                    value={optimizationMax}
                    onChange={(e) => setOptimizationMax(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Step Size
                  </label>
                  <Input
                    type="number"
                    value={optimizationStep}
                    onChange={(e) =>
                      setOptimizationStep(Number(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={runOptimization}
                  disabled={isBacktesting}
                  className="bg-finance-teal hover:bg-finance-teal/90 text-white"
                >
                  {isBacktesting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Settings className="mr-2 h-4 w-4" />
                      Run Optimization
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Results Section (shown when backtestResults exist) */}
        {backtestResults && (
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-finance-navy">
              Backtest Results
            </h3>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-finance-blue/5 border-finance-blue/30">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-finance-navy">
                    {backtestResults.metrics.cagr.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600">CAGR</div>
                </CardContent>
              </Card>

              <Card className="bg-finance-purple/5 border-finance-purple/30">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-finance-navy">
                    {backtestResults.metrics.sharpe.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Sharpe Ratio</div>
                </CardContent>
              </Card>

              <Card className="bg-finance-red/5 border-finance-red/30">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-finance-navy">
                    -{backtestResults.metrics.maxDrawdown.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600">Max Drawdown</div>
                </CardContent>
              </Card>

              <Card className="bg-finance-green/5 border-finance-green/30">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-finance-navy">
                    {backtestResults.metrics.winRate.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card
                style={{
                  background: "linear-gradient(to right, #e0f7ff, #ffffff)",
                }}
              >
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-4">Equity Curve</h4>
                  <div className="h-[100%]">
                    <ChartContainer config={{ value: { color: "#1E3A8A" } }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={backtestResults.equityCurve}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) => {
                              if (!(date instanceof Date)) return "";
                              return new Intl.DateTimeFormat("en", {
                                month: "short",
                                year: "2-digit",
                              }).format(date);
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(date) => {
                              if (!(date instanceof Date)) return "";
                              return new Intl.DateTimeFormat("en", {
                                dateStyle: "medium",
                              }).format(new Date(date));
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#1E3A8A"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="p-6"
                style={{
                  background: "linear-gradient(to right, #e0f7ff, #ffffff)",
                }}
              >
                <CardContent className="pt-2">
                  <h4 className="font-medium mb-4">Drawdown Chart</h4>
                  <div className="h-[100%]">
                    <ChartContainer config={{ value: { color: "#DC2626" } }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={backtestResults.drawdownCurve}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) => {
                              if (!(date instanceof Date)) return "";
                              return new Intl.DateTimeFormat("en", {
                                month: "short",
                                year: "2-digit",
                              }).format(date);
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(date) => {
                              if (!(date instanceof Date)) return "";
                              return new Intl.DateTimeFormat("en", {
                                dateStyle: "medium",
                              }).format(new Date(date));
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            fill="#FECACA"
                            stroke="#DC2626"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trade Log */}
            <div className="mb-6 mt-6">
              <h4 className="font-medium mb-4">Trade Log</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-200">
                  <thead className="bg-finance-blue text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Entry Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Entry Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Exit Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Exit Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        P&L
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Return %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {backtestResults.trades.map((trade) => (
                      <tr key={trade.id}>
                        <td className="px-4 py-2 text-sm">{trade.symbol}</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge
                            className={`w-16 text-center ${
                              trade.action === "BUY"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {trade.action === "BUY" ? (
                              <ArrowUp size={12} className="mr-1" />
                            ) : (
                              <ArrowDown size={12} className="mr-1" />
                            )}
                            {trade.action}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {trade.entryDate.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          ₹{trade.entryPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {trade.exitDate?.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          ₹{trade.exitPrice?.toFixed(2)}
                        </td>
                        <td
                          className={`px-4 py-2 text-sm font-medium ${
                            (trade.pnl || 0) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {(trade.pnl || 0) >= 0 ? "+" : ""}₹
                          {(trade.pnl || 0).toFixed(2)}
                        </td>
                        <td
                          className={`px-4 py-2 text-sm font-medium ${
                            (trade.returnPercentage || 0) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {(trade.returnPercentage || 0) >= 0 ? "+" : ""}
                          {(trade.returnPercentage || 0).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Optimization Results (only shown in optimization tab) */}
            {selectedTab === "optimization" &&
              backtestResults.optimizationResults && (
                <div className="mb-6">
                  <h4 className="font-medium mb-4">Optimization Results</h4>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h5 className="font-medium">
                            Parameter Sensitivity: {optimizationParameter}
                          </h5>
                          <p className="text-sm text-gray-500">
                            Results ranked by Sharpe Ratio
                          </p>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Download size={16} /> Export
                        </Button>
                      </div>

                      <div>
                        <ChartContainer
                          config={{
                            sharpe: { color: "#8B5CF6" },
                            cagr: { color: "#10B981" },
                          }}
                        >
                          <ResponsiveContainer>
                            <RechartsBarChart
                              data={backtestResults.optimizationResults}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="value" />
                              <YAxis
                                yAxisId="left"
                                orientation="left"
                                stroke="#8B5CF6"
                              />
                              <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#10B981"
                              />
                              <Tooltip />
                              <Legend />
                              <RechartsBar
                                yAxisId="left"
                                dataKey="sharpe"
                                name="Sharpe Ratio"
                                fill="#8B5CF6"
                              />
                              <RechartsBar
                                yAxisId="right"
                                dataKey="cagr"
                                name="CAGR (%)"
                                fill="#10B981"
                              />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-blue-200">
                          <thead className="bg-finance-blue text-white">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Parameter
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Value
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Sharpe
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                CAGR (%)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {backtestResults.optimizationResults
                              .sort((a, b) => b.sharpe - a.sharpe)
                              .map((result, index) => (
                                <tr
                                  key={index}
                                  className={index === 0 ? "bg-green-50" : ""}
                                >
                                  <td className="px-4 py-2 text-sm">
                                    {result.parameter}
                                  </td>
                                  <td className="px-4 py-2 text-sm">
                                    {result.value}
                                  </td>
                                  <td className="px-4 py-2 text-sm">
                                    {result.sharpe.toFixed(2)}
                                  </td>
                                  <td className="px-4 py-2 text-sm">
                                    {result.cagr.toFixed(2)}%
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

            <div className="flex flex-col sm:flex-row justify-between sm:gap-4">
              <Button variant="outline" className="gap-2 mb-4 sm:mb-0">
                <Download size={16} /> Export Results
              </Button>

              <Button className="gap-2 bg-finance-blue">
                <Save size={16} /> Save Configuration
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackTestingOptimization;
