import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Calendar,
  Briefcase,
  AlertCircle,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { businessAnalysisSamples, companiesList } from "./BusinessAnalysisData";

export default function BusinessAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter companies based on search term and selected sector
  const filteredCompanies = companiesList.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector
      ? company.sector === selectedSector
      : true;

    return matchesSearch && matchesSector;
  });

  // Get unique sectors for filter
  const sectors = Array.from(
    new Set(companiesList.map((company) => company.sector))
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-finance-blue to-finance-purple bg-clip-text">
              Business & Promoter Analysis
            </h1>
            <p className="text-muted-foreground mt-1">
              Analyze business quality, governance, and promoter behavior
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link to="new">
              <Button>
                <Plus className="mr-1 h-4 w-4" /> New Analysis
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {selectedSector
                  ? `Sector: ${selectedSector}`
                  : "Filter by Sector"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => setSelectedSector(null)}>
                All Sectors
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {sectors.map((sector) => (
                <DropdownMenuItem
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                >
                  {sector}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="companies" className="w-full">
          <TabsList className="grid w-full sm:w-80 grid-cols-2">
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="mt-4">
            <Card className="bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-purple-600/10 rounded-lg">
              <CardHeader className="pb-3">
                <CardTitle>Company Directory</CardTitle>
                <CardDescription>
                  Select a company to start or view its business analysis
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="mt-2">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-finance-accent">
                      <TableRow>
                        <TableHead className="w-[150px] text-cyan-50">
                          Ticker
                        </TableHead>
                        <TableHead className=" text-cyan-50">
                          Company Name
                        </TableHead>
                        <TableHead className=" text-cyan-50">Sector</TableHead>
                        <TableHead className="text-right text-cyan-50">
                          Analysis Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompanies.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-6 text-muted-foreground"
                          >
                            No companies found matching your search
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentItems.map((company) => {
                          const hasAnalysis = businessAnalysisSamples.some(
                            (analysis) => analysis.companyId === company.id
                          );

                          return (
                            <TableRow
                              key={company.id}
                              className="hover:bg-muted/40"
                            >
                              <TableCell className="font-medium">
                                {company.id}
                              </TableCell>
                              <TableCell>
                                <Link
                                  to={
                                    hasAnalysis
                                      ? `/dashboard/business-promoter-analysis/${
                                          businessAnalysisSamples.find(
                                            (a) => a.companyId === company.id
                                          )?.id
                                        }`
                                      : `/dashboard/business-promoter-analysis/new?company=${company.id}`
                                  }
                                  className="text-finance-blue hover:text-finance-blue/80 hover:underline font-medium"
                                >
                                  {company.name}
                                </Link>
                              </TableCell>
                              <TableCell>{company.sector}</TableCell>
                              <TableCell className="text-right">
                                {hasAnalysis ? (
                                  <Badge className="bg-finance-green hover:bg-finance-green/80">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-muted-foreground"
                                  >
                                    Not started
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredCompanies.length)} of{" "}
                  {filteredCompanies.length} models
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
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessAnalysisSamples.map((analysis) => (
                <Link
                  key={analysis.id}
                  to={`/business-analysis/${analysis.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-md transition-shadow duration-300 hover:border-finance-purple/30">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-finance-blue">
                            {analysis.companyName}
                          </CardTitle>
                          <CardDescription>
                            {analysis.companyId} • {analysis.sector}
                          </CardDescription>
                        </div>
                        <div>
                          {analysis.governanceScore.overall >= 70 ? (
                            <Badge className="bg-finance-green">
                              High Score: {analysis.governanceScore.overall}
                            </Badge>
                          ) : analysis.governanceScore.overall >= 50 ? (
                            <Badge className="bg-finance-gold/90">
                              Medium Score: {analysis.governanceScore.overall}
                            </Badge>
                          ) : (
                            <Badge className="bg-finance-red">
                              Low Score: {analysis.governanceScore.overall}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-finance-purple" />
                          <span className="text-muted-foreground">
                            MOAT Items:
                          </span>
                          <span className="ml-1 font-medium">
                            {analysis.moat.length}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-finance-red" />
                          <span className="text-muted-foreground">
                            Red Flags:
                          </span>
                          <span className="ml-1 font-medium">
                            {analysis.redFlags.length}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <BarChart className="h-4 w-4 mr-2 text-finance-teal" />
                          <span className="text-muted-foreground">
                            Peer Comps:
                          </span>
                          <span className="ml-1 font-medium">
                            {analysis.peerComparisons.length}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-finance-gold" />
                          <span className="text-muted-foreground">
                            Versions:
                          </span>
                          <span className="ml-1 font-medium">
                            {analysis.versions.length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      Last updated: {format(analysis.updatedAt, "MMM d, yyyy")}
                    </CardFooter>
                  </Card>
                </Link>
              ))}

              {businessAnalysisSamples.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-40 bg-muted/20 border border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <p>No business analyses created yet.</p>
                    <Link to="/business-analysis/new">
                      <Button variant="link" className="text-finance-blue mt-2">
                        Create your first analysis
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
