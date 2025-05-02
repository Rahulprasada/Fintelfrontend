import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartBar,
  ChartPie,
  FileText,
  Search,
  Filter,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ValuationModel } from "./ValuationModel";
import ValuationModelSelector from "./ValuationModelSelector";
import cardBackground from "../../asset/cardbackground.jpg";

export default function ValuationModelsPage() {
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [view, setView] = useState<"cards" | "table">("table");
  const [activeTab, setActiveTab] = useState("all");
   const [step, setStep] = useState<"select-template" | "configure-model">(
      "select-template"
    );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = view === "cards"?6:10;

  // Mock data for demonstration purposes
  const [models] = useState<ValuationModel[]>([
    {
      id: "model-1",
      name: "TCS - DCF Model",
      type: "dcf-2stage",
      company: "TCS",
      sector: "IT",
      analyst: "Rohit Sharma",
      tags: ["Q4 2025", "Base Case"],
      createdAt: new Date("2025-03-15"),
      updatedAt: new Date("2025-03-15"),
      isDraft: false,
      results: {
        targetPrice: 4200,
        upside: 18,
        valuationRange: {
          low: 3800,
          high: 4600,
        },
      },
    },
    {
      id: "model-2",
      name: "Infosys - Comparables",
      type: "comparables",
      company: "Infosys",
      sector: "IT",
      analyst: "Rohit Sharma",
      tags: ["Q3 2025", "Peer Analysis"],
      createdAt: new Date("2025-02-20"),
      updatedAt: new Date("2025-02-28"),
      isDraft: false,
      results: {
        targetPrice: 1750,
        upside: 5,
        valuationRange: {
          low: 1650,
          high: 1850,
        },
      },
    },
    {
      id: "model-3",
      name: "HDFC Bank - P/E Multiple",
      type: "pe-multiple",
      company: "HDFC Bank",
      sector: "Banking",
      analyst: "Virat Kohli",
      tags: ["Q2 2025"],
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-01-15"),
      isDraft: true,
    },
    {
      id: "model-4",
      name: "Reliance - DCF (3-Stage)",
      type: "dcf-3stage",
      company: "Reliance Industries",
      sector: "Oil & Gas",
      analyst: "Rahul Dravid",
      tags: ["Q1 2025", "Bull Case"],
      createdAt: new Date("2025-01-05"),
      updatedAt: new Date("2025-01-20"),
      isDraft: false,
      results: {
        targetPrice: 2800,
        upside: 12,
        valuationRange: {
          low: 2600,
          high: 3000,
        },
      },
    },
    {
      id: "model-5",
      name: "Tata Motors - EV/EBITDA",
      type: "ev-ebitda",
      company: "Tata Motors",
      sector: "Automotive",
      analyst: "Sachin Tendulkar",
      tags: ["Q4 2024", "Bear Case"],
      createdAt: new Date("2024-12-10"),
      updatedAt: new Date("2024-12-22"),
      isDraft: false,
      results: {
        targetPrice: 750,
        upside: -8,
        valuationRange: {
          low: 700,
          high: 840,
        },
      },
    },
    {
      id: "model-6",
      name: "ICICI Bank - DDM",
      type: "pe-multiple",
      company: "ICICI Bank",
      sector: "Banking",
      analyst: "Rohit Sharma",
      tags: ["Q1 2025", "Base Case"],
      createdAt: new Date("2025-01-22"),
      updatedAt: new Date("2025-02-05"),
      isDraft: false,
      results: {
        targetPrice: 1200,
        upside: 15,
        valuationRange: {
          low: 1100,
          high: 1300,
        },
      },
    },
    {
      id: "model-7",
      name: "Bajaj Auto - Comparables",
      type: "comparables",
      company: "Bajaj Auto",
      sector: "Automotive",
      analyst: "Virat Kohli",
      tags: ["Q2 2025", "Peer Analysis"],
      createdAt: new Date("2025-02-15"),
      updatedAt: new Date("2025-03-01"),
      isDraft: true,
    },
  ]);

  const handleModelCreated = (modelId: string) => {
    toast.success("Valuation model created successfully");
    navigate(`/dashboard/valuation-models/${modelId}`);
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case "dcf-2stage":
      case "dcf-3stage":
        return <ChartBar className="h-5 w-5" />;
      case "pe-multiple":
      case "ev-ebitda":
        return <ChartPie className="h-5 w-5" />;
      case "comparables":
        return <Users className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleOpenModel = (modelId: string) => {
    navigate(`/dashboard/valuation-models/${modelId}`);
  };

  const getMethodLabel = (type: string) => {
    switch (type) {
      case "dcf-2stage":
        return "2-Stage DCF";
      case "dcf-3stage":
        return "3-Stage DCF";
      case "pe-multiple":
        return "P/E";
      case "ev-ebitda":
        return "EV/EBITDA";
      case "comparables":
        return "Comps";
      default:
        return "Custom";
    }
  };

  // Get unique sectors and model types for filters
  const sectors = [...new Set(models.map((model) => model.sector))];
  const modelTypes = [...new Set(models.map((model) => model.type))];

  // Filtering logic
  const applyFilters = () => {
    let filtered = models.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector =
        filterSector === "all" || model.sector === filterSector;
      const matchesType = filterType === "all" || model.type === filterType;

      // Apply tab filters
      if (activeTab === "mine") {
        return (
          matchesSearch &&
          matchesSector &&
          matchesType &&
          model.analyst === "Rohit Sharma"
        );
      } else if (activeTab === "recent") {
        // Consider models updated in the last 30 days as recent
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return (
          matchesSearch &&
          matchesSector &&
          matchesType &&
          model.updatedAt >= thirtyDaysAgo
        );
      } else if (activeTab === "draft") {
        return matchesSearch && matchesSector && matchesType && model.isDraft;
      } else {
        // All models
        return matchesSearch && matchesSector && matchesType;
      }
    });

    return filtered;
  };

  const filteredModels = applyFilters();

  // Calculate pagination
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModels.slice(indexOfFirstItem, indexOfLastItem);
 
  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterSector, filterType, activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Reset to first page
    setCurrentPage(1);
  };

  // Clear filters function
  const clearFilters = () => {
    setSearchQuery("");
    setFilterSector("all");
    setFilterType("all");
    setCurrentPage(1);
  };

  // Handle sector filter change
  const handleSectorChange = (value: string) => {
    setFilterSector(value);
    setCurrentPage(1);
  };

  // Handle type filter change
  const handleTypeChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  return (
      <div className="py-2 space-y-2 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Valuation Models</h1>
          {showSelector ? (
            <Button   onClick={() => setShowSelector(false)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Models
            </Button>
          ) : (
            <Button onClick={() => setShowSelector(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Model
            </Button>
          )}
        </div>

        {showSelector ? (
          <ValuationModelSelector onModelCreated={handleModelCreated} setStep={setStep} step={step}/>
        ) : (
          <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or company..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <Select value={filterSector} onValueChange={handleSectorChange}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by model type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {modelTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {getMethodLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center bg-background border rounded-md">
                  <Button
                    variant={view === "cards" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </Button>
                  <Button
                    variant={view === "table" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setView("table")}
                  >
                    Table
                  </Button>
                </div>
              </div>
            </div>

            {models.length > 0 ? (
              <div>
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="mb-6"
                >
                  <TabsList className="mb-2 w-full overflow-x-auto flex-nowrap overflow-y-hidden">
                    <TabsTrigger value="all">All Models</TabsTrigger>
                    <TabsTrigger value="mine">My Models</TabsTrigger>
                    <TabsTrigger value="recent">Recently Updated</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all"></TabsContent>
                  <TabsContent value="mine"></TabsContent>
                  <TabsContent value="recent"></TabsContent>
                  <TabsContent value="draft"></TabsContent>
                </Tabs>

                {filteredModels.length > 0 ? (
                  <>
                    {view === "cards" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentItems.map((model) => (
                          <Card
                            key={model.id}
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => handleOpenModel(model.id)}
                            style={{
                              backgroundImage: `url(${cardBackground})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  {getModelIcon(model.type)}
                                  <CardTitle className="text-lg truncate">
                                    {model.name}
                                  </CardTitle>
                                </div>
                                {model.isDraft && (
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-50 text-amber-800"
                                  >
                                    Draft
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="flex justify-between items-center mt-1">
                                <span>
                                  {model.company} | {model.sector}
                                </span>
                                <span className="text-xs">
                                  {model.updatedAt.toLocaleDateString()}
                                </span>
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-2 pb-3">
                              <div className="grid grid-cols-3 gap-2">
                                {model.results ? (
                                  <>
                                    <div className="text-center p-2 bg-green-100 rounded-sm">
                                      <p className="text-xs text-muted-foreground">
                                        Target
                                      </p>
                                      <p className="font-bold">
                                        ₹{model.results.targetPrice}
                                      </p>
                                    </div>
                                    <div className="text-center p-2 bg-red-100 rounded-sm">
                                      <p className="text-xs text-muted-foreground">
                                        Method
                                      </p>
                                      <p className="font-medium text-sm">
                                        {getMethodLabel(model.type)}
                                      </p>
                                    </div>
                                    <div className="text-center p-2 bg-yellow-100 rounded-sm">
                                      <p className="text-xs text-muted-foreground">
                                        Upside
                                      </p>
                                      <p
                                        className={`font-bold ${
                                          model.results.upside > 0
                                            ? "text-green-600"
                                            : model.results.upside < 0
                                            ? "text-red-600"
                                            : ""
                                        }`}
                                      >
                                        {model.results.upside > 0 ? "+" : ""}
                                        {model.results.upside}%
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <div className="col-span-3 text-center py-2 text-sm text-muted-foreground">
                                    No results calculated yet
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {model.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0 text-xs text-muted-foreground">
                              <p>By {model.analyst}</p>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md border overflow-hidden w-full overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-finance-accent">
                            <tr>
                              <th className="text-left  text-cyan-50 py-3 px-4 font-medium">
                                Name
                              </th>
                              <th className="text-left text-cyan-50 py-3 px-4 font-medium">
                                Company
                              </th>
                              <th className="text-left text-cyan-50 py-3 px-4 font-medium">
                                Method
                              </th>
                              <th className="text-right text-cyan-50 py-3 px-4 font-medium">
                                Target Price
                              </th>
                              <th className="text-right text-cyan-50 py-3 px-4 font-medium">
                                Upside
                              </th>
                              <th className="text-left text-cyan-50 py-3 px-4 font-medium">
                                Updated
                              </th>
                              <th className="text-left text-cyan-50 py-3 px-4 font-medium">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {currentItems.map((model) => (
                              <tr
                                key={model.id}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => handleOpenModel(model.id)}
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    {getModelIcon(model.type)}
                                    <span className="truncate max-w-[150px]">
                                      {model.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">{model.company}</td>
                                <td className="py-3 px-4">
                                  {getMethodLabel(model.type)}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  {model.results?.targetPrice
                                    ? `₹${model.results.targetPrice}`
                                    : "-"}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  {model.results?.upside ? (
                                    <span
                                      className={
                                        model.results.upside > 0
                                          ? "text-green-600"
                                          : model.results.upside < 0
                                          ? "text-red-600"
                                          : ""
                                      }
                                    >
                                      {model.results.upside > 0 ? "+" : ""}
                                      {model.results.upside}%
                                    </span>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  {model.updatedAt.toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  {model.isDraft ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-50 text-amber-800"
                                    >
                                      Draft
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-800"
                                    >
                                      Published
                                    </Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-muted-foreground">
                          Showing {indexOfFirstItem + 1}-
                          {Math.min(indexOfLastItem, filteredModels.length)} of{" "}
                          {filteredModels.length} models
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="text-sm px-2">
                            Page {currentPage} of {totalPages}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No models match your search criteria.
                    </p>
                    {/* <Button onClick={clearFilters}>Clear Filters</Button> */}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  You don't have any valuation models yet.
                </p>
                <Button onClick={() => setShowSelector(true)}>
                  Create Your First Model
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
  );
}
