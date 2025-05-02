import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { BusinessAnalysis } from "./BusinessAnalysis";

interface PromoterAnalysisSectionProps {
  analysis: BusinessAnalysis;
}

export function PromoterAnalysisSection({ analysis }: PromoterAnalysisSectionProps) {
  const hasRedFlags = analysis.redFlags.filter(flag => flag.category === 'Promoter').length > 0;
  const promoterHoldingData = analysis.promoterHolding.map(item => ({
    name: item.quarter,
    percentage: item.percentage
  }));
  
  const pledgingData = analysis.pledgingData.map(item => ({
    name: item.quarter,
    percentage: item.percentage
  }));
  
  const highPledging = analysis.pledgingData.some(item => item.percentage > 50);
  
  const insiderSellingEvents = analysis.insiderTransactions.filter(
    transaction => transaction.transactionType === 'Sell'
  ).length;
  
  const chartConfig = {
    holding: {
      color: "#1E3A8A", // finance-blue
    },
    pledging: {
      color: "#EF4444", // finance-red
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Promoter Shareholding Trend Chart */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-finance-blue">Promoter Shareholding Trend</CardTitle>
              <CardDescription>Last 8 quarters trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={chartConfig}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={promoterHoldingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={['auto', 'auto']} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="percentage" name="holding" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          {/* Red Flags Panel */}
          <Card className={`h-full border ${hasRedFlags ? 'border-finance-red' : ''}`}>
            <CardHeader className={`${hasRedFlags ? 'bg-finance-red/10' : ''}`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Promoter Red Flags</CardTitle>
                {hasRedFlags && <Badge className="bg-finance-red">{analysis.redFlags.filter(flag => flag.category === 'Promoter').length}</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {hasRedFlags ? (
                <div className="space-y-4">
                  {analysis.redFlags
                    .filter(flag => flag.category === 'Promoter')
                    .map((flag) => (
                      <Alert key={flag.id} variant="destructive" className="border-finance-red/50 bg-finance-red/10">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-medium">{flag.severity} Severity</AlertTitle>
                        <AlertDescription className="mt-1">{flag.description}</AlertDescription>
                      </Alert>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <p className="text-sm text-muted-foreground mb-2">No promoter red flags detected</p>
                  <Badge variant="outline" className="bg-finance-green/10 text-finance-green border-finance-green/30">
                    Good Governance Indicator
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Pledging Data */}
      <Card className={highPledging ? 'border-finance-red' : ''}>
        <CardHeader className={`${highPledging ? 'bg-finance-red/10' : ''}`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-finance-gold">Promoter Pledging</CardTitle>
            {highPledging && (
              <Badge className="bg-finance-red">
                High Risk
              </Badge>
            )}
          </div>
          <CardDescription>Percentage of promoter shares pledged</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pledgingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="percentage" name="pledging" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {highPledging && (
            <Alert variant="destructive" className="mt-4 border-finance-red/50 bg-finance-red/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-medium">High Pledging Risk</AlertTitle>
              <AlertDescription>
                Promoter pledging above 50% indicates potential financial stress and risk of forced selling.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {/* Insider Transactions & Remuneration */}
      <Tabs defaultValue="insider" className="w-full">
        <TabsList>
          <TabsTrigger value="insider">Insider Transactions</TabsTrigger>
          <TabsTrigger value="remuneration">Remuneration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insider" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Insider Trading Activity</CardTitle>
                {insiderSellingEvents > 1 && (
                  <Badge className="bg-finance-orange">
                    {insiderSellingEvents} Selling Events
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Person</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysis.insiderTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No insider transactions recorded
                        </TableCell>
                      </TableRow>
                    ) : (
                      analysis.insiderTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                          <TableCell>{transaction.personName}</TableCell>
                          <TableCell>{transaction.role}</TableCell>
                          <TableCell>
                            <Badge className={transaction.transactionType === 'Buy' ? 'bg-finance-green' : 'bg-finance-red'}>
                              {transaction.transactionType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{transaction.quantity.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{transaction.price.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₹{(transaction.quantity * transaction.price).toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="remuneration" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Key Management Remuneration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Person</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Amount (Annual)</TableHead>
                      <TableHead className="text-right">Change YoY</TableHead>
                      <TableHead className="text-right">% of Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysis.remuneration.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No remuneration data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      analysis.remuneration.map((item) => (
                        <TableRow key={item.personName}>
                          <TableCell>{item.personName}</TableCell>
                          <TableCell>{item.role}</TableCell>
                          <TableCell className="text-right">₹{(item.amount / 10000000).toFixed(2)} Cr</TableCell>
                          <TableCell className="text-right">
                            <span className={item.percentageChange > 10 ? 'text-finance-red' : 'text-finance-green'}>
                              {item.percentageChange > 0 ? '+' : ''}{item.percentageChange}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.profitPercentage ? (
                              <span className={item.profitPercentage > 1 ? 'text-finance-orange' : ''}>
                                {item.profitPercentage.toFixed(2)}%
                              </span>
                            ) : (
                              'N/A'
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
