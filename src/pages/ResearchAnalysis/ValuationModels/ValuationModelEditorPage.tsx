import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ChartContainer } from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  FileText,
  Download,
  Share2,
  Save,
  BarChart as BarChartIcon,
  Grid,
  PlusCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ValuationModel } from "./ValuationModel";

export default function ValuationModelEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<ValuationModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [targetPrice, setTargetPrice] = useState<number | null>(null);
  const [upside, setUpside] = useState<number | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string>("v1.0");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const [versionLabel, setVersionLabel] = useState("");
  const [versionNotes, setVersionNotes] = useState("");
  const [activeTab, setActiveTab] = useState("sensitivity");
  const [versions, setVersions] = useState([
    {
      id: "v1.0",
      label: "Base Case",
      timestamp: new Date("2025-03-15"),
      author: "Rohit Sharma",
      notes: "Initial valuation",
    },
  ]);
  const [sensitivity, setSensitivity] = useState({
    xAxis: "wacc",
    yAxis: "terminalGrowthRate",
  });

  const sensitivityOptions = [
    { value: "wacc", label: "WACC (%)" },
    { value: "terminalGrowthRate", label: "Terminal Growth (%)" },
    { value: "revenueGrowthRate", label: "Revenue CAGR (%)" },
    { value: "ebitMargin", label: "EBIT Margin (%)" },
  ];

  useEffect(() => {
    // In a real app, you would fetch the model from an API
    // For now, we'll simulate loading a model with a timeout
    const loadModel = async () => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        // This would be fetched from a real API in production
        const mockModel: ValuationModel = {
          id: id || "model-123",
          name: "TCS - DCF Model",
          type: "dcf-2stage",
          company: "TCS",
          sector: "IT",
          analyst: "Rohit Sharma",
          tags: ["Q4 2025", "Base Case"],
          createdAt: new Date(),
          updatedAt: new Date(),
          isDraft: true,
          assumptions: {
            wacc: 10,
            terminalGrowthRate: 5,
            forecastPeriod: 5,
            revenueGrowthRate: 15,
            ebitMargin: 25,
            taxRate: 25,
            capexPercent: 10,
          },
        };

        setModel(mockModel);
        calculateValuation(mockModel);
        setLoading(false);
      }, 500);
    };

    loadModel();
  }, [id]);

  const calculateValuation = (model: ValuationModel) => {
    // This is a simplified valuation calculation for demonstration
    // In a real app, this would be much more sophisticated
    if (model.type === "dcf-2stage" && model.assumptions) {
      const {
        wacc,
        terminalGrowthRate,
        revenueGrowthRate,
        ebitMargin,
        taxRate,
      } = model.assumptions;

      // Very simplified DCF calculation for demonstration
      const baseValue = 3550; // Current price for demo
      const calculatedValue =
        (baseValue * (1 + (revenueGrowthRate! / 100) * (ebitMargin! / 100))) /
        (wacc! / 100 - terminalGrowthRate! / 100);

      // Round to nearest 50
      const roundedValue = Math.round(calculatedValue / 50) * 50;
      setTargetPrice(roundedValue);

      // Calculate upside from current price (mock value of 3550)
      const currentPrice = 3550;
      const upsidePercent = (roundedValue / currentPrice - 1) * 100;
      setUpside(parseFloat(upsidePercent.toFixed(1)));
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    toast.success("Valuation model saved successfully");
  };

  const handleSuggestWithAI = () => {
    // This would call an LLM API in a real implementation
    toast.info("AI is analyzing market data to suggest assumptions...");

    // Simulate API delay
    setTimeout(() => {
      if (model) {
        const updatedModel = {
          ...model,
          assumptions: {
            ...model.assumptions,
            revenueGrowthRate: 11.2, // AI suggested value
            ebitMargin: 25, // AI suggested value
            terminalGrowthRate: 5.5, // AI suggested value
          },
        };

        setModel(updatedModel);
        calculateValuation(updatedModel);
        toast.success("AI suggestions applied");
      }
    }, 1500);
  };

  const handleInputChange = (key: string, value: number) => {
    if (model) {
      const updatedModel = {
        ...model,
        assumptions: {
          ...model.assumptions,
          [key]: value,
        },
      };

      setModel(updatedModel);
      calculateValuation(updatedModel);
    }
  };

  const sensitivityData = [
    { name: "8.0%", g4: 4500, g5: 4700, g6: 4900 },
    { name: "9.0%", g4: 4100, g5: 4200, g6: 4400 },
    { name: "10.0%", g3: 3500, g4: 3700, g5: 3900, g6: 4050 },
  ];

  const waterfallData = [
    { name: "Base Value", value: 2800 },
    { name: "Revenue Growth", value: 600 },
    { name: "Margin Expansion", value: 400 },
    { name: "Risk Reduction", value: 300 },
    { name: "Terminal Value", value: 100 },
    { name: "Target Price", value: 4200 },
  ];

  const handleSaveVersion = () => {
    // In a real app, this would save to a database
    const newVersion = {
      id: `v${(versions.length + 1).toFixed(1)}`,
      label: versionLabel || `Version ${versions.length + 1}`,
      timestamp: new Date(),
      author: model?.analyst || "Current User",
      notes: versionNotes,
    };

    setVersions([...versions, newVersion]);
    setSelectedVersion(newVersion.id);
    setShowVersionDialog(false);
    setVersionLabel("");
    setVersionNotes("");

    toast.success("New version saved successfully");
  };

  const handleExport = (format: "pdf" | "excel" | "link") => {
    // In a real app, this would generate the appropriate file or link
    switch (format) {
      case "pdf":
        toast.success("Exporting as PDF...");
        break;
      case "excel":
        toast.success("Exporting as Excel...");
        break;
      case "link":
        toast.success("Shareable link generated and copied to clipboard");
        break;
    }

    setShowExportDialog(false);
  };

  if (loading) {
    return (
      <div>
        <div className="container py-6">
          <div className="flex items-center justify-center h-64">
            <p>Loading valuation model...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div>
        <div className="container py-6">
          <div className="flex items-center justify-center h-64">
            <p>Valuation model not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 space-y-2 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        {/* Left Side: Model Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">{model.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
            <p className="text-gray-500 text-sm">
              {model.company} | {model.sector} | Analyst: {model.analyst}
            </p>
            <Select value={selectedVersion} onValueChange={setSelectedVersion}>
              <SelectTrigger className="w-36 h-8 text-xs">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {versions.map((version) => (
                  <SelectItem key={version.id} value={version.id}>
                    {version.label} ({version.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {model.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {model.isDraft && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                Draft
              </Badge>
            )}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-wrap justify-start lg:justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/valuation-models")}
          >
            Back to Models
          </Button>

          {/* Save Version Dialog */}
          <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" /> Save Version
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Model Version</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="versionLabel">Version Label</Label>
                  <Input
                    id="versionLabel"
                    placeholder="e.g., Bull Case, Q4 Update"
                    value={versionLabel}
                    onChange={(e) => setVersionLabel(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="versionNotes">Notes (Optional)</Label>
                  <Input
                    id="versionNotes"
                    placeholder="Add notes about this version"
                    value={versionNotes}
                    onChange={(e) => setVersionNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowVersionDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveVersion}>Save Version</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Export Dialog */}
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Valuation Model</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  onClick={() => handleExport("pdf")}
                  className="flex justify-between items-center"
                >
                  <span>Export as PDF</span>
                  <FileText className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleExport("excel")}
                  className="flex justify-between items-center"
                  variant="outline"
                >
                  <span>Export as Excel</span>
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleExport("link")}
                  className="flex justify-between items-center"
                  variant="outline"
                >
                  <span>Generate Shareable Link</span>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Valuation Summary</CardTitle>
              <CardDescription>
                Based on the current assumptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 text-center p-4 bg-orange-100 rounded-lg border">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Target Price
                  </h3>
                  <p className="text-3xl font-bold">₹{targetPrice || "—"}</p>
                </div>

                <div className="space-y-2 text-center p-4 bg-purple-100 rounded-lg border">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Current Price
                  </h3>
                  <p className="text-3xl font-bold">₹3,550</p>
                </div>

                <div
                  className={`space-y-2 text-center p-4 rounded-lg border transition-colors duration-300 ${
                    upside > 0
                      ? "bg-green-100 text-green-800 border-green-300"
                      : upside < 0
                      ? "bg-red-100 text-red-800 border-red-300"
                      : "bg-yellow-100 text-yellow-800 border-yellow-300"
                  }`}
                >
                  <h3 className="text-sm font-medium">Upside</h3>
                  <p className="text-3xl font-bold">
                    {upside ? `${upside > 0 ? "+" : ""}${upside}%` : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-800 font-bold text-xl">
                  Model Assumptions
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={handleSuggestWithAI}
                >
                  AI Suggest
                </Button>
              </div>
              <CardDescription className="text-blue-700">
                Edit the assumptions below to update the valuation.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Revenue Growth Rate */}
              <div className="space-y-2">
                <Label
                  htmlFor="revenueGrowthRate"
                  className="text-sm font-semibold text-blue-700"
                >
                  Revenue CAGR (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="revenueGrowthRate"
                    min={0}
                    max={30}
                    step={0.1}
                    className="w-full"
                    value={[model.assumptions?.revenueGrowthRate || 0]}
                    onValueChange={(values) =>
                      handleInputChange("revenueGrowthRate", values[0])
                    }
                  />
                  <Input
                    type="number"
                    className="w-20 border-blue-300 focus:ring-blue-500"
                    value={model.assumptions?.revenueGrowthRate || 0}
                    onChange={(e) =>
                      handleInputChange(
                        "revenueGrowthRate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* EBIT Margin */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="ebitMargin">EBIT Margin (%)</Label>
                  <span className="text-sm font-mono">
                    {model.assumptions?.ebitMargin}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="ebitMargin"
                    min={0}
                    max={50}
                    step={0.5}
                    value={[model.assumptions?.ebitMargin || 0]}
                    onValueChange={(values) =>
                      handleInputChange("ebitMargin", values[0])
                    }
                  />
                  <Input
                    type="number"
                    className="w-20"
                    value={model.assumptions?.ebitMargin || 0}
                    onChange={(e) =>
                      handleInputChange(
                        "ebitMargin",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* WACC */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="wacc">WACC (%)</Label>
                  <span className="text-sm font-mono">
                    {model.assumptions?.wacc}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="wacc"
                    min={5}
                    max={20}
                    step={0.1}
                    value={[model.assumptions?.wacc || 10]}
                    onValueChange={(values) =>
                      handleInputChange("wacc", values[0])
                    }
                  />
                  <Input
                    type="number"
                    className="w-20"
                    value={model.assumptions?.wacc || 10}
                    onChange={(e) =>
                      handleInputChange("wacc", parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              {/* Terminal Growth Rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="terminalGrowthRate">
                    Terminal Growth (%)
                  </Label>
                  <span className="text-sm font-mono">
                    {model.assumptions?.terminalGrowthRate}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="terminalGrowthRate"
                    min={1}
                    max={10}
                    step={0.1}
                    value={[model.assumptions?.terminalGrowthRate || 5]}
                    onValueChange={(values) =>
                      handleInputChange("terminalGrowthRate", values[0])
                    }
                  />
                  <Input
                    type="number"
                    className="w-20"
                    value={model.assumptions?.terminalGrowthRate || 5}
                    onChange={(e) =>
                      handleInputChange(
                        "terminalGrowthRate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* Tax Rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <span className="text-sm font-mono">
                    {model.assumptions?.taxRate}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="taxRate"
                    min={0}
                    max={40}
                    step={1}
                    value={[model.assumptions?.taxRate || 25]}
                    onValueChange={(values) =>
                      handleInputChange("taxRate", values[0])
                    }
                  />
                  <Input
                    type="number"
                    className="w-20"
                    value={model.assumptions?.taxRate || 25}
                    onChange={(e) =>
                      handleInputChange("taxRate", parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              {/* Capex % */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="capexPercent">Capex (% of Revenue)</Label>
                  <span className="text-sm font-mono">
                    {model.assumptions?.capexPercent}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id="capexPercent"
                    min={0}
                    max={30}
                    step={0.5}
                    value={[model.assumptions?.capexPercent || 10]}
                    onValueChange={(values) =>
                      handleInputChange("capexPercent", values[0])
                    }
                  />
                  <Input
                    type="number"
                    className="w-20"
                    value={model.assumptions?.capexPercent || 10}
                    onChange={(e) =>
                      handleInputChange(
                        "capexPercent",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {/* Analysis Tabs */}
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>Analysis</CardTitle>
                  <TabsList className="mb-2 w-full overflow-x-auto flex-nowrap overflow-y-hidden">
                    <TabsTrigger
                      value="sensitivity"
                      className="flex items-center"
                    >
                      <Grid className="w-4 h-4 mr-2" />
                      Sensitivity
                    </TabsTrigger>
                    <TabsTrigger
                      value="waterfall"
                      className="flex items-center"
                    >
                      <BarChartIcon className="w-4 h-4 mr-2" />
                      Waterfall
                    </TabsTrigger>
                    <TabsTrigger value="versions" className="flex items-center">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Versions
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <TabsContent value="sensitivity" className="pt-0">
                <CardContent className="pt-6">
                  <div className="mb-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="xAxis">X-Axis:</Label>
                      <Select
                        value={sensitivity.xAxis}
                        onValueChange={(value) =>
                          setSensitivity({ ...sensitivity, xAxis: value })
                        }
                      >
                        <SelectTrigger id="xAxis" className="w-44">
                          <SelectValue placeholder="Select parameter" />
                        </SelectTrigger>
                        <SelectContent>
                          {sensitivityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="yAxis">Y-Axis:</Label>
                      <Select
                        value={sensitivity.yAxis}
                        onValueChange={(value) =>
                          setSensitivity({ ...sensitivity, yAxis: value })
                        }
                      >
                        <SelectTrigger id="yAxis" className="w-44">
                          <SelectValue placeholder="Select parameter" />
                        </SelectTrigger>
                        <SelectContent>
                          {sensitivityOptions
                            .filter(
                              (option) => option.value !== sensitivity.xAxis
                            )
                            .map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-lg border p-4 bg-white shadow-sm">
                    <ChartContainer
                      config={{
                        g4: { label: "Growth 4%" },
                        g5: { label: "Growth 5%" },
                        g6: { label: "Growth 6%" },
                      }}
                    >
                      <AreaChart data={sensitivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="g4"
                          stackId="1"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                        <Area
                          type="monotone"
                          dataKey="g5"
                          stackId="1"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                        />
                        <Area
                          type="monotone"
                          dataKey="g6"
                          stackId="1"
                          stroke="#ffc658"
                          fill="#ffc658"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </TabsContent>
              <TabsContent value="waterfall" className="pt-0">
                <CardContent className="pt-6">
                  <div className="overflow-x-auto rounded-lg border p-4 bg-white shadow-sm">
                    <ChartContainer
                      config={{
                        value: { label: "Value (₹)" },
                      }}
                    >
                      <BarChart data={waterfallData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="versions" className="pt-0">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Version History</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVersionDialog(true)}
                    >
                      <Save className="w-4 h-4 mr-2" /> Save New Version
                    </Button>
                  </div>

                  <ScrollArea className="h-[300px] rounded-md border">
                    <div className="p-4 space-y-4">
                      {versions.map((version) => (
                        <Card
                          key={version.id}
                          className={`${
                            selectedVersion === version.id
                              ? "border-primary"
                              : ""
                          }`}
                        >
                          <CardHeader className="py-3">
                            <div className="flex justify-between">
                              <div>
                                <CardTitle className="text-base">
                                  {version.label}{" "}
                                  <span className="text-sm font-normal text-muted-foreground">
                                    ({version.id})
                                  </span>
                                </CardTitle>
                                <CardDescription>
                                  Created by {version.author} on{" "}
                                  {version.timestamp.toLocaleDateString()}
                                </CardDescription>
                              </div>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Actions
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64">
                                  <div className="grid gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start"
                                      onClick={() =>
                                        setSelectedVersion(version.id)
                                      }
                                    >
                                      Load Version
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start"
                                    >
                                      Compare with Current
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start"
                                    >
                                      Export Version
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </CardHeader>
                          {version.notes && (
                            <CardContent className="py-2">
                              <p className="text-sm">{version.notes}</p>
                            </CardContent>
                          )}
                          <CardFooter className="py-2 text-xs text-muted-foreground">
                            <div className="flex justify-between w-full">
                              <span>Target Price: ₹4,200</span>
                              <span>Upside: +18.3%</span>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      {activeTab === "sensitivity" ? (
        <Card className="bg-white shadow-md p-2 mt-6">
          <div className="lg:col-span-12">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">Sensitivity Grid</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3">WACC \ g</th>
                      <th className="text-center py-2 px-3">4.0%</th>
                      <th className="text-center py-2 px-3">5.0%</th>
                      <th className="text-center py-2 px-3">6.0%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left py-2 px-3 font-medium">8.0%</td>
                      <td className="text-center py-2 px-3">₹4,500</td>
                      <td className="text-center py-2 px-3 bg-green-50">
                        ₹4,700
                      </td>
                      <td className="text-center py-2 px-3">₹4,900</td>
                    </tr>
                    <tr>
                      <td className="text-left py-2 px-3 font-medium">9.0%</td>
                      <td className="text-center py-2 px-3">₹4,100</td>
                      <td className="text-center py-2 px-3 bg-green-50">
                        ₹4,200
                      </td>
                      <td className="text-center py-2 px-3">₹4,400</td>
                    </tr>
                    <tr>
                      <td className="text-left py-2 px-3 font-medium">10.0%</td>
                      <td className="text-center py-2 px-3">₹3,700</td>
                      <td className="text-center py-2 px-3 bg-green-50">
                        ₹3,900
                      </td>
                      <td className="text-center py-2 px-3">₹4,050</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="outline" onClick={() => setShowExportDialog(true)}>
              <FileText className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </Card>
      ) : activeTab === "waterfall" ? (
        <Card className="bg-white shadow-md p-2 mt-6">
          <div className="lg:col-span-12">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">Value Bridge Components</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3">Component</th>
                    <th className="text-right py-2 px-3">Value (₹)</th>
                    <th className="text-right py-2 px-3">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {waterfallData.map((item, index) => (
                    <tr key={item.name}>
                      <td className="text-left py-2 px-3 font-medium">
                        {item.name}
                      </td>
                      <td className="text-right py-2 px-3">₹{item.value}</td>
                      <td className="text-right py-2 px-3">
                        {index === waterfallData.length - 1
                          ? "100%"
                          : `${Math.round(
                              (item.value /
                                waterfallData[waterfallData.length - 1].value) *
                                100
                            )}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="outline" onClick={() => setShowExportDialog(true)}>
              <FileText className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
