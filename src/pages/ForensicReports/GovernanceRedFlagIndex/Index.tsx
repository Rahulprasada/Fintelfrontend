import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  AlertTriangle,
  ShieldAlert,
  Download,
  ChartPieIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { companies, governanceScores } from "../Data/ForensicData";
import { CompanySelector } from "../CompanySelector";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GovernanceRedFlagIndexProps {
  companyId: string;
  handleCompanyChange: (companyId: string) => void;
  selectedCompanyId1: string;
}

function GovernanceRedFlagIndex({
  companyId,
  handleCompanyChange,
  selectedCompanyId1,
}: GovernanceRedFlagIndexProps) {
  const score = governanceScores[companyId];
  const company = companies.find((c) => c.id === companyId);

  const handleExportReport = () => {
    console.log("Exporting governance report...");
    // In a real implementation, this would generate and download a PDF/Excel file
    alert("Governance report exported!");
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-orange-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 70) return "Low Risk";
    if (score >= 40) return "Medium Risk";
    return "High Risk";
  };

  const getFactorDescription = (factor: string, score: number) => {
    if (score >= 70) return `Good ${factor.toLowerCase()} practices`;
    if (score >= 40) return `Average ${factor.toLowerCase()} practices`;
    return `Poor ${factor.toLowerCase()} practices`;
  };
  const selectedCompany = companies.find(c => c.id === selectedCompanyId1);
  const isHighRisk = selectedCompany?.riskLevel === "High";
  if (!score || !company) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <ShieldAlert className="mr-2" />
            Governance Red Flag Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            No governance score data available for this company.
          </div>
        </CardContent>
      </Card>
    );
  }

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
      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <ShieldAlert className="mr-2" />
            Governance Red Flag Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            No governance score data available for this company.
          </div>
        </CardContent>
      </Card> */}
      <Card className="mb-6" style={{background:"linear-gradient(to right, #fbfff1, #ffffff)"}}>
        <CardHeader>
        <div className="bg-blue-50 border-b border-border p-4 rounded-md">
          <CardTitle className="text-xl flex items-center">
            <ShieldAlert className="mr-2" />
            Governance Red Flag Index
          </CardTitle>
          <CardDescription>
            Comprehensive assessment of company's governance health and risk
            factors
          </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Score Card */}
            <div className="col-span-1">
              <div className="bg-muted/20 border rounded-lg p-6 flex flex-col items-center justify-center border-t-8 border-t-orange-400">
                <h3 className="text-center text-sm font-medium text-muted-foreground mb-2">
                  Governance Risk Score
                </h3>
                <div
                  className={`text-5xl font-bold ${getScoreColor(
                    score.overallScore
                  )}`}
                >
                  {score.overallScore}
                </div>
                <div className="text-sm mt-1">out of 100</div>
                <Badge className={`mt-3 ${getRiskBadgeClass(score.riskLevel)}`}>
                  {score.riskLevel} Risk
                </Badge>

                <div className="mt-8 w-full space-y-2">
                  <h4 className="text-sm font-medium text-center mb-3">
                    Factor Breakdown
                  </h4>
                  <ScoreFactor
                    name="Leadership"
                    score={score.leadershipScore}
                  />
                  <ScoreFactor
                    name="Insider Trading"
                    score={score.insiderTradingScore}
                  />
                  <ScoreFactor
                    name="Share Pledging"
                    score={score.pledgingScore}
                  />
                  <ScoreFactor name="Related Party" score={score.rptScore} />
                  <ScoreFactor
                    name="Accounting"
                    score={score.accountingScore}
                  />
                </div>

                <Button className="mt-6 gap-1" onClick={handleExportReport}>
                  <Download className="w-4 h-4" />
                  Export Full Report
                </Button>
              </div>
            </div>

            {/* Score Trend Chart */}
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">
                  Governance Score Trend
                </h3>
                <p className="text-sm text-muted-foreground">
                  Historical performance of governance score over time
                </p>
              </div>

              <div className="h-[100%]">
                <ChartContainer
                  config={{
                    score: {
                      label: "Governance Score",
                      color: "#6366f1",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={score.history}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="score"
                        stroke="#6366f1"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="mt-8 p-6">
          <h3 className="text-sm font-medium mb-4">
            Governance Risk Assessment
          </h3>
          <Table>
            <TableHeader className="bg-finance-blue text-white">
              <TableRow>
                <TableHead className=" text-white">Factor</TableHead>
                <TableHead className=" text-white">Score</TableHead>
                <TableHead className="w-1/2 text-white">Assessment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium ">
                  Leadership Integrity
                </TableCell>
                <TableCell>
                  <Badge
                    className={getRiskBadgeClass(
                      getScoreDescription(score.leadershipScore)
                    )}
                  >
                    {score.leadershipScore}/100
                  </Badge>
                </TableCell>
                <TableCell>
                  {getFactorDescription("Leadership", score.leadershipScore)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Insider Trading Pattern
                </TableCell>
                <TableCell>
                  <Badge
                    className={getRiskBadgeClass(
                      getScoreDescription(score.insiderTradingScore)
                    )}
                  >
                    {score.insiderTradingScore}/100
                  </Badge>
                </TableCell>
                <TableCell>
                  {getFactorDescription(
                    "Insider trading",
                    score.insiderTradingScore
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Share Pledging</TableCell>
                <TableCell>
                  <Badge
                    className={getRiskBadgeClass(
                      getScoreDescription(score.pledgingScore)
                    )}
                  >
                    {score.pledgingScore}/100
                  </Badge>
                </TableCell>
                <TableCell>
                  {getFactorDescription("Share pledging", score.pledgingScore)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Related Party Transactions
                </TableCell>
                <TableCell>
                  <Badge
                    className={getRiskBadgeClass(
                      getScoreDescription(score.rptScore)
                    )}
                  >
                    {score.rptScore}/100
                  </Badge>
                </TableCell>
                <TableCell>
                  {getFactorDescription(
                    "Related party transaction",
                    score.rptScore
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Accounting Quality
                </TableCell>
                <TableCell>
                  <Badge
                    className={getRiskBadgeClass(
                      getScoreDescription(score.accountingScore)
                    )}
                  >
                    {score.accountingScore}/100
                  </Badge>
                </TableCell>
                <TableCell>
                  {getFactorDescription("Accounting", score.accountingScore)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function ScoreFactor({ name, score }: { name: string; score: number }) {
  const getColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span>{name}</span>
        <span>{score}/100</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`${getColor(score)} h-2 rounded-full`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default GovernanceRedFlagIndex;
