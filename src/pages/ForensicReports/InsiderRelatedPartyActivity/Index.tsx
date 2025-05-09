import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Eye,
  TrendingDown,
  TrendingUp,
  FileBarChart,
  Download,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  companies,
  insiderTradeLogs,
  pledgeData,
  relatedPartyTransactions,
} from "../Data/ForensicData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CompanySelector } from "../CompanySelector";

interface InsiderActivityTrackerProps {
  companyId: string;
  handleCompanyChange: (companyId: string) => void;
  selectedCompanyId1: string;
}

function InsiderRelatedPartyActivity({
  companyId,
  handleCompanyChange,
  selectedCompanyId1,
}: InsiderActivityTrackerProps) {
  const [activeTab, setActiveTab] = useState("insider-trades");

  const trades = insiderTradeLogs[companyId] || [];
  const pledges = pledgeData[companyId] || [];
  const rpts = relatedPartyTransactions[companyId] || [];

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} data...`);
    // In a real implementation, this would generate and download a PDF/Excel file
    alert(`${type} data exported!`);
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    } else {
      return `₹${value.toLocaleString()}`;
    }
  };

  // Check for suspicious pledge patterns (sudden increases)
  const hasHighPledge = pledges.some((p) => p.pledgedPercentage > 60);
  const hasPledgeIncrease =
    pledges.length >= 2 &&
    pledges[pledges.length - 1].pledgedPercentage >
      pledges[pledges.length - 2].pledgedPercentage + 15;

  // Check for suspicious insider selling
  const hasHighInsiderSelling =
    trades.filter((t) => t.type === "Sell").length >
    trades.filter((t) => t.type === "Buy").length * 2;

  // Check for large RPTs
  const hasLargeRPT = rpts.some((rpt) => rpt.value > 1000000000); // RPT more than 100 Cr
  const selectedCompany = companies.find(c => c.id === selectedCompanyId1);
  const isHighRisk = selectedCompany?.riskLevel === "High";
  return (
    <div>
      <div className="p-4 mb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Forensic Reports</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive governance analysis and risk assessment
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <CompanySelector
              selectedCompanyId={selectedCompanyId1}
              onCompanyChange={handleCompanyChange}
            />
          </div>
        </div>

        {isHighRisk && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>High Governance Risk Detected</AlertTitle>
            <AlertDescription>
              This company has multiple serious governance concerns that warrant
              detailed investigation before investment.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <Card className="mb-6" style={{background:"linear-gradient(to top, #f7f7f7, #ffffff)"}}>
        <CardHeader>
          <div className="bg-blue-50 border-b border-border p-4 rounded-md">
            <CardTitle className="text-xl flex items-center">
              <Eye className="mr-2" />
              Insider & Related Party Activity Tracker
            </CardTitle>
            <CardDescription>
              Monitor insider trades, promoter pledging and related party
              transactions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Alerts Section */}
          {(hasHighPledge ||
            hasPledgeIncrease ||
            hasHighInsiderSelling ||
            hasLargeRPT) && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
              <h3 className="font-medium flex items-center text-amber-800 mb-2">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                Unusual Activity Detected
              </h3>
              <ul className="space-y-1 text-sm text-amber-700 ml-6 list-disc">
                {hasHighPledge && (
                  <li>
                    High pledged percentage of promoter holding ({">"}60%)
                  </li>
                )}
                {hasPledgeIncrease && (
                  <li>Sudden increase in pledged shares ({">"}15% jump)</li>
                )}
                {hasHighInsiderSelling && (
                  <li>High insider selling activity compared to buying</li>
                )}
                {hasLargeRPT && (
                  <li>Large related party transactions detected</li>
                )}
              </ul>
            </div>
          )}

          <Tabs
            defaultValue="insider-trades"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
              <TabsList className="flex flex-wrap gap-2 overflow-auto">
                <TabsTrigger value="insider-trades">Insider Trades</TabsTrigger>
                <TabsTrigger value="pledging">Share Pledging</TabsTrigger>
                <TabsTrigger value="rpt">
                  Related Party Transactions
                </TabsTrigger>
              </TabsList>

              <Button
                size="sm"
                variant="outline"
                className="gap-1 w-full sm:w-auto"
                onClick={() =>
                  handleExport(
                    activeTab === "insider-trades"
                      ? "insider trades"
                      : activeTab === "pledging"
                      ? "pledging"
                      : "related party transactions"
                  )
                }
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
            <TabsContent value="insider-trades" className="mt-0">
              {trades.length > 0 ? (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader className="bg-finance-blue text-white">
                      <TableRow>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Insider</TableHead>
                        <TableHead className="text-white">
                          Designation
                        </TableHead>
                        <TableHead className="text-white">
                          Transaction
                        </TableHead>
                        <TableHead className="text-white">Quantity</TableHead>
                        <TableHead className="text-white">
                          Price/Share
                        </TableHead>
                        <TableHead className="text-white">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trades.map((trade) => (
                        <TableRow key={trade.id}>
                          <TableCell>{trade.date}</TableCell>
                          <TableCell>{trade.insiderName}</TableCell>
                          <TableCell>{trade.designation}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                trade.type === "Buy"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }
                            >
                              <span className="flex items-center">
                                {trade.type === "Buy" ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {trade.type}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {trade.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ₹{trade.pricePerShare.toLocaleString()}
                          </TableCell>
                          <TableCell>{formatCurrency(trade.value)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No insider trading data available
                </div>
              )}
            </TabsContent>

            <TabsContent value="pledging" className="mt-0">
              {pledges.length > 0 ? (
                <div className="h-[100%]">
                  <ChartContainer
                    config={{
                      pledgedPercentage: {
                        label: "Pledged Percentage",
                        color: "#f97316",
                      },
                      totalHolding: {
                        label: "Total Promoter Holding",
                        color: "#3b82f6",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={pledges}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="pledgedPercentage"
                          name="pledgedPercentage"
                          stroke="#f97316"
                          fill="#fdba74"
                        />
                        <Area
                          type="monotone"
                          dataKey="totalHolding"
                          name="totalHolding"
                          stroke="#3b82f6"
                          fill="#93c5fd"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 text-sm text-muted-foreground text-center">
                    <p>
                      {hasHighPledge ? (
                        <span className="text-amber-600 font-medium">
                          High pledging alert: Promoters have pledged{" "}
                          {pledges[
                            pledges.length - 1
                          ].pledgedPercentage.toFixed(1)}
                          % of their holding
                        </span>
                      ) : pledges[pledges.length - 1].pledgedPercentage > 0 ? (
                        <span>
                          Current pledged shares:{" "}
                          {pledges[
                            pledges.length - 1
                          ].pledgedPercentage.toFixed(1)}
                          % of promoter holding
                        </span>
                      ) : (
                        <span className="text-green-600">
                          No shares currently pledged by promoters
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No pledging data available
                </div>
              )}
            </TabsContent>

            <TabsContent value="rpt" className="mt-0">
              {rpts.length > 0 ? (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Counterparty</TableHead>
                        <TableHead>Relationship</TableHead>
                        <TableHead>Transaction Nature</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Approval Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rpts.map((rpt) => (
                        <TableRow key={rpt.id}>
                          <TableCell>{rpt.date}</TableCell>
                          <TableCell>{rpt.counterparty}</TableCell>
                          <TableCell>{rpt.relationship}</TableCell>
                          <TableCell>{rpt.nature}</TableCell>
                          <TableCell
                            className={
                              rpt.value > 1000000000
                                ? "text-amber-600 font-medium"
                                : ""
                            }
                          >
                            {formatCurrency(rpt.value)}
                          </TableCell>
                          <TableCell>{rpt.approvalStatus}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No related party transactions found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default InsiderRelatedPartyActivity;
