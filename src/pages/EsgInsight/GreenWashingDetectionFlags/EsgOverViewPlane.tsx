import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Info,
  AlertCircle,
  Leaf,
  Users,
  Building,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ChartContainer } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ESGCompanyScore } from "../Sustainability/ESGIntellegence";
import { esgControversies, esgDataSources, esgRisks, esgTrendData, exportFormats } from "../Sustainability/ESGData";

interface ESGOverviewPanelProps {
  company: ESGCompanyScore;
}

export function ESGOverviewPanel({ company }: ESGOverviewPanelProps) {
  // Find controversies and risks for this company
  const companyControversies = esgControversies.filter(
    (controversy) => controversy.companyId === company.companyId
  );
  
  const companyRisks = esgRisks.filter(
    (risk) => risk.companyId === company.companyId
  );
  
  // Get trend data for this company
  const trendData = esgTrendData[company.companyId] || [];
  
  const handleExport = (format: string) => {
    toast.success(`Exporting ESG report in ${format} format for ${company.companyName}`);
  };

  // Helper functions
  const getScoreLevelColor = (level: string) => {
    switch (level) {
      case 'Excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'Good': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Caution': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Risky': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#eab308'; // yellow
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };
  
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };
  
  const getTrendColor = (change: number, inverse = false) => {
    if (change > 0) return inverse ? 'text-red-600' : 'text-green-600';
    if (change < 0) return inverse ? 'text-green-600' : 'text-red-600';
    return 'text-gray-500';
  };
  
  // ESG Pillar icon mapping
  const getPillarIcon = (name: string) => {
    switch(name) {
      case 'Environmental': return <Leaf className="h-5 w-5" />;
      case 'Social': return <Users className="h-5 w-5" />;
      case 'Governance': return <Building className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };
  
  // Get severity class for badges
  const getSeverityClass = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* ESG Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">ESG Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-40 h-40">
                  <circle
                    className="text-gray-200"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r="60"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="transition-all duration-1000 ease-in-out"
                    strokeWidth="12"
                    strokeDasharray={Math.PI * 120}
                    strokeDashoffset={Math.PI * 120 * (1 - company.overallScore / 100)}
                    strokeLinecap="round"
                    stroke={getScoreColor(company.overallScore)}
                    fill="transparent"
                    r="60"
                    cx="80"
                    cy="80"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{company.overallScore}</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Badge className={getScoreLevelColor(company.scoreLevel)}>
                  {company.scoreLevel}
                </Badge>
                <div className={`flex items-center gap-1 ${getTrendColor(company.change)}`}>
                  {getTrendIcon(company.change)}
                  {company.change > 0 ? '+' : ''}{company.change} pts
                </div>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Last updated: {company.lastUpdated}
              </p>
              
              <div className="mt-6 w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export Report
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]" align="end">
                    {exportFormats.map((format) => (
                      <DropdownMenuItem key={format} onClick={() => handleExport(format)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export as {format}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pillar Scores */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">ESG Pillar Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.pillars.map((pillar) => (
                <div key={pillar.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPillarIcon(pillar.name)}
                      <span className="font-medium">{pillar.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{pillar.score}</span>
                      <span className={`flex items-center text-xs ${getTrendColor(pillar.change)}`}>
                        {getTrendIcon(pillar.change)}
                        {pillar.change > 0 ? '+' : ''}{pillar.change}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-700" 
                      style={{ 
                        width: `${pillar.score}%`, 
                        backgroundColor: getScoreColor(pillar.score) 
                      }}
                    ></div>
                  </div>
                  
                  {/* Key issues */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {pillar.issues.map((issue, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-50">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Second Row: ESG Trend and Controversies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ESG Trend */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">ESG Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[100%] mt-4">
              {trendData.length > 0 ? (
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date"
                        tickFormatter={(value) => {
                          const [year, month] = value.split('-');
                          return `${month}/${year.slice(2)}`;
                        }}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value) => [`${value}`, 'ESG Score']}
                        labelFormatter={(value) => {
                          const [year, month] = value.split('-');
                          const date = new Date(parseInt(year), parseInt(month) - 1);
                          return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score"
                        stroke={getScoreColor(company.overallScore)}
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 1 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No trend data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Controversies */}
        <Card className="col-span-1">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Controversies</CardTitle>
            {companyControversies.length > 0 && (
              <Badge className="bg-red-100 text-red-800 border-red-200">
                {companyControversies.length} Active
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            {companyControversies.length > 0 ? (
              <div className="space-y-4">
                {companyControversies.map((controversy) => (
                  <div key={controversy.id} className="p-3 rounded-md bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm">{controversy.title}</h3>
                      <Badge className={getSeverityClass(controversy.severity)}>
                        {controversy.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {controversy.description.slice(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{controversy.type}</span>
                      <span>{controversy.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-8 text-muted-foreground">
                <AlertCircle className="h-10 w-10 mb-2 text-green-500" />
                <p>No active controversies</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Risk Exposure and Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Exposure */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Risk Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            {companyRisks.length > 0 ? (
              <div className="space-y-4">
                {companyRisks.map((risk) => (
                  <div key={risk.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{risk.name}</h3>
                        <p className="text-xs text-muted-foreground">{risk.category}</p>
                      </div>
                      <Badge 
                        className={
                          risk.exposureLevel === 'High' ? 'bg-red-100 text-red-800 border-red-200' :
                          risk.exposureLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-blue-100 text-blue-800 border-blue-200'
                        }
                      >
                        {risk.exposureLevel} Exposure
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm">{risk.description}</p>
                    {risk.mitigation && (
                      <div className="mt-2">
                        <p className="text-xs font-medium">Mitigation:</p>
                        <p className="text-xs text-muted-foreground">{risk.mitigation}</p>
                      </div>
                    )}
                    <div className="mt-2 flex justify-between items-center">
                      <Badge 
                        variant="outline" 
                        className={
                          risk.trend === 'Improving' ? 'bg-green-50 text-green-700' :
                          risk.trend === 'Worsening' ? 'bg-red-50 text-red-700' :
                          'bg-gray-50 text-gray-700'
                        }
                      >
                        Trend: {risk.trend}
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                No risk exposure data available
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Data Sources */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {esgDataSources.map((source) => (
                <div key={source.id} className="flex items-center p-2 rounded hover:bg-gray-50">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{source.name}</h3>
                    <p className="text-xs text-muted-foreground">{source.type}</p>
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
