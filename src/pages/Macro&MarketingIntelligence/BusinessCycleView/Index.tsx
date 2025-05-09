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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Download,
  ChevronDown,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  currentCyclePhase,
  cycleHistory,
  exportOptions,
} from "../MarcoDashboard/MarcoIntelligenceData";

// interface BusinessCycleViewProps {
//   country: string;
//   timeframe: string;
// }

export function BusinessCycleView() {
  const [manualOverride, setManualOverride] = useState(false);
  const [openOverrideDialog, setOpenOverrideDialog] = useState(false);

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
    toast.success(`Exporting business cycle view in ${format} format`);
  };

  const handleToggleOverride = () => {
    setManualOverride(!manualOverride);
    if (!manualOverride) {
      setOpenOverrideDialog(true);
    } else {
      toast.success("Automatic phase detection enabled");
    }
  };

  const handleManualOverride = (phase: string) => {
    toast.success(`Phase manually set to ${phase}`);
    setOpenOverrideDialog(false);
  };

  // Format historical cycle data for visualization
  const timelineData = cycleHistory.map((history) => ({
    ...history,
    startDateObj: new Date(history.startDate),
    endDateObj:
      history.endDate === "Present" ? new Date() : new Date(history.endDate),
  }));

  // Generate sector performance by phase data for chart
  const sectorPerformanceByPhase = [
    {
      name: "Financial Services",
      expansion: 15,
      peak: 8,
      contraction: -10,
      trough: 5,
    },
    { name: "IT", expansion: 12, peak: 5, contraction: 2, trough: 10 },
    { name: "Energy", expansion: 8, peak: 12, contraction: -5, trough: -2 },
    {
      name: "Consumer Staples",
      expansion: 5,
      peak: 10,
      contraction: 8,
      trough: 12,
    },
    { name: "Healthcare", expansion: 7, peak: 6, contraction: 10, trough: 8 },
  ];

  // Prepare Indicator Data for Radar Chart
  const indicatorData = currentCyclePhase.indicators.map((indicator) => ({
    name: indicator.name,
    value: Math.abs(indicator.value),
    fullMark: 10,
  }));

  // Business cycle phases for manual override
  const cyclePhases = [
    { name: "Early Expansion", color: "#10B981" },
    { name: "Late Expansion", color: "#F59E0B" },
    { name: "Early Contraction", color: "#F97316" },
    { name: "Late Contraction", color: "#EF4444" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Phase Panel */}
        <Card
          className="lg:col-span-2 border-t-4"
          style={{ borderTopColor: currentCyclePhase.color }}
        >
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
            <div className="w-full sm:w-auto">
              <CardTitle className="text-xl font-semibold mb-1">
                {currentCyclePhase.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {currentCyclePhase.description}
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Label htmlFor="manual-override" className="text-sm">
                  Manual Override
                </Label>
                <Switch
                  id="manual-override"
                  checked={manualOverride}
                  onCheckedChange={handleToggleOverride}
                />
              </div>

              <Dialog
                open={openOverrideDialog}
                onOpenChange={setOpenOverrideDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!manualOverride}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Change Phase
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Override Business Cycle Phase</DialogTitle>
                    <DialogDescription>
                      Manually set the current business cycle phase based on
                      your analysis.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {cyclePhases.map((phase) => (
                      <Button
                        key={phase.name}
                        variant="outline"
                        className="h-20 border-2 flex flex-col hover:bg-muted/20"
                        style={{ borderColor: phase.color }}
                        onClick={() => handleManualOverride(phase.name)}
                      >
                        <div
                          className="w-4 h-4 rounded-full mb-2"
                          style={{ backgroundColor: phase.color }}
                        ></div>
                        <span>{phase.name}</span>
                      </Button>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setOpenOverrideDialog(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3 bg-slate-50/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Key Indicators
                </h3>
                <div className="space-y-2">
                  {currentCyclePhase.indicators.map((indicator) => (
                    <div
                      key={indicator.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{indicator.name}</span>
                      <div
                        className={`flex items-center gap-1 ${getTrendColor(
                          indicator.trend
                        )}`}
                      >
                        <span>{indicator.value}%</span>
                        {getTrendIcon(indicator.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Phase Timeline
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Since:{" "}
                    <span className="font-medium">
                      {currentCyclePhase.startDate}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Expected End:{" "}
                    <span className="font-medium">
                      {currentCyclePhase.expectedEndDate || "Unknown"}
                    </span>
                  </span>
                </div>
                <div className="flex-1 flex items-end justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-3 bg-green-50/50">
                <h3 className="text-sm font-medium text-green-700 mb-1">
                  Top Sectors
                </h3>
                <ul className="space-y-1">
                  {currentCyclePhase.recommendedSectors.map((sector, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-700"></div>
                      {sector}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border rounded-md p-3 bg-blue-50/50">
                <h3 className="text-sm font-medium text-blue-700 mb-1">
                  Asset Classes
                </h3>
                <ul className="space-y-1">
                  {currentCyclePhase.recommendedAssetClasses.map(
                    (asset, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                        {asset}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="border rounded-md p-3 bg-purple-50/50">
                <h3 className="text-sm font-medium text-purple-700 mb-1">
                  Factors
                </h3>
                <ul className="space-y-1">
                  {currentCyclePhase.recommendedFactors.map((factor, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-700"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg font-bold">
              Performance by Phase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="w-full h-[100%] ">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    data={[
                      { name: "Early Expansion", value: 85, fill: "#10B981" },
                      { name: "Late Expansion", value: 60, fill: "#F59E0B" },
                      { name: "Early Contraction", value: 30, fill: "#F97316" },
                      { name: "Late Contraction", value: 45, fill: "#EF4444" },
                    ]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={5}
                      label={{
                        fill: "#333",
                        position: "insideStart",
                        fontSize: 12,
                      }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 rounded shadow text-sm">
                              <div className="font-semibold">
                                {payload[0].payload.name}
                              </div>
                              <div>Performance: {payload[0].value}%</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      iconSize={12}
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cycle History Timeline */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-lg font-bold">
            Cycle History Timeline
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("PDF")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0 overflow-x-auto mt-6">
          <div className="min-w-[800px]">
            <div className="flex items-center h-20 relative">
              <div className="absolute h-1 bg-slate-200 w-full top-1/2 -translate-y-1/2"></div>
              {cycleHistory.map((history, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === cycleHistory.length - 1;
                const width = isLast ? "w-1/5" : "w-1/4";

                return (
                  <div
                    key={idx}
                    className={`${width} h-full relative`}
                    style={{ zIndex: 10 }}
                  >
                    <div
                      className="absolute h-2 top-1/2 -translate-y-1/2 left-0 right-0"
                      style={{ backgroundColor: history.color }}
                    ></div>

                    <div
                      className="absolute w-4 h-4 rounded-full top-1/2 -translate-y-1/2 flex items-center justify-center"
                      style={{
                        backgroundColor: history.color,
                        left: isFirst ? 0 : "50%",
                        transform: isFirst
                          ? "translate(0, -50%)"
                          : "translate(-50%, -50%)",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>

                    <div
                      className={`absolute text-xs font-medium top-0 whitespace-nowrap ${
                        isFirst ? "text-left" : "text-center"
                      }`}
                      style={{
                        left: isFirst ? 0 : "50%",
                        transform: isFirst
                          ? "translateX(0)"
                          : "translateX(-50%)",
                      }}
                    >
                      {history.phase}
                    </div>

                    <div
                      className={`absolute text-[10px] text-muted-foreground bottom-0 whitespace-nowrap ${
                        isFirst ? "text-left" : "text-center"
                      }`}
                      style={{
                        left: isFirst ? 0 : "50%",
                        transform: isFirst
                          ? "translateX(0)"
                          : "translateX(-50%)",
                      }}
                    >
                      {history.startDate} - {history.endDate}
                    </div>

                    {!isFirst && (
                      <div className="absolute top-1/2 left-1/2 -translate-y-full -translate-x-1/2 mt-[-25px]">
                        <Badge
                          variant="outline"
                          className="text-xs whitespace-nowrap"
                          style={{
                            backgroundColor:
                              history.marketPerformance >= 0
                                ? "#dcfce7"
                                : "#fee2e2",
                            color:
                              history.marketPerformance >= 0
                                ? "#16a34a"
                                : "#dc2626",
                          }}
                        >
                          {history.marketPerformance > 0 ? "+" : ""}
                          {history.marketPerformance}%
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}

              <div
                className="absolute w-4 h-4 rounded-full top-1/2 -translate-y-1/2 right-0 flex items-center justify-center"
                style={{
                  backgroundColor: cycleHistory[cycleHistory.length - 1].color,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sector Performance by Phase */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-lg font-bold">
            Sector Performance by Cycle Phase
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
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
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[100%]">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sectorPerformanceByPhase}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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
                                    {entry.name}: {entry.value}%
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
                  <Bar dataKey="expansion" name="Expansion" fill="#10B981" />
                  <Bar dataKey="peak" name="Peak" fill="#F59E0B" />
                  <Bar
                    dataKey="contraction"
                    name="Contraction"
                    fill="#F97316"
                  />
                  <Bar dataKey="trough" name="Trough" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
