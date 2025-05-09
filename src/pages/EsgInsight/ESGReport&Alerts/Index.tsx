import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Download,
  BellRing,
  ChevronDown,
  FileText,
  Clock,
  Check,
  X,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  esgAlertConfigs,
  esgAlerts,
  esgCompanies,
  exportFormats,
} from "../Sustainability/ESGData";
import { CompanySelector } from "../GreenWashingDetectionFlags/CompanySelectors";

interface ESGAlertsPanelProps {
  companyId: string;
  selectedCompanyId: string;
  setSelectedCompanyId: React.Dispatch<React.SetStateAction<string>>;
}

export function ESGAlertsPanel({
  companyId,
  selectedCompanyId,
  setSelectedCompanyId,
}: ESGAlertsPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("PDF");
  const [showBrandLogo, setShowBrandLogo] = useState<boolean>(true);
  const [includeNotes, setIncludeNotes] = useState<boolean>(true);
  const [emailRecipients, setEmailRecipients] = useState<string>("");
  const [reportFrequency, setReportFrequency] = useState<string>("Monthly");

  // Get company data
  const company = esgCompanies.find((c) => c.companyId === companyId);

  // Get all alerts and filter for this company if a specific one is selected
  const companyAlerts =
    companyId !== "all"
      ? esgAlerts.filter((alert) => alert.companyId === companyId)
      : esgAlerts;

  const handleExport = () => {
    toast.success(`Exporting ESG report as ${selectedFormat}`);
  };

  const handleScheduleReport = () => {
    if (!emailRecipients) {
      toast.error("Please enter at least one email recipient");
      return;
    }

    toast.success(`${reportFrequency} ESG report scheduled successfully`);
  };

  const handleAlertToggle = (configId: string, active: boolean) => {
    toast.success(`Alert ${active ? "enabled" : "disabled"}`);
  };

  const handleMarkAsRead = (alertId: string) => {
    toast.success("Alert marked as read");
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "ScoreDrop":
        return "bg-red-100 text-red-800 border-red-200";
      case "Controversy":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "RiskChange":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "GreenwashingFlag":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <h2 className="text-2xl font-bold">ESG Intelligence</h2>
    <CompanySelector
      companies={esgCompanies}
      selectedCompanyId={selectedCompanyId}
      onSelectCompany={setSelectedCompanyId}
    />
  </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     <div className="col-span-1 lg:col-span-2 space-y-6">
        {/* Alerts List */}
        <Card style={{ background: "linear-gradient(to top, #fafffc, #fffcfc)" }}>
          <CardHeader className="pb-2 ">
            <div className="flex justify-between items-center bg-slate-200 p-4 rounded-md">
              <CardTitle className="text-lg font-bold">
                Recent ESG Alerts
              </CardTitle>
              <Badge variant="outline" className="bg-gray-50">
                {companyAlerts.filter((a) => !a.viewed).length} New
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {companyAlerts.length > 0 ? (
              <div className="space-y-4">
                {companyAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-md border ${
                      !alert.viewed
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {!alert.viewed && (
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                          )}
                          {alert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {alert.companyName}
                        </p>
                      </div>
                      <Badge className={getAlertTypeColor(alert.eventType)}>
                        {alert.eventType === "ScoreDrop"
                          ? "Score Drop"
                          : alert.eventType === "Controversy"
                          ? "Controversy"
                          : alert.eventType === "RiskChange"
                          ? "Risk Change"
                          : "Greenwashing"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">{alert.description}</p>
                    <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {alert.date}
                      </div>
                      {!alert.viewed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleMarkAsRead(alert.id)}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <BellRing className="h-12 w-12 mb-2 text-gray-300" />
                <h3 className="font-medium">No alerts yet</h3>
                <p className="text-sm">
                  You'll be notified here when ESG events occur for your
                  monitored companies.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export ESG Reports */}
        <Card style={{ background: "linear-gradient(to top, #ebf5ef, #fffcfc)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold bg-slate-200 p-4 rounded-md">
              Export ESG Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div  className="p-4 bg-pink-50 border-2 border-red-50 rounded-md">
                <h3 className="text-sm font-medium mb-4">Report Options</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedFormat}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px]">
                        {exportFormats.map((format) => (
                          <DropdownMenuItem
                            key={format}
                            onClick={() => setSelectedFormat(format)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {format}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-branding" className="flex-1">
                      Include branding/logo
                    </Label>
                    <Switch
                      id="include-branding"
                      checked={showBrandLogo}
                      onCheckedChange={setShowBrandLogo}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-notes" className="flex-1">
                      Include analyst notes
                    </Label>
                    <Switch
                      id="include-notes"
                      checked={includeNotes}
                      onCheckedChange={setIncludeNotes}
                    />
                  </div>
                </div>

                <Button className="mt-6 w-full" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Now
                </Button>
              </div>

              <div className="p-4 bg-yellow-50 border-2 border-red-50 rounded-md">
                <h3 className="text-sm font-medium mb-4">
                  Schedule Regular Reports
                </h3>

                <div className="space-y-4 ">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {reportFrequency}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px]">
                        <DropdownMenuItem
                          onClick={() => setReportFrequency("Weekly")}
                        >
                          Weekly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setReportFrequency("Monthly")}
                        >
                          Monthly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setReportFrequency("Quarterly")}
                        >
                          Quarterly
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Recipients</Label>
                    <Input
                      placeholder="email@example.com, another@example.com"
                      value={emailRecipients}
                      onChange={(e) => setEmailRecipients(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate multiple emails with commas
                    </p>
                  </div>
                </div>

                <Button className="mt-6 w-full" onClick={handleScheduleReport}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Settings */}
      <div className="col-span-1">
        <Card className="sticky top-6">
          <CardHeader className="pb-2 bg-slate-50 border-t-8 border-t-red-500 rounded-lg">
            <CardTitle className="text-lg font-bold">
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex-1 font-medium">
                  Alert Notifications
                </Label>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {esgAlertConfigs.map((config) => (
                  <AccordionItem key={config.id} value={config.id}>
                    <AccordionTrigger className="hover:bg-gray-50 rounded-md px-3">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{config.name}</span>
                        <Switch
                          checked={config.active}
                          onCheckedChange={(active) =>
                            handleAlertToggle(config.id, active)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      <div className="space-y-3 py-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Alert Type
                          </span>
                          <span>
                            {config.type === "ScoreDrop"
                              ? "Score Drop"
                              : config.type === "Controversy"
                              ? "Controversy"
                              : config.type === "RiskChange"
                              ? "Risk Change"
                              : "Greenwashing"}
                          </span>
                        </div>

                        {config.threshold && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Threshold
                            </span>
                            <span>{config.threshold} points</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target</span>
                          <span>
                            {config.targetCompanies === "all"
                              ? "All Companies"
                              : `${config.targetCompanies.length} Companies`}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Email Notification
                          </span>
                          <span>
                            {config.emailNotification ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-600" />
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            App Notification
                          </span>
                          <span>
                            {config.appNotification ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-600" />
                            )}
                          </span>
                        </div>

                        <Button size="sm" className="w-full mt-2">
                          Edit Alert
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
            Last alert: 2 hours ago
          </CardFooter>
        </Card>
      </div>
    </div>
    </div>
  );
}
