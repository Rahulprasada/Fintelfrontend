import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Save, Download, LinkIcon, Clock, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { BusinessQualitySection } from "./BusinessQualitySection";
import { PromoterAnalysisSection } from "./PromoterAnalysisSection";
import { GovernanceSection } from "./GovernanceSection";
import { PeerComparisonSection } from "./PeerComparisonSection";
import { BusinessAnalysis } from "./BusinessAnalysis";
import { getBusinessAnalysisById } from "./BusinessAnalysisData";

export default function BusinessAnalysisEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [analysis] = useState<BusinessAnalysis | undefined>(id ? getBusinessAnalysisById(id) : undefined);
  const [activeTab, setActiveTab] = useState("quality");
  const [saving, setSaving] = useState(false);

  if (!analysis) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Analysis Not Found
          </h2>
          <p className="text-gray-500 mb-4">
            The business analysis you're looking for doesn't exist or has been
            removed.
          </p>
          <Link to="/business-analysis">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Business Analysis
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Analysis saved",
        description: `${analysis.companyName} business analysis saved successfully.`,
      });
    }, 1000);
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your analysis is being exported to PDF.",
    });
  };

  const handleLinkToReport = () => {
    toast({
      title: "Analysis linked",
      description: "This analysis has been linked to your research report.",
    });
  };

  const handleVersionHistory = () => {
    // Show version history modal
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link to="/dashboard/business-promoter-analysis">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-finance-blue to-finance-purple bg-clip-text">
                {analysis.companyName}
              </h1>
            </div>
            <p className="text-muted-foreground ml-10 mt-1">
              {analysis.companyId} • {analysis.sector}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end md:self-auto ml-10 md:ml-0">
            <Button
              onClick={handleSave}
              className="bg-finance-blue hover:bg-finance-blue/90"
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>

              <Button variant="outline" onClick={handleLinkToReport}>
                <LinkIcon className="mr-2 h-4 w-4" />
                Link to Report
              </Button>

              <Button variant="outline" onClick={handleVersionHistory}>
                <Clock className="mr-2 h-4 w-4" />
                Versions
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <Card className="border-t-4 border-t-finance-purple">
          <Tabs
            defaultValue="quality"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-4 pt-4">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                <TabsTrigger
                  value="quality"
                  className="py-3 data-[state=active]:bg-finance-red/10"
                >
                  Business Quality
                </TabsTrigger>
                <TabsTrigger
                  value="promoter"
                  className="py-3 data-[state=active]:bg-finance-red/10"
                >
                  Promoter & Insiders
                </TabsTrigger>
                <TabsTrigger
                  value="governance"
                  className="py-3 data-[state=active]:bg-finance-red/10"
                >
                  Governance & Red Flags
                </TabsTrigger>
                <TabsTrigger
                  value="peers"
                  className="py-3 data-[state=active]:bg-finance-red/10"
                >
                  Peer Benchmarking
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="quality" className="p-4 animate-fade">
              <BusinessQualitySection analysis={analysis} />
            </TabsContent>

            <TabsContent value="promoter" className="p-4 animate-fade">
              <PromoterAnalysisSection analysis={analysis} />
            </TabsContent>

            <TabsContent value="governance" className="p-4 animate-fade">
              <GovernanceSection analysis={analysis} />
            </TabsContent>

            <TabsContent value="peers" className="p-4 animate-fade">
              <PeerComparisonSection analysis={analysis} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

