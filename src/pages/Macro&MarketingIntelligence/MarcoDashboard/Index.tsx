import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart2,
  AlertTriangle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  currencyData,
  exportOptions,
  gdpTrendData,
  inflationTrendData,
  macroIndicators,
  macroNews,
  sectorPerformance,
  yieldCurveTrendData,
} from "./MarcoIntelligenceData";
import MarcoHeading from "./MarcoHeading";

// interface SmartMoneyTrackerProps {
//   country: string;
//   timeframe: string;
// }

export function MarcoDashboard() {
  const [selectedChart, setSelectedChart] = useState("gdp");

  const getTrendIcon = (trend: "up" | "down" | "flat") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />;
      case "down":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "flat", isPositive = true) => {
    if (trend === "up") return isPositive ? "text-green-600" : "text-red-600";
    if (trend === "down") return isPositive ? "text-red-600" : "text-green-600";
    return "text-gray-500";
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting data in ${format} format`);
  };

  const handleSetAlert = () => {
    toast.success("Alert setting saved successfully");
  };

  // Transform data for the chart
  const getChartData = () => {
    switch (selectedChart) {
      case "gdp":
        return gdpTrendData.data;
      case "inflation":
        return inflationTrendData.data;
      case "yield":
        return yieldCurveTrendData.data;
      default:
        return gdpTrendData.data;
    }
  };

  const getChartColor = () => {
    switch (selectedChart) {
      case "gdp":
        return gdpTrendData.color;
      case "inflation":
        return inflationTrendData.color;
      case "yield":
        return yieldCurveTrendData.color;
      default:
        return "#10B981";
    }
  };

  return (
    <div className="space-y-6">
      {/* Macro Indicators Section */}
      <MarcoHeading/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {macroIndicators.map((indicator) => (
          <Card
            key={indicator.name}
            className="overflow-hidden border-t-4"
            style={{
              borderTopColor: indicator.color,
              backgroundImage: indicator.backgroundColor,
            }}
          >
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {indicator.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">
                  {indicator.value}
                  {indicator.unit}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${getTrendColor(
                    indicator.trend,
                    indicator.name !== "Inflation" &&
                      indicator.name !== "Unemployment"
                  )}`}
                >
                  {getTrendIcon(indicator.trend)}
                  {indicator.change > 0 ? "+" : ""}
                  {indicator.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trendline Charts */}
        <Card className="col-span-1 lg:col-span-2" style={{ background: "linear-gradient(to right, #e0f7ff, #ffffff)",}}>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
            <CardTitle className="text-lg font-bold">
              Trendline Charts
            </CardTitle>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Tabs
                value={selectedChart}
                onValueChange={setSelectedChart}
                className="w-full"
              >
                <TabsList className="bg-muted/50 flex-wrap sm:flex-nowrap">
                  <TabsTrigger value="gdp">GDP</TabsTrigger>
                  <TabsTrigger value="inflation">Inflation</TabsTrigger>
                  <TabsTrigger value="yield">Yield Curve</TabsTrigger>
                </TabsList>
              </Tabs>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="self-end sm:self-auto"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {exportOptions.map((format) => (
                    <DropdownMenuItem
                      key={format}
                      onClick={() => handleExport(format)}
                    >
                      Export as {format}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[100%]">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">
                                  {payload[0].payload.date}
                                </span>
                                <span className="text-sm">
                                  {selectedChart === "gdp"
                                    ? "GDP Growth: "
                                    : selectedChart === "inflation"
                                    ? "Inflation Rate: "
                                    : "Yield Spread: "}
                                  {payload[0].value}%
                                </span>
                              </div>
                            </ChartTooltipContent>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={getChartColor()}
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* News Panel */}
        <Card  className="border-t-4" style={{ borderTopColor: "orange",background: "linear-gradient(to top,#f5de91, #fcfffd)",}}>
          <CardHeader className="p-4 pb-2">
           <CardTitle className="text-lg font-bold">
              Latest Macro News
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {macroNews.map((news, index) => (
                <div key={index} className="pb-3 border-b last:border-0">
                  <h4 className="text-sm font-medium">{news.title}</h4>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{news.source}</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Performance */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2 bg-slate-400">
            <CardTitle className="text-lg font-bold">
              Sector Performance
            </CardTitle>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 w-full sm:w-auto"
                onClick={handleSetAlert}
              >
                <AlertTriangle className="h-4 w-4" />
                Set Alert
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {exportOptions.map((format) => (
                    <DropdownMenuItem
                      key={format}
                      onClick={() => handleExport(format)}
                    >
                      Export as {format}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[100%]">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorPerformance} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis type="number" domain={["auto", "auto"]} />
                    <YAxis
                      dataKey="sector"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      width={120}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <ChartTooltipContent>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">
                                  {data.sector}
                                </span>
                                <span className="text-sm">
                                  Performance: {data.performance}%
                                </span>
                                <span className="text-sm">
                                  Change: {data.change > 0 ? "+" : ""}
                                  {data.change}%
                                </span>
                                <span className="text-sm">
                                  Recommendation: {data.recommendation}
                                </span>
                              </div>
                            </ChartTooltipContent>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="performance" radius={[0, 4, 4, 0]}>
                      {sectorPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Currency Strength & Alerts */}
        <div className="space-y-6">
          {/* Currency Strength */}
          <Card style={{ background: "linear-gradient(to right, #f5eaf3, #ffffff)"}}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-bold">
                Currency Strength
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {currencyData.map((currency) => (
                  <div
                    key={currency.currency}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">{currency.currency}</span>
                    <div className="flex items-center gap-3">
                      <span>{currency.value}</span>
                      <span
                        className={`flex items-center gap-1 ${getTrendColor(
                          currency.trend,
                          currency.currency !== "USD/INR"
                        )}`}
                      >
                        {getTrendIcon(currency.trend)}
                        {currency.change > 0 ? "+" : ""}
                        {currency.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts Settings */}
          <Card>
            <CardHeader className="p-4 pb-2 bg-red-100">
              <CardTitle className="text-lg font-bold">
                Alert Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="py-2">
                    Inflation Alert
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Alert when CPI {`>`} 6%</span>
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-600 hover:bg-orange-50"
                        >
                          Active
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleSetAlert}
                      >
                        Modify Alert
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="py-2">
                    GDP Growth Alert
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Alert when GDP {`<`} 5%</span>
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-600 hover:bg-orange-50"
                        >
                          Active
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleSetAlert}
                      >
                        Modify Alert
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="py-2">
                    Currency Alert
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Alert when USD/INR {`>`} 84</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 hover:bg-green-50"
                        >
                          Inactive
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleSetAlert}
                      >
                        Set Alert
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
