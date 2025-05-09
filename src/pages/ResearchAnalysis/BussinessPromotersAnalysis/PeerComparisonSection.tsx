import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Check, X, AlertTriangle, Plus, Download, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BusinessAnalysis } from "./BusinessAnalysis";

interface PeerComparisonSectionProps {
  analysis: BusinessAnalysis;
}

export function PeerComparisonSection({ analysis }: PeerComparisonSectionProps) {
  const [comments, setComments] = useState<string>("");
  
  // Prepare data for governance score comparison
  const governanceData = [
    {
      name: analysis.companyName,
      score: analysis.governanceScore.overall,
      isMainCompany: true,
    },
    ...analysis.peerComparisons.map(peer => ({
      name: peer.companyName,
      score: peer.governanceScore,
      isMainCompany: false,
    })),
  ];
  
  // Prepare data for pledging comparison
  const pledgingData = [
    {
      name: analysis.companyName,
      value: analysis.pledgingData[analysis.pledgingData.length - 1]?.percentage || 0,
      isMainCompany: true,
      risk: getPledgingRisk(analysis.pledgingData[analysis.pledgingData.length - 1]?.percentage || 0),
    },
    ...analysis.peerComparisons.map(peer => ({
      name: peer.companyName,
      value: peer.promoterPledging,
      isMainCompany: false,
      risk: getPledgingRisk(peer.promoterPledging),
    })),
  ];
  
  // Prepare data for board independence comparison
  const boardIndependenceData = [
    {
      name: analysis.companyName,
      value: analysis.governanceScore.boardIndependence,
      isMainCompany: true,
    },
    ...analysis.peerComparisons.map(peer => ({
      name: peer.companyName,
      value: peer.boardIndependence,
      isMainCompany: false,
    })),
  ];
  
  // Prepare data for radar chart with all governance components
  const mainCompanyData = [
    { subject: "Board Independence", A: analysis.governanceScore.boardIndependence },
    { subject: "Audit Quality", A: analysis.governanceScore.auditQuality },
    { subject: "Disclosure", A: analysis.governanceScore.disclosureQuality },
    { subject: "RPTs", A: analysis.governanceScore.relatedPartyTransactions },
    { subject: "Shareholder Rights", A: analysis.governanceScore.shareholderRights },
  ];
  
  function getPledgingRisk(pledging: number): 'Low' | 'Medium' | 'High' {
    if (pledging > 50) return 'High';
    if (pledging > 20) return 'Medium';
    return 'Low';
  }
  
  // Colors for charts
  const getBarColor = (score: number, isMainCompany: boolean) => {
    if (isMainCompany) return "#1E3A8A"; // finance-blue for main company
    if (score >= 70) return "#10B981"; // finance-green
    if (score >= 50) return "#FFC107"; // finance-gold
    return "#EF4444"; // finance-red
  };
  
  const getPledgingColor = (risk: string, isMainCompany: boolean) => {
    if (isMainCompany) return "#1E3A8A"; // finance-blue for main company
    if (risk === 'Low') return "#10B981"; // finance-green
    if (risk === 'Medium') return "#FFC107"; // finance-gold
    return "#EF4444"; // finance-red
  };
  
  const handleAddPeer = () => {
    toast({
      title: "Add Peer Company",
      description: "Select additional companies to add to this peer comparison.",
    });
  };
  
  const handleGenerateCommentary = () => {
    toast({
      title: "LLM Commentary Generated",
      description: "AI-generated peer comparison insights have been added.",
    });
    setComments("Based on the peer comparison analysis, " + analysis.companyName + " shows " + 
      (analysis.governanceScore.overall >= 70 ? "strong" : analysis.governanceScore.overall >= 50 ? "average" : "concerning") + 
      " governance practices compared to industry peers. " +
      (analysis.pledgingData[analysis.pledgingData.length - 1]?.percentage > 0 ? 
        "The company has significant promoter pledging which is a concern. " : 
        "The company has no promoter pledging which is positive. ") +
      "Board independence is " + (analysis.governanceScore.boardIndependence >= 70 ? "strong" : "an area for improvement") + ".");
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your peer comparison is being exported to PDF.",
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Peer Group Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-lg font-semibold">Peer Group Comparison</h2>
          <p className="text-muted-foreground mt-1">
            Comparing {analysis.companyName} with {analysis.peerComparisons.length} industry peers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAddPeer}>
            <Plus className="mr-2 h-4 w-4" /> Add Peer
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      {/* Governance Score Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Governance Score Comparison</CardTitle>
          <CardDescription>Overall governance scoring across peer companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={governanceData}
                margin={{ top: 20, right: 30, left: 0, bottom: 70 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: number) => [`${value}/100`, 'Governance Score']}
                  labelFormatter={(label) => `Company: ${label}`}
                />
                <Bar dataKey="score" name="Governance Score">
                  {governanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor(entry.score, entry.isMainCompany)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Peer Comparison */}
      <Tabs defaultValue="heatmap" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
          <TabsTrigger value="heatmap">Governance Heatmap</TabsTrigger>
          <TabsTrigger value="radar">Radar Analysis</TabsTrigger>
          <TabsTrigger value="commentary">LLM Commentary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="heatmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Governance & Pledging Heatmap</CardTitle>
              <CardDescription>Visual comparison of key metrics across peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-center">Governance Score</TableHead>
                      <TableHead className="text-center">Promoter Pledging</TableHead>
                      <TableHead className="text-center">Board Independence</TableHead>
                      <TableHead className="text-center">Red Flags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Main company */}
                    <TableRow className="bg-blue-50/50">
                      <TableCell className="font-medium">{analysis.companyName} (Subject)</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${analysis.governanceScore.overall >= 70 ? 'bg-finance-green' : analysis.governanceScore.overall >= 50 ? 'bg-finance-gold' : 'bg-finance-red'}`}>
                          {analysis.governanceScore.overall}/100
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {analysis.pledgingData.length > 0 ? (
                          <Badge className={`${analysis.pledgingData[analysis.pledgingData.length - 1].percentage > 50 ? 'bg-finance-red' : analysis.pledgingData[analysis.pledgingData.length - 1].percentage > 20 ? 'bg-finance-orange' : 'bg-finance-green'}`}>
                            {analysis.pledgingData[analysis.pledgingData.length - 1].percentage}%
                          </Badge>
                        ) : (
                          <Badge className="bg-finance-green">0%</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${analysis.governanceScore.boardIndependence >= 70 ? 'bg-finance-green' : analysis.governanceScore.boardIndependence >= 50 ? 'bg-finance-gold' : 'bg-finance-red'}`}>
                          {analysis.governanceScore.boardIndependence}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {analysis.redFlags.length > 0 ? (
                          <Badge className="bg-finance-red">{analysis.redFlags.length}</Badge>
                        ) : (
                          <Badge className="bg-finance-green">0</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                    
                    {/* Peer companies */}
                    {analysis.peerComparisons.map((peer) => (
                      <TableRow key={peer.companyId}>
                        <TableCell>{peer.companyName}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${peer.governanceScore >= 70 ? 'bg-finance-green' : peer.governanceScore >= 50 ? 'bg-finance-gold' : 'bg-finance-red'}`}>
                            {peer.governanceScore}/100
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${peer.promoterPledging > 50 ? 'bg-finance-red' : peer.promoterPledging > 20 ? 'bg-finance-orange' : 'bg-finance-green'}`}>
                            {peer.promoterPledging}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${peer.boardIndependence >= 70 ? 'bg-finance-green' : peer.boardIndependence >= 50 ? 'bg-finance-gold' : 'bg-finance-red'}`}>
                            {peer.boardIndependence}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {peer.redFlagsCount > 0 ? (
                            <Badge className="bg-finance-red">{peer.redFlagsCount}</Badge>
                          ) : (
                            <Badge className="bg-finance-green">0</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Pledging Comparison Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Promoter Pledging Comparison</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={pledgingData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                        barSize={30}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          height={60} 
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value: number) => [`${value}%`, 'Pledging']}
                        />
                        <Bar dataKey="value" name="Promoter Pledging">
                          {pledgingData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={getPledgingColor(entry.risk, entry.isMainCompany)}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Board Independence Comparison Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Board Independence Comparison</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={boardIndependenceData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                        barSize={30}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          height={60}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value: number) => [`${value}%`, 'Board Independence']}
                        />
                        <Bar dataKey="value" name="Board Independence">
                          {boardIndependenceData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={getBarColor(entry.value, entry.isMainCompany)}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="radar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Governance Radar Analysis</CardTitle>
              <CardDescription>Detailed breakdown of governance components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} data={mainCompanyData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name={analysis.companyName} dataKey="A" stroke="#1E3A8A" fill="#1E3A8A" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Governance Component Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${analysis.governanceScore.boardIndependence >= 70 ? 'bg-finance-green' : 'bg-finance-red'}`}></div>
                    <span className="font-medium">Board Independence:</span>
                    <span>{analysis.governanceScore.boardIndependence >= 70 ? 'Strong' : 'Needs Improvement'}</span>
                    {analysis.governanceScore.boardIndependence >= 70 ? <Check size={16} className="text-finance-green" /> : <X size={16} className="text-finance-red" />}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${analysis.governanceScore.auditQuality >= 70 ? 'bg-finance-green' : 'bg-finance-red'}`}></div>
                    <span className="font-medium">Audit Quality:</span>
                    <span>{analysis.governanceScore.auditQuality >= 70 ? 'Strong' : 'Needs Improvement'}</span>
                    {analysis.governanceScore.auditQuality >= 70 ? <Check size={16} className="text-finance-green" /> : <X size={16} className="text-finance-red" />}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${analysis.governanceScore.disclosureQuality >= 70 ? 'bg-finance-green' : 'bg-finance-red'}`}></div>
                    <span className="font-medium">Disclosure Quality:</span>
                    <span>{analysis.governanceScore.disclosureQuality >= 70 ? 'Strong' : 'Needs Improvement'}</span>
                    {analysis.governanceScore.disclosureQuality >= 70 ? <Check size={16} className="text-finance-green" /> : <X size={16} className="text-finance-red" />}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${analysis.governanceScore.relatedPartyTransactions >= 70 ? 'bg-finance-green' : 'bg-finance-red'}`}></div>
                    <span className="font-medium">Related Party Transactions:</span>
                    <span>{analysis.governanceScore.relatedPartyTransactions >= 70 ? 'Well Managed' : 'Concerning'}</span>
                    {analysis.governanceScore.relatedPartyTransactions >= 70 ? <Check size={16} className="text-finance-green" /> : <AlertTriangle size={16} className="text-finance-orange" />}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${analysis.governanceScore.shareholderRights >= 70 ? 'bg-finance-green' : 'bg-finance-red'}`}></div>
                    <span className="font-medium">Shareholder Rights:</span>
                    <span>{analysis.governanceScore.shareholderRights >= 70 ? 'Strong' : 'Needs Improvement'}</span>
                    {analysis.governanceScore.shareholderRights >= 70 ? <Check size={16} className="text-finance-green" /> : <X size={16} className="text-finance-red" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commentary" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">LLM Commentary & Analysis</CardTitle>
                <Button 
                  variant="outline" 
                  className="border-finance-purple text-finance-purple hover:bg-finance-purple/10"
                  onClick={handleGenerateCommentary}
                >
                  <Wand2 className="mr-2 h-4 w-4" /> Generate Commentary
                </Button>
              </div>
              <CardDescription>
                AI-generated insights and comparative analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Generate or enter peer comparison commentary here..."
                className="min-h-[200px]"
              />
              
              {analysis.redFlags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Red Flag Summary</h3>
                  <div className="space-y-2">
                    {analysis.redFlags.map((flag, index) => (
                      <Alert key={index} className="border-finance-red/30 bg-finance-red/5">
                        <AlertTriangle className="h-4 w-4 text-finance-red" />
                        <AlertTitle className="text-sm font-medium text-finance-red">{flag.category} Red Flag</AlertTitle>
                        <AlertDescription className="text-muted-foreground text-sm">
                          {flag.description}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
