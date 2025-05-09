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
  Shield,
  User,
  FileCheck,
  AlertCircle,
  Download,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { companies, leadershipProfiles } from "../Data/ForensicData";
import {
  Directorship,
  LeadershipProfile,
  RedFlagEvent,
} from "../Model/ForesicReport";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CompanySelector } from "../CompanySelector";
import { Divider } from "@mui/material";

interface LeadershipIntegrityProps {
  companyId: string;
  handleCompanyChange: (companyId: string) => void;
  selectedCompanyId1: string;
}
function LeaderShipIntegrityReport({
  companyId,
  handleCompanyChange,
  selectedCompanyId1,
}: LeadershipIntegrityProps) {
  const profiles = leadershipProfiles[companyId] || [];
  const [selectedProfile, setSelectedProfile] =
    useState<LeadershipProfile | null>(
      profiles.length > 0 ? profiles[0] : null
    );

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
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  const handleProfileClick = (profile: LeadershipProfile) => {
    setSelectedProfile(profile);
  };

  const handleExportDossier = () => {
    console.log("Exporting leadership dossier...");
    // In a real implementation, this would generate and download a PDF/Excel file
    alert("Leadership dossier exported!");
  };
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
      <Card className="mb-6" style={{background:"linear-gradient(to right, #edeff5, #ffffff)"}}>
        {profiles.length > 0 ? (
          <>
            <CardHeader >
              <div className="bg-green-50 border-b border-border p-4 rounded-md">
              <CardTitle className="text-xl flex items-center">
                <Shield className="mr-2" />
                Leadership Integrity
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of leadership background, track record,
                and risk signals
              </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Leadership Profiles List */}
                <div className="col-span-1">
                  <h3 className="font-medium mb-3 text-sm">
                    Leadership Profiles
                  </h3>
                  <div className="space-y-3">
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          selectedProfile?.id === profile.id
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-card hover:bg-muted/50 border border-border"
                        }`}
                        onClick={() => handleProfileClick(profile)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{profile.name}</div>
                          <Badge
                            className={getRiskBadgeClass(profile.riskLevel)}
                          >
                            {profile.riskLevel}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {profile.role}
                        </div>
                        <div className="mt-2">
                          <div className="text-sm">Integrity Score:</div>
                          <div
                            className={`text-xl font-bold ${getScoreColor(
                              profile.riskScore
                            )}`}
                          >
                            {profile.riskScore}/100
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Selected Profile Details */}
                <div className="col-span-1 lg:col-span-3">
                  {selectedProfile && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-lg">
                          {selectedProfile.name} - {selectedProfile.role}
                        </h3>
                        <Button
                          size="sm"
                          className="gap-1"
                          variant="outline"
                          onClick={handleExportDossier}
                        >
                          <Download className="w-4 h-4" />
                          Export Dossier
                        </Button>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Background</h4>
                        <p className="text-sm">{selectedProfile.background}</p>
                      </div>

                      <Separator className="mb-4" />

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Red Flag Events
                        </h4>
                        {selectedProfile.redFlags.length > 0 ? (
                          <div className="overflow-auto">
                            <Table>
                              <TableHeader className="bg-finance-blue">
                                <TableRow>
                                  <TableHead className="text-white">Date</TableHead>
                                  <TableHead className="text-white">Event Type</TableHead>
                                  <TableHead className="text-white">Description</TableHead>
                                  <TableHead className="text-white">Severity</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedProfile.redFlags.map(
                                  (event: RedFlagEvent) => (
                                    <TableRow key={event.id}>
                                      <TableCell>{event.date}</TableCell>
                                      <TableCell>{event.type}</TableCell>
                                      <TableCell>{event.description}</TableCell>
                                      <TableCell>
                                        <Badge
                                          className={getRiskBadgeClass(
                                            event.severity
                                          )}
                                        >
                                          {event.severity}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            No red flag events found.
                          </div>
                        )}
                      </div>

                      <Separator className="mb-4" />

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <FileCheck className="w-4 h-4 mr-1" />
                          Directorships
                        </h4>
                        {selectedProfile.directorships.length > 0 ? (
                          <div className="overflow-auto">
                            <Table>
                              <TableHeader className="bg-finance-blue">
                                <TableRow>
                                  <TableHead className="text-white">Company</TableHead>
                                  <TableHead className="text-white">Role</TableHead>
                                  <TableHead className="text-white">Start Date</TableHead>
                                  <TableHead className="text-white">Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedProfile.directorships.map(
                                  (dir: Directorship) => (
                                    <TableRow key={dir.id}>
                                      <TableCell>{dir.companyName}</TableCell>
                                      <TableCell>{dir.role}</TableCell>
                                      <TableCell>{dir.startDate}</TableCell>
                                      <TableCell>
                                        {dir.isActive ? (
                                          <Badge
                                            variant="default"
                                            className="bg-blue-500"
                                          >
                                            Active
                                          </Badge>
                                        ) : (
                                          <Badge variant="outline">
                                            Inactive
                                          </Badge>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            No directorship data available.
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          // <Card className="mb-6">
          <>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Shield className="mr-2" />
                Leadership Integrity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                No leadership profiles available for this company.
              </div>
            </CardContent>
            </>
          // </Card>
        )}
      </Card>
    </div>
  );
}

export default LeaderShipIntegrityReport;
