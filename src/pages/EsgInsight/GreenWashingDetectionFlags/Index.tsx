import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Download, AlertTriangle, ChevronDown, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  esgCompanies,
  exportFormats,
  greenwashingFlags,
} from "../Sustainability/ESGData";
import { CompanySelector } from "./CompanySelectors";

interface GreenwashingPanelProps {
  companyId?: string;
  selectedCompanyId: string;
  setSelectedCompanyId: React.Dispatch<React.SetStateAction<string>>;
}
function GreenWashingDetectionFlag({
  companyId,
  selectedCompanyId,
  setSelectedCompanyId,
}: GreenwashingPanelProps) {
  const [editedNotes, setEditedNotes] = useState<Record<string, string>>({});

  // Get company data
  const company = esgCompanies.find((c) => c.companyId === companyId);

  // Get greenwashing flags for this company
  const companyFlags = greenwashingFlags.filter(
    (flag) => flag.companyId === companyId
  );

  // Compute greenwashing risk level
  const getGreenwashingRiskLevel = () => {
    const highCount = companyFlags.filter(
      (flag) => flag.severity === "High"
    ).length;
    const mediumCount = companyFlags.filter(
      (flag) => flag.severity === "Medium"
    ).length;

    if (highCount >= 1) return "High";
    if (mediumCount >= 1 || companyFlags.length >= 2) return "Medium";
    return companyFlags.length > 0 ? "Low" : "None";
  };

  // Get color for risk level badge
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const handleExport = (format: string) => {
    toast.success(
      `Exporting Greenwashing report in ${format} format for ${company?.companyName}`
    );
  };

  const handleSaveNotes = (flagId: string) => {
    if (!editedNotes[flagId]) return;

    toast.success("Analyst notes saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* Greenwashing Risk Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">ESG Intelligence</h2>
        <CompanySelector
          companies={esgCompanies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={setSelectedCompanyId}
        />
      </div>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">
              Greenwashing Risk Assessment
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold">{company?.companyName}</h3>
              <p className="text-sm text-muted-foreground">
                {company?.ticker} | {company?.sector}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Badge className={getRiskLevelColor(getGreenwashingRiskLevel())}>
                {getGreenwashingRiskLevel()} Risk
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {companyFlags.length} potential greenwashing flags identified
              </p>
            </div>
          </div>

          {companyFlags.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <AlertTriangle className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="font-medium">No Greenwashing Flags Detected</h3>
              <p className="text-sm mt-1">
                Our system hasn't identified any potential greenwashing
                activities for this company.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Potential Greenwashing Flags</h3>
              </div>
              <div className="grid gap-6">
                {companyFlags.map((flag) => (
                  <Card
                    key={flag.id}
                    className="overflow-hidden border-l-4"
                    style={{
                      borderLeftColor:
                        flag.severity === "High"
                          ? "#ef4444"
                          : flag.severity === "Medium"
                          ? "#f97316"
                          : "#eab308",
                    }}
                  >
                    <CardHeader className="bg-gray-50 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-medium">
                            {flag.title}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            Detected on {flag.dateDetected}
                          </p>
                        </div>
                        <Badge
                          className={
                            flag.severity === "High"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : flag.severity === "Medium"
                              ? "bg-orange-100 text-orange-800 border-orange-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {flag.severity} Severity
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Description</h4>
                          <p className="text-sm mt-1">{flag.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-green-50 rounded-md">
                            <h4 className="text-xs font-medium text-green-800">
                              Company Claim
                            </h4>
                            <p className="text-sm mt-1 italic">
                              "{flag.claimText}"
                            </p>
                          </div>

                          <div className="p-3 bg-red-50 rounded-md">
                            <h4 className="text-xs font-medium text-red-800">
                              Conflicting Evidence
                            </h4>
                            <p className="text-sm mt-1">
                              {flag.conflictingEvidence}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium">Source</h4>
                          <p className="text-sm text-muted-foreground">
                            {flag.source}
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium">
                              Analyst Notes
                            </h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSaveNotes(flag.id)}
                              disabled={!editedNotes[flag.id]}
                            >
                              Save Notes
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Add your analysis and notes here..."
                            className="min-h-[100px] text-sm"
                            defaultValue={flag.analystNotes || ""}
                            onChange={(e) =>
                              setEditedNotes({
                                ...editedNotes,
                                [flag.id]: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default GreenWashingDetectionFlag;
