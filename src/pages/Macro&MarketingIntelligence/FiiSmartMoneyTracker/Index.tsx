import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import {
  Download,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  exportOptions,
  flowTimelineData,
  heatmapData,
  sectorFlowData,
  stockFlowData,
} from "../MarcoDashboard/MarcoIntelligenceData";

// interface SmartMoneyTrackerProps {
//   country: string;
//   timeframe: string;
// }

export function FiiSmartMoneyTracker() {
  const [flowView, setFlowView] = useState("daily");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const getTrendColor = (trend: "up" | "down" | "flat") => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-500";
  };

  const getFlowColor = (value: number) => {
    if (value > 0) return "#10B981";
    if (value < 0) return "#EF4444";
    return "#6B7280";
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting flow data in ${format} format`);
  };

  const handleSetAlert = () => {
    toast.success("Flow alert created successfully");
  };

  const filteredStockFlowData = stockFlowData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format data for the flow timeline chart
  const formatFlowChartData = () => {
    return flowTimelineData.map((data) => ({
      date: data.date,
      FII: data.fii,
      DII: data.dii,
      MF: data.mf,
      Net: data.fii + data.dii + data.mf,
    }));
  };

  // Format data for the heatmap
  const formatHeatmapData = () => {
    return heatmapData.flatMap((sector) =>
      sector.stocks.map((stock) => ({
        sector: sector.sector,
        stock: stock.symbol,
        name: stock.name,
        intensity: stock.flowIntensity,
      }))
    );
  };

  // Get intensity color for heatmap
  const getIntensityColor = (intensity: number) => {
    if (intensity > 0) {
      const greenIntensity = Math.min(255, Math.round(intensity * 25));
      return `rgba(16, 185, 129, ${intensity / 10})`;
    } else if (intensity < 0) {
      const redIntensity = Math.min(255, Math.round(Math.abs(intensity) * 25));
      return `rgba(239, 68, 68, ${Math.abs(intensity) / 10})`;
    }
    return "rgba(107, 114, 128, 0.1)";
  };

  return (
    <div className=" space-y-6">
      {/* Flow Trendlines */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-200 gap-3 sm:gap-0">
          <div className="w-full sm:w-auto">
            <CardTitle className="text-lg font-bold">
              FII/DII Flow Trends
            </CardTitle>
            <CardDescription className="text-sm">
              Daily flows in ₹ Crores
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Tabs
              value={flowView}
              onValueChange={setFlowView}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted/50 w-full sm:w-auto">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 w-full sm:w-auto justify-center"
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
                <ComposedChart
                  data={formatFlowChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{label}</span>
                              {payload.map((entry, index) => (
                                <div
                                  key={`item-${index}`}
                                  className="flex items-center gap-2"
                                >
                                  <div
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: entry.color }}
                                  ></div>
                                  <span className="text-sm">
                                    {entry.name}: ₹{entry.value} Cr
                                  </span>
                                </div>
                              ))}
                            </div>
                          </ChartTooltipContent>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="FII" name="FII" fill="#6366F1" />
                  <Bar dataKey="DII" name="DII" fill="#F59E0B" />
                  <Bar dataKey="MF" name="MF" fill="#8B5CF6" />
                  <Line
                    type="monotone"
                    dataKey="Net"
                    name="Net Flow"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="border rounded-md p-3 bg-indigo-50/50 flex flex-col">
              <span className="text-xs text-indigo-700 font-medium">
                FII Net Flow
              </span>
              <span className="text-xl font-bold text-indigo-700 mt-1">
                ₹{" "}
                {flowTimelineData
                  .reduce((sum, data) => sum + data.fii, 0)
                  .toLocaleString()}{" "}
                Cr
              </span>
              <span
                className={`text-xs mt-1 ${
                  flowTimelineData[flowTimelineData.length - 1].fii > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {flowTimelineData[flowTimelineData.length - 1].fii > 0 ? (
                  <ArrowUpRight className="h-3 w-3 inline mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 inline mr-0.5" />
                )}
                Last: ₹{" "}
                {flowTimelineData[
                  flowTimelineData.length - 1
                ].fii.toLocaleString()}{" "}
                Cr
              </span>
            </div>

            <div className="border rounded-md p-3 bg-amber-50/50 flex flex-col">
              <span className="text-xs text-amber-700 font-medium">
                DII Net Flow
              </span>
              <span className="text-xl font-bold text-amber-700 mt-1">
                ₹{" "}
                {flowTimelineData
                  .reduce((sum, data) => sum + data.dii, 0)
                  .toLocaleString()}{" "}
                Cr
              </span>
              <span
                className={`text-xs mt-1 ${
                  flowTimelineData[flowTimelineData.length - 1].dii > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {flowTimelineData[flowTimelineData.length - 1].dii > 0 ? (
                  <ArrowUpRight className="h-3 w-3 inline mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 inline mr-0.5" />
                )}
                Last: ₹{" "}
                {flowTimelineData[
                  flowTimelineData.length - 1
                ].dii.toLocaleString()}{" "}
                Cr
              </span>
            </div>

            <div className="border rounded-md p-3 bg-purple-50/50 flex flex-col">
              <span className="text-xs text-purple-700 font-medium">
                MF Net Flow
              </span>
              <span className="text-xl font-bold text-purple-700 mt-1">
                ₹{" "}
                {flowTimelineData
                  .reduce((sum, data) => sum + data.mf, 0)
                  .toLocaleString()}{" "}
                Cr
              </span>
              <span
                className={`text-xs mt-1 ${
                  flowTimelineData[flowTimelineData.length - 1].mf > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {flowTimelineData[flowTimelineData.length - 1].mf > 0 ? (
                  <ArrowUpRight className="h-3 w-3 inline mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 inline mr-0.5" />
                )}
                Last: ₹{" "}
                {flowTimelineData[
                  flowTimelineData.length - 1
                ].mf.toLocaleString()}{" "}
                Cr
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Flow Analysis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-bold">
              Sector-wise Flow Analysis
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleSetAlert}
              >
                <Plus className="h-4 w-4" />
                Set Alert
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Export
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
            <Table>
              <TableHeader className="bg-finance-blue">
                <TableRow>
                  <TableHead className="text-white">Sector</TableHead>
                  <TableHead className="text-white">FII Flow (₹ Cr)</TableHead>
                  <TableHead className="text-white">DII Flow (₹ Cr)</TableHead>
                  <TableHead className="text-white">Net Flow (₹ Cr)</TableHead>
                  <TableHead className="text-white">% Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectorFlowData.map((sector) => (
                  <TableRow key={sector.sector}>
                    <TableCell className="font-medium">
                      {sector.sector}
                    </TableCell>
                    <TableCell
                      className={
                        sector.fiiFlow > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {sector.fiiFlow > 0 ? "+" : ""}
                      {sector.fiiFlow}
                    </TableCell>
                    <TableCell
                      className={
                        sector.diiFlow > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {sector.diiFlow > 0 ? "+" : ""}
                      {sector.diiFlow}
                    </TableCell>
                    <TableCell
                      className={
                        sector.netFlow > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {sector.netFlow > 0 ? "+" : ""}
                      {sector.netFlow}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(sector.trend)}
                        <span className={getTrendColor(sector.trend)}>
                          {sector.percentChange > 0 ? "+" : ""}
                          {sector.percentChange}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stock-wise Flow Trends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div>
              <CardTitle className="text-lg font-bold">
                Stock-wise Flow Trends
              </CardTitle>
              <CardDescription className="text-sm">
                Top stocks by FII/DII flows
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-[200px]"
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Sector</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSectorFilter("all")}>
                    All Sectors
                  </DropdownMenuItem>
                  {heatmapData.map((sector) => (
                    <DropdownMenuItem
                      key={sector.sector}
                      onClick={() => setSectorFilter(sector.sector)}
                    >
                      {sector.sector}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
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
            <Table>
              <TableHeader className="bg-finance-blue">
                <TableRow>
                  <TableHead className="text-white">Stock</TableHead>
                  <TableHead className="text-white">FII Flow (₹ Cr)</TableHead>
                  <TableHead className="text-white">DII Flow (₹ Cr)</TableHead>
                  <TableHead className="text-white">Net Flow (₹ Cr)</TableHead>
                  <TableHead className="text-white">% Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStockFlowData.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          {stock.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className={
                        stock.fiiFlow > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {stock.fiiFlow > 0 ? "+" : ""}
                      {stock.fiiFlow}
                    </TableCell>
                    <TableCell
                      className={
                        stock.diiFlow > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {stock.diiFlow > 0 ? "+" : ""}
                      {stock.diiFlow}
                    </TableCell>
                    <TableCell
                      className={
                        stock.netFlow > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {stock.netFlow > 0 ? "+" : ""}
                      {stock.netFlow}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(stock.trend)}
                        <span className={getTrendColor(stock.trend)}>
                          {stock.percentChange > 0 ? "+" : ""}
                          {stock.percentChange}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Smart Money Heatmap */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div>
            <CardTitle className="text-lg font-bold">
              Smart Money Heatmap
            </CardTitle>
            <CardDescription className="text-sm">
              Flow intensity across sectors and stocks
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("PNG")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PNG
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heatmapData.map((sector) => (
              <div
                key={sector.sector}
                className="border rounded-md overflow-hidden"
              >
                <div className="bg-slate-100 p-2 border-b">
                  <h3 className="font-medium text-sm">{sector.sector}</h3>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {sector.stocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="flex items-center justify-between p-1.5 rounded"
                        style={{
                          backgroundColor: getIntensityColor(
                            stock.flowIntensity
                          ),
                        }}
                      >
                        <div className="text-xs font-medium">
                          {stock.symbol}
                        </div>
                        <div
                          className={`text-xs ${
                            stock.flowIntensity > 0
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {stock.flowIntensity > 0 ? "+" : ""}
                          {stock.flowIntensity.toFixed(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center bg-white border rounded-md p-2 w-full max-w-md">
              <div className="flex items-center space-x-1 sm:mr-4 mb-2 sm:mb-0 w-full sm:w-auto justify-center">
                <span className="text-xs font-medium">Inflow</span>
                <div className="w-24 h-3 bg-gradient-to-r from-green-100 to-green-600 rounded"></div>
                <span className="text-xs">+10</span>
              </div>

              <div className="hidden sm:block h-6 border-l mx-2"></div>
              <div className="block sm:hidden w-10 border-t my-2"></div>

              <div className="flex items-center space-x-1 w-full sm:w-auto justify-center">
                <span className="text-xs">-10</span>
                <div className="w-24 h-3 bg-gradient-to-r from-red-600 to-red-100 rounded"></div>
                <span className="text-xs font-medium">Outflow</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flow Alerts */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-bold">Flow Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-3 bg-gray-50/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">FII Outflow Alert</h3>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-600 hover:bg-orange-50"
                >
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Alert when FII outflow {`>`} ₹2000 Cr for 3 consecutive days
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleSetAlert}
              >
                Modify Alert
              </Button>
            </div>

            <div className="border rounded-md p-3 bg-gray-50/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">IT Sector Alert</h3>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-600 hover:bg-orange-50"
                >
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Alert when IT sector inflow {`>`} ₹1000 Cr
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleSetAlert}
              >
                Modify Alert
              </Button>
            </div>

            <div className="border rounded-md p-3 bg-gray-50/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">HDFC Bank Alert</h3>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-600 hover:bg-green-50"
                >
                  Inactive
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Alert when HDFC Bank sees FII outflow {`>`} ₹500 Cr
              </p>
              <Button size="sm" className="w-full" onClick={handleSetAlert}>
                Set Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
