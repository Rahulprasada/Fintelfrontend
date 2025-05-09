import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, AlertTriangle, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { format } from "date-fns";

// Import recharts components
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { BusinessAnalysis } from "./BusinessAnalysis";

interface GovernanceSectionProps {
  analysis: BusinessAnalysis;
}

export function GovernanceSection({ analysis }: GovernanceSectionProps) {
  const [comments, setComments] = useState<string>(
    analysis.analystComments.find(c => c.section === 'Governance')?.text || ""
  );
  
  // Governance Score color based on score range
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-finance-green";
    if (score >= 50) return "bg-finance-gold";
    return "bg-finance-red";
  };
  
  // Board composition data for pie chart
  const boardComposition = [
    { name: "Independent", value: analysis.boardMembers.filter(m => m.isIndependent).length },
    { name: "Promoter", value: analysis.boardMembers.filter(m => m.isPromoter && !m.isIndependent).length },
    { name: "Other", value: analysis.boardMembers.filter(m => !m.isPromoter && !m.isIndependent).length },
  ];
  
  const COLORS = ["#10B981", "#FFC107", "#6B7280"];
  
  // Radar chart data for governance score components
  const radarData = [
    { subject: "Board Independence", value: analysis.governanceScore.boardIndependence },
    { subject: "Audit Quality", value: analysis.governanceScore.auditQuality },
    { subject: "Disclosure", value: analysis.governanceScore.disclosureQuality },
    { subject: "RPTs", value: analysis.governanceScore.relatedPartyTransactions },
    { subject: "Shareholder Rights", value: analysis.governanceScore.shareholderRights },
  ];
  
  const handleGenerateSummary = () => {
    toast({
      title: "LLM Governance Summary Generated",
      description: "The AI-powered summary has been created based on governance data.",
    });
  };
  
  const handleCommentChange = (value: string) => {
    setComments(value);
  };
  
  const handleSaveComment = () => {
    toast({
      title: "Comments Saved",
      description: "Your governance analysis comments have been saved.",
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Governance Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`border-l-4 ${getScoreColor(analysis.governanceScore.overall).replace('bg-', 'border-')}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-lg font-medium">
              Overall Governance Score
              <Badge className={getScoreColor(analysis.governanceScore.overall)}>
                {analysis.governanceScore.overall}/100
              </Badge>
            </CardTitle>
            <CardDescription>
              Composite score based on board independence, disclosures, and business practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#1E3A8A"
                    fill="#1E3A8A"
                    fillOpacity={0.5}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Board Composition</CardTitle>
            <CardDescription>
              {boardComposition[0].value} of {analysis.boardMembers.length} directors are independent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={boardComposition}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {boardComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} Directors`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {boardComposition.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-200">
          <CardHeader className={analysis.redFlags.length > 0 ? "bg-finance-red/10" : ""}>
            <CardTitle className="flex justify-between items-center text-lg font-medium">
              Red Flag Detection
              {analysis.redFlags.length > 0 && (
                <Badge className="bg-finance-red">{analysis.redFlags.length}</Badge>
              )}
            </CardTitle>
            <CardDescription>AI-powered governance issue detection</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {analysis.redFlags.length > 0 ? (
              <div className="space-y-3">
                {analysis.redFlags.filter(flag => flag.category === 'Governance').map((flag) => (
                  <Alert key={flag.id} variant="destructive" className="border-finance-red/50 bg-finance-red/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-medium">{flag.severity} Risk: {flag.category}</AlertTitle>
                    <AlertDescription>{flag.description}</AlertDescription>
                  </Alert>
                ))}
                {analysis.redFlags.filter(flag => flag.category !== 'Governance').length > 0 && (
                  <Alert className="border-finance-orange/50 bg-finance-orange/10">
                    <AlertTriangle className="h-4 w-4 text-finance-orange" />
                    <AlertTitle className="font-medium text-finance-orange">Other Red Flags</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      {analysis.redFlags.filter(flag => flag.category !== 'Governance').length} additional red flags in other categories
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Check className="h-10 w-10 text-finance-green mb-2" />
                <p className="font-medium text-finance-green">No Governance Red Flags</p>
                <p className="text-sm text-muted-foreground mt-1">Good governance practices detected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Related Party Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Related Party Transactions</CardTitle>
          <CardDescription>
            Transactions with promoter group entities or other related parties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entity</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Recurring</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysis.relatedPartyTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No related party transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  analysis.relatedPartyTransactions.map((rpt) => (
                    <TableRow key={rpt.id}>
                      <TableCell className="font-medium">{rpt.entity}</TableCell>
                      <TableCell>{rpt.relationship}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{rpt.description}</TableCell>
                      <TableCell>{format(rpt.date, "MMM d, yyyy")}</TableCell>
                      <TableCell className="text-right">₹{(rpt.amount / 10000000).toFixed(2)} Cr</TableCell>
                      <TableCell className="text-center">
                        {rpt.isRecurring ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
                            Recurring
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50 text-slate-800 border-slate-200">
                            One-time
                          </Badge>
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
      
      {/* Board Details & Analysis */}
      <Tabs defaultValue="board" className="w-full">
        <TabsList>
          <TabsTrigger value="board">Board of Directors</TabsTrigger>
          <TabsTrigger value="analysis">Governance Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Since</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Expertise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysis.boardMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{format(member.since, "MMM yyyy")}</TableCell>
                        <TableCell>
                          {member.isIndependent ? (
                            <Badge className="bg-finance-green">Independent</Badge>
                          ) : member.isPromoter ? (
                            <Badge className="bg-finance-blue">Promoter</Badge>
                          ) : (
                            <Badge variant="outline">Executive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {member.expertise.slice(0, 2).map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-muted/40">{skill}</Badge>
                            ))}
                            {member.expertise.length > 2 && (
                              <Badge variant="outline" className="bg-muted/40">+{member.expertise.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Governance Analysis</CardTitle>
                <Button 
                  variant="outline" 
                  className="border-finance-purple text-finance-purple hover:bg-finance-purple/10"
                  onClick={handleGenerateSummary}
                >
                  <Wand2 className="mr-2 h-4 w-4" /> Generate LLM Summary
                </Button>
              </div>
              <CardDescription>
                Add your analysis and notes about the company's governance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comments}
                onChange={(e) => handleCommentChange(e.target.value)}
                placeholder="Enter your governance analysis and notes here..."
                className="min-h-[200px]"
              />
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSaveComment}>Save Comments</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
