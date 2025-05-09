import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ChartContainer } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  Save,
  Download,
  Filter,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Calculator,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  PositionSizingMethod,
  SizingRule,
} from "../SignalGenerator/QuantEngine";
import { sampleSizedPositions } from "../SignalGenerator/QuantnData";

const sizingMethods: PositionSizingMethod[] = [
  "Kelly",
  "Fixed",
  "Volatility",
  "Equal",
  "Manual",
];

// Prepare data for pie chart
const sectorData = [
  { name: "Technology", value: 18 },
  { name: "Financial", value: 25 },
  { name: "Energy", value: 15 },
  { name: "Healthcare", value: 12 },
  { name: "Consumer", value: 30 },
];

const COLORS = [
  "#8884d8",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
];

const PositionSizing = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<PositionSizingMethod>("Kelly");
  const [initialCapital, setInitialCapital] = useState("1000000");
  const [rules, setRules] = useState<SizingRule[]>([
    {
      id: "srule-1",
      type: "max-per-trade",
      value: 10,
    },
    {
      id: "srule-2",
      type: "max-per-sector",
      value: 25,
    },
  ]);

  const addRule = () => {
    const newRule: SizingRule = {
      id: `srule-${rules.length + 1}`,
      type: "max-per-trade",
      value: 10,
    };

    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof SizingRule, value: any) => {
    setRules(
      rules.map((rule) => {
        if (rule.id === id) {
          return { ...rule, [field]: value };
        }
        return rule;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        {/* <h2 className="text-xl font-bold mb-4 text-finance-navy">Position Sizing</h2> */}

        {/* Signal Selection & Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Signal Source
            </label>
            <Select defaultValue="sg-001">
              <SelectTrigger>
                <SelectValue placeholder="Select Signal Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sg-001">RSI Rebound Strategy</SelectItem>
                <SelectItem value="sg-002">MACD Crossover</SelectItem>
                <SelectItem value="sg-003">ML Trend Predictor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position Sizing Method
            </label>
            <Select
              value={selectedMethod}
              onValueChange={(v) =>
                setSelectedMethod(v as PositionSizingMethod)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                {sizingMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Capital (₹)
            </label>
            <Input
              type="text"
              value={initialCapital}
              onChange={(e) => setInitialCapital(e.target.value)}
            />
          </div>
        </div>

        {/* Risk Rules Section */}
        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
            <h3 className="font-medium">Risk Rules</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addRule}
              className="flex-shrink-0"
            >
              <Plus size={16} className="mr-1" /> Add Rule
            </Button>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex flex-wrap items-center gap-2 bg-white p-2 rounded border"
              >
                <Select
                  value={rule.type}
                  onValueChange={(v) => updateRule(rule.id, "type", v as any)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max-per-trade">Max Per Trade</SelectItem>
                    <SelectItem value="max-per-sector">
                      Max Per Sector
                    </SelectItem>
                    <SelectItem value="max-drawdown">Max Drawdown</SelectItem>
                    <SelectItem value="min-trade">Min Trade</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  className="w-full sm:w-[100px]"
                  value={rule.value}
                  onChange={(e) =>
                    updateRule(rule.id, "value", parseFloat(e.target.value))
                  }
                />

                <span className="text-sm text-gray-500">
                  {rule.type === "min-trade" ? "₹" : "%"}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(rule.id)}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Kelly-specific Settings (conditional) */}
        {selectedMethod === "Kelly" && (
          <div className="mb-6 border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-3">Kelly Criterion Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Win Rate (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    defaultValue={[65]}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-grow"
                  />
                  <span className="text-sm border rounded px-2 py-1 bg-white">
                    65%
                  </span>
                </div>
              </div>

              <div>
                <Label className="mb-1 block">Win/Loss Ratio</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    defaultValue={[1.8]}
                    min={0}
                    max={5}
                    step={0.1}
                    className="flex-grow"
                  />
                  <span className="text-sm border rounded px-2 py-1 bg-white">
                    1.8
                  </span>
                </div>
              </div>

              <div>
                <Label className="mb-1 block">Kelly Fraction (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    defaultValue={[50]}
                    min={0}
                    max={100}
                    step={10}
                    className="flex-grow"
                  />
                  <span className="text-sm border rounded px-2 py-1 bg-white">
                    50%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Volatility specific settings (conditional) */}
        {selectedMethod === "Volatility" && (
          <div className="mb-6 border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-3">Volatility-Based Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Volatility Measure</Label>
                <Select defaultValue="atr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atr">ATR (14)</SelectItem>
                    <SelectItem value="stdev">
                      Standard Deviation (20)
                    </SelectItem>
                    <SelectItem value="beta">Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-1 block">Risk per Trade (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    defaultValue={[1]}
                    min={0.1}
                    max={5}
                    step={0.1}
                    className="flex-grow"
                  />
                  <span className="text-sm border rounded px-2 py-1 bg-white">
                    1%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Calculator size={16} /> Calculate Position Sizes
          </Button>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Save size={16} /> Save Sizing Strategy
          </Button>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Download size={16} /> Export
          </Button>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Position Sizing Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Position Sizing Output</h3>
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-1" /> Filter
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[600px] w-full">
                    <thead className="bg-finance-blue  sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-xs font-semibold text-left text-white">
                          Signal
                        </th>
                        <th className="px-4 py-2 text-xs font-semibold text-center text-white">
                          Action
                        </th>
                        <th className="px-4 py-2 text-xs font-semibold text-center text-white">
                          Amount (₹)
                        </th>
                        <th className="px-4 py-2 text-xs font-semibold text-center text-white">
                          % of Capital
                        </th>
                        <th className="px-4 py-2 text-xs font-semibold text-center text-white">
                          Shares
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sampleSizedPositions.map((position, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-2 text-xs whitespace-nowrap">
                            {position.symbol}
                          </td>
                          <td className="px-4 py-2 text-xs text-center">
                            <Badge
                              className={`w-16 text-center ${
                                position.action === "BUY"
                                  ? "bg-green-500"
                                  : position.action === "SELL"
                                  ? "bg-red-500"
                                  : position.action === "SHORT"
                                  ? "bg-purple-500"
                                  : "bg-yellow-500"
                              }`}
                            >
                              {position.action}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-xs text-center whitespace-nowrap">
                            ₹{position.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-xs text-center whitespace-nowrap">
                            {position.percentage.toFixed(1)}%
                          </td>
                          <td className="px-4 py-2 text-xs text-center whitespace-nowrap">
                            {position.shares}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Allocation Visualization */}
          <div className="w-full">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <h3 className="font-semibold text-base sm:text-lg">
                    Sector Exposure
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 self-start sm:self-auto"
                  >
                    <PieChartIcon size={16} />
                    View All
                  </Button>
                </div>

                <div className="h-42 sm:h-66">
                  <ChartContainer config={{}}>
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        // labelLine={false}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {sectorData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                      />
                      <Tooltip />
                    </PieChart>
                  </ChartContainer>
                </div>

                <div className="">
                  <h4 className="text-xs font-medium text-gray-500 mb-1">
                    Total Allocated
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-bold">
                      ₹842,000
                    </span>
                    <span className="text-sm text-gray-500">
                      84.2% of Capital
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-finance-purple h-2 rounded-full"
                      style={{ width: "84.2%" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionSizing;
