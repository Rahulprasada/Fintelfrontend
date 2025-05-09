import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ChevronDown,
  FileText,
  BarChart2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ESGCompanyScore } from "../Sustainability/ESGIntellegence";
import {
  esgCompanies,
  exportFormats,
  sectorESGScores,
} from "../Sustainability/ESGData";
import { CompanySelector } from "../GreenWashingDetectionFlags/CompanySelectors";

interface PeerBenchmarkPanelProps {
  company?: ESGCompanyScore;
  selectedCompanyId: string;
  setSelectedCompanyId: React.Dispatch<React.SetStateAction<string>>;
}
function BenchMarking({
  company,
  selectedCompanyId,
  setSelectedCompanyId,
}: PeerBenchmarkPanelProps) {
  const [filterRegion, setFilterRegion] = useState<string>("All");
  const [filterMarketCap, setFilterMarketCap] = useState<string>("All");

  // Get peers from the same sector
  const peers = esgCompanies.filter(
    (c) => c.sector === company.sector && c.companyId !== company.companyId
  );

  // Combine current company with peers for the full list
  const allCompanies = [company, ...peers].sort(
    (a, b) => b.overallScore - a.overallScore
  );

  // Calculate quartiles
  const getQuartile = (score: number) => {
    const sortedScores = [...allCompanies]
      .map((c) => c.overallScore)
      .sort((a, b) => b - a);
    const q1Threshold = sortedScores[Math.floor(sortedScores.length * 0.25)];
    const q3Threshold = sortedScores[Math.floor(sortedScores.length * 0.75)];

    if (score >= q1Threshold) return "Top 25%";
    if (score <= q3Threshold) return "Bottom 25%";
    return "Middle 50%";
  };

  // Get company's quartile
  const companyQuartile = getQuartile(company.overallScore);

  // Format data for bar chart
  const chartData = allCompanies
    .map((c) => ({
      name: c.companyName,
      score: c.overallScore,
      isSelected: c.companyId === company.companyId,
    }))
    .slice(0, 8); // Limit to top 8 for better visualization

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 60) return "#eab308"; // yellow
    if (score >= 40) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getQuartileColor = (quartile: string) => {
    switch (quartile) {
      case "Top 25%":
        return "bg-green-100 text-green-800 border-green-200";
      case "Middle 50%":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Bottom 25%":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleExport = (format: string) => {
    toast.success(
      `Exporting ESG Benchmark report in ${format} format for ${company.companyName}`
    );
  };

  // Get trend icon and color
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Benchmark Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">ESG Intelligence</h2>
        <CompanySelector
          companies={esgCompanies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={setSelectedCompanyId}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="col-span-1 border-t-8 border-t-blue-400"
          style={{ background: "linear-gradient(to top, #ebf3ef, #fffcfc)" }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              {company.sector} Benchmark
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">{company.companyName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-bold">
                    {company.overallScore}
                  </span>
                  <div
                    className={`flex items-center text-sm ${getTrendColor(
                      company.change
                    )}`}
                  >
                    {getTrendIcon(company.change)}
                    {company.change > 0 ? "+" : ""}
                    {company.change}
                  </div>
                </div>

                <Badge
                  className={getQuartileColor(companyQuartile)}
                  variant="outline"
                >
                  {companyQuartile} in Sector
                </Badge>

                <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                  {company.pillars.map((pillar) => (
                    <div
                      key={pillar.name}
                      className="flex flex-col items-center"
                    >
                      <span className="text-xs text-muted-foreground mb-1">
                        {pillar.name.charAt(0)}
                      </span>
                      <span className="text-lg font-semibold">
                        {pillar.score}
                      </span>
                      <span
                        className={`text-xs ${getTrendColor(pillar.change)}`}
                      >
                        {pillar.change > 0 ? "+" : ""}
                        {pillar.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Region: {filterRegion}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterRegion("All")}>
                      All Regions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRegion("India")}>
                      India
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRegion("Asia")}>
                      Asia
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Market Cap: {filterMarketCap}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterMarketCap("All")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterMarketCap("Large")}
                    >
                      Large Cap
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterMarketCap("Mid")}>
                      Mid Cap
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterMarketCap("Small")}
                    >
                      Small Cap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Benchmark
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {exportFormats.map((format) => (
                    <DropdownMenuItem
                      key={format}
                      onClick={() => handleExport(format)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Export as {format}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        <Card
          className="col-span-1 md:col-span-2 border-l-8 border-l-green-400"
          style={{ background: "linear-gradient(to left, #ebfff5, #fffcfc)" }}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold">
                ESG Leaderboard
              </CardTitle>
              <Badge variant="outline" className="bg-gray-50">
                Top {chartData.length} in {company.sector}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[100%]">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis type="number" domain={[0, 100]} tickCount={6} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={70}
                      tick={(props) => {
                        const isSelected = chartData[props.index].isSelected;
                        return (
                          <text
                            {...props}
                            fontSize={12}
                            fontWeight={isSelected ? "bold" : "normal"}
                            fill={isSelected ? "#000" : "#666"}
                          >
                            <tspan x={props.x} y={props.y} dy={4}>
                              {props.payload.value.length > 10
                                ? `${props.payload.value.substring(0, 10)}...`
                                : props.payload.value}
                            </tspan>
                          </text>
                        );
                      }}
                    />
                    <Tooltip formatter={(value) => [`${value}`, "ESG Score"]} />
                    <Bar dataKey="score">
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.isSelected
                              ? "#4f46e5"
                              : getScoreColor(entry.score)
                          }
                          stroke={
                            entry.isSelected
                              ? "#312e81"
                              : getScoreColor(entry.score)
                          }
                          strokeWidth={entry.isSelected ? 2 : 0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peer Comparison Table and Sector Averages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Peer Comparison Table */}
        <Card className="col-span-1 md:col-span-2"   style={{ background: "linear-gradient(to top, #fafffc, #fffcfc)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Peer Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-finance-blue text-white">
                  <TableRow>
                    <TableHead  className=" text-white">Company</TableHead>
                    <TableHead className="text-right text-white">ESG Score</TableHead>
                    <TableHead className="text-right text-white">E Score</TableHead>
                    <TableHead className="text-right text-white">S Score</TableHead>
                    <TableHead className="text-right text-white">G Score</TableHead>
                    <TableHead className="text-right text-white">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCompanies.map((comp) => (
                    <TableRow
                      key={comp.companyId}
                      className={
                        comp.companyId === company.companyId
                          ? "bg-gray-50 font-medium"
                          : ""
                      }
                    >
                      <TableCell>{comp.companyName}</TableCell>
                      <TableCell className="text-right">
                        {comp.overallScore}
                      </TableCell>
                      <TableCell className="text-right">
                        {comp.pillars[0].score}
                      </TableCell>
                      <TableCell className="text-right">
                        {comp.pillars[1].score}
                      </TableCell>
                      <TableCell className="text-right">
                        {comp.pillars[2].score}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={getTrendColor(comp.change)}>
                          {comp.change > 0 ? "+" : ""}
                          {comp.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Sector Averages */}
        <Card className="col-span-1 border-t-4 border-t-yellow-400" style={{ background: "linear-gradient(to top, #f5f4f3, #fffcfc)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Sector ESG Averages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorESGScores.map((sector) => (
                <div
                  key={sector.sector}
                  className={`flex justify-between items-center p-2 rounded bg-slate-100 ${
                    sector.sector === company.sector
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={
                      sector.sector === company.sector ? "font-medium" : ""
                    }
                  >
                    {sector.sector}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {sector.score}
                    </span>
                    <span className={`text-xs ${getTrendColor(sector.change)}`}>
                      {sector.change > 0 ? "+" : ""}
                      {sector.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default BenchMarking;
