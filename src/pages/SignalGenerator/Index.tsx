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
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  Save,
  Download,
  Filter,
  Plus,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { SignalRule, TechnicalIndicator, TimeFrame } from "./QuantEngine";
import { sampleSignals } from "./QuantnData";
import BackGroundImage1 from "../../asset/cardbackground.jpg";

// Mock price data for the chart
const mockPriceData = Array.from({ length: 30 }, (_, i) => ({
  date: `Apr ${i + 1}`,
  price: 3500 + Math.sin(i / 3) * 200 + Math.random() * 50,
  volume: Math.floor(Math.random() * 100000) + 50000,
  signal: i === 8 || i === 22 ? "buy" : i === 15 ? "sell" : null,
}));

// Indicator options
const indicatorOptions: TechnicalIndicator[] = [
  "RSI",
  "MACD",
  "SMA",
  "EMA",
  "Bollinger",
  "ATR",
  "VWAP",
];
const timeFrameOptions: TimeFrame[] = [
  "intraday",
  "daily",
  "weekly",
  "monthly",
];

const SignalGenerator = () => {
  const [signalSource, setSignalSource] = useState<"ml" | "rule-based">(
    "rule-based"
  );
  const [selectedIndicators, setSelectedIndicators] = useState<
    TechnicalIndicator[]
  >(["RSI", "SMA"]);
  const [timeframe, setTimeframe] = useState<TimeFrame>("daily");
  const [selectedAsset, setSelectedAsset] = useState("TCS");
  const [rules, setRules] = useState<SignalRule[]>([
    {
      id: "rule-1",
      indicator: "RSI",
      comparator: "<",
      value: 30,
      conjunction: "AND",
    },
    {
      id: "rule-2",
      indicator: "SMA",
      comparator: ">",
      value: 50,
    },
  ]);
  const isMobile = useIsMobile();

  const addRule = () => {
    if (selectedIndicators.length === 0) return;

    const newRule: SignalRule = {
      id: `rule-${rules.length + 1}`,
      indicator: selectedIndicators[0],
      comparator: "<",
      value: 0,
      conjunction: rules.length > 0 ? "AND" : undefined,
    };

    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof SignalRule, value: any) => {
    setRules(
      rules.map((rule) => {
        if (rule.id === id) {
          return { ...rule, [field]: value };
        }
        return rule;
      })
    );
  };

  // For select/deselect indicators
  const toggleIndicator = (indicator: TechnicalIndicator) => {
    if (selectedIndicators.includes(indicator)) {
      setSelectedIndicators(selectedIndicators.filter((i) => i !== indicator));
    } else {
      setSelectedIndicators([...selectedIndicators, indicator]);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-2 rounded-lg"
        style={{
          backgroundImage: `url(${BackGroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-finance-navy mb-1 sm:mb-2">
            Quant Engine
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
            Generate trade signals, analyze setups, and test rule-based
            strategies using technical indicators and ML inputs.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 sm:p-6 border ">
        {/* <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-finance-navy">
          Signal Generator
        </h2> */}

        {/* Top Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Signal Source
            </label>
            <Tabs
              value={signalSource}
              onValueChange={(v) => setSignalSource(v as "ml" | "rule-based")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="rule-based" className="text-xs sm:text-sm">
                  Rule Based
                </TabsTrigger>
                <TabsTrigger value="ml" className="text-xs sm:text-sm">
                  ML Model
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Timeframe
            </label>
            <Select
              value={timeframe}
              onValueChange={(v) => setTimeframe(v as TimeFrame)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeFrameOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Asset
            </label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TCS">TCS</SelectItem>
                <SelectItem value="INFY">Infosys</SelectItem>
                <SelectItem value="RELIANCE">Reliance</SelectItem>
                <SelectItem value="HDFCBANK">HDFC Bank</SelectItem>
                <SelectItem value="ICICIBANK">ICICI Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {signalSource === "ml" && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                ML Model
              </label>
              <Select defaultValue="trend-classification">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select ML Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trend-classification">
                    Trend Classification
                  </SelectItem>
                  <SelectItem value="reversal-prediction">
                    Reversal Prediction
                  </SelectItem>
                  <SelectItem value="support-resistance">
                    Support/Resistance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Indicator Panel */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Select Indicators
          </label>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {indicatorOptions.map((indicator) => (
              <Badge
                key={indicator}
                variant={
                  selectedIndicators.includes(indicator) ? "default" : "outline"
                }
                className={`cursor-pointer text-xs sm:text-sm ${
                  selectedIndicators.includes(indicator)
                    ? "bg-finance-blue"
                    : ""
                }`}
                onClick={() => toggleIndicator(indicator)}
              >
                {indicator}
              </Badge>
            ))}
          </div>
        </div>

        {/* Rule Builder Section (only for rule-based) */}
        {signalSource === "rule-based" && (
          <div className="mb-4 sm:mb-6 border rounded-lg p-3 sm:p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h3 className="text-sm sm:text-base font-medium">
                Signal Conditions
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={addRule}
                className="text-xs sm:text-sm"
              >
                <Plus size={isMobile ? 14 : 16} className="mr-1" /> Add Rule
              </Button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {rules.map((rule, index) => (
                <div
                  key={rule.id}
                  className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white p-2 rounded border"
                >
                  {index > 0 && (
                    <Select
                      value={rule.conjunction}
                      onValueChange={(value) =>
                        updateRule(rule.id, "conjunction", value)
                      }
                    >
                      <SelectTrigger className="w-[60px] sm:w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  <Select
                    value={rule.indicator}
                    onValueChange={(value) =>
                      updateRule(
                        rule.id,
                        "indicator",
                        value as TechnicalIndicator
                      )
                    }
                  >
                    <SelectTrigger className="w-[70px] sm:w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedIndicators.map((indicator) => (
                        <SelectItem key={indicator} value={indicator}>
                          {indicator}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={rule.comparator}
                    onValueChange={(value) =>
                      updateRule(
                        rule.id,
                        "comparator",
                        value as "<" | ">" | "=" | "<=" | ">="
                      )
                    }
                  >
                    <SelectTrigger className="w-[60px] sm:w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<">&lt;</SelectItem>
                      <SelectItem value=">">&gt;</SelectItem>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value="<=">&lt;=</SelectItem>
                      <SelectItem value=">=">&gt;=</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    className="w-[70px] sm:w-[100px]"
                    value={rule.value as number}
                    onChange={(e) =>
                      updateRule(rule.id, "value", parseFloat(e.target.value))
                    }
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(rule.id)}
                  >
                    <X size={isMobile ? 14 : 16} />
                  </Button>
                </div>
              ))}

              {rules.length === 0 && (
                <div className="text-center text-gray-500 p-4">
                  No rules defined. Click "Add Rule" to create signal
                  conditions.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Button className="bg-finance-blue text-xs sm:text-sm">
            Generate Signals
          </Button>
          <Button
            variant="outline"
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Save size={isMobile ? 14 : 16} /> Save Strategy
          </Button>
          <Button
            variant="outline"
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Download size={isMobile ? 14 : 16} /> Export
          </Button>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Signal Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-green-50 shadow-md border p-8 border-gray-100">
              <CardContent className="pt-4 sm:pt-6">
                <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">
                  Signal Visualization
                </h3>
                <div className="h-[300px] sm:h-[400px]">
                  <ChartContainer
                    config={{
                      price: { color: "#1E3A8A" },
                      signal: { color: "#10B981" },
                      volume: { color: "#CBD5E1" },
                    }}
                  >
                    <LineChart
                      data={mockPriceData}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#1E3A8A"
                        strokeWidth={2}
                        dot={false}
                      />
                      {mockPriceData.map((point, i) => {
                        if (point.signal === "buy") {
                          return (
                            <ReferenceLine
                              key={`ref-${i}`}
                              x={point.date}
                              stroke="#10B981"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              label={{
                                value: "BUY",
                                position: "insideTop",
                                fill: "#10B981",
                                fontSize: isMobile ? 10 : 12,
                              }}
                            />
                          );
                        } else if (point.signal === "sell") {
                          return (
                            <ReferenceLine
                              key={`ref-${i}`}
                              x={point.date}
                              stroke="#EF4444"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              label={{
                                value: "SELL",
                                position: "insideTop",
                                fill: "#EF4444",
                                fontSize: isMobile ? 10 : 12,
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Signal Table */}
          <div>
            <Card className="bg-blue-50 shadow-md border border-gray-100">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-semibold">
                    Signal Output
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <Filter size={isMobile ? 14 : 16} className="mr-1" /> Filter
                  </Button>
                </div>

                <div className="overflow-auto max-h-[250px] sm:max-h-[350px]">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-left text-gray-500">
                          Date
                        </th>
                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-left text-gray-500">
                          Signal
                        </th>
                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-left text-gray-500">
                          Price
                        </th>
                        {signalSource === "ml" && (
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-left text-gray-500">
                            Conf.
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sampleSignals.map((signal) => (
                        <tr key={signal.id}>
                          <td className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs whitespace-nowrap">
                            {signal.timestamp.toLocaleDateString()}
                          </td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs">
                            <Badge
                              className={
                                signal.action === "BUY"
                                  ? "bg-green-500"
                                  : signal.action === "SELL"
                                  ? "bg-red-500"
                                  : signal.action === "SHORT"
                                  ? "bg-purple-500"
                                  : "bg-yellow-500"
                              }
                            >
                              {signal.action === "BUY" && (
                                <ArrowUp
                                  size={isMobile ? 10 : 12}
                                  className="mr-1"
                                />
                              )}
                              {signal.action === "SELL" && (
                                <ArrowDown
                                  size={isMobile ? 10 : 12}
                                  className="mr-1"
                                />
                              )}
                              {signal.action === "SHORT" && (
                                <ArrowDown
                                  size={isMobile ? 10 : 12}
                                  className="mr-1"
                                />
                              )}
                              {signal.action}
                            </Badge>
                          </td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs whitespace-nowrap">
                            ₹{signal.price.toFixed(2)}
                          </td>
                          {signalSource === "ml" && signal.confidence && (
                            <td className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-1 sm:h-2">
                                <div
                                  className="bg-finance-blue h-1 sm:h-2 rounded-full"
                                  style={{
                                    width: `${signal.confidence * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-[10px] sm:text-xs text-gray-500">
                                {(signal.confidence * 100).toFixed(0)}%
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalGenerator;
