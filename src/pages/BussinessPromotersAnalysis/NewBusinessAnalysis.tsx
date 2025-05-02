import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, ChevronLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { businessAnalysisSamples, companiesList } from "./BusinessAnalysisData";
import { BusinessAnalysis } from "./BusinessAnalysis";
import BackGroundImage1 from "../../asset/cardbackground.jpg";

export default function NewBusinessAnalysisPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedCompanyId = searchParams.get("company");
  
  const [companyId, setCompanyId] = useState(preselectedCompanyId || "");
  const [saving, setSaving] = useState(false);

  // Find the selected company details
  const selectedCompany = companiesList.find(c => c.id === companyId);
  
  const handleCreateAnalysis = () => {
    if (!companyId || !selectedCompany) {
      toast({
        title: "Selection required",
        description: "Please select a company to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    
    // Generate a new unique ID for the analysis
    const newId = `ba-${(businessAnalysisSamples.length + 1).toString().padStart(3, '0')}`;
    
    // Create an empty business analysis structure
    const newAnalysis: BusinessAnalysis = {
      id: newId,
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      sector: selectedCompany.sector,
      createdAt: new Date(),
      updatedAt: new Date(),
      moat: [],
      swot: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      },
      businessModel: {
        narrative: "",
        revenueSources: [],
        valueChain: []
      },
      promoterHolding: [],
      insiderTransactions: [],
      pledgingData: [],
      redFlags: [],
      remuneration: [],
      boardMembers: [],
      relatedPartyTransactions: [],
      governanceScore: {
        overall: 50,
        boardIndependence: 50,
        auditQuality: 50,
        disclosureQuality: 50,
        relatedPartyTransactions: 50,
        shareholderRights: 50
      },
      analystComments: [],
      versions: [
        {
          id: `ver-${Date.now()}`,
          name: "Initial Draft",
          timestamp: new Date(),
          createdBy: "Current Analyst",
          tags: ["draft", "new"],
          isPublic: false
        }
      ],
      peerComparisons: [],
      linkedReportIds: []
    };
    
    // Add the new analysis to the samples (in a real app, this would be an API call)
    businessAnalysisSamples.push(newAnalysis);
    
    // Simulate API delay
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Analysis created",
        description: `New business analysis for ${selectedCompany.name} created successfully.`,
      });
      // Navigate to the newly created analysis
      navigate(`/dashboard/business-promoter-analysis/${newId}`);
    }, 800);
  };
  
  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4"
         style={{
            backgroundImage: `url(${BackGroundImage1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div >
            <div className="flex items-center gap-2">
              <Link to="/dashboard/business-promoter-analysis">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-finance-blue to-finance-purple bg-clip-text">
                New Business Analysis
              </h1>
            </div>
            <p className="text-muted-foreground ml-10 mt-1">
              Create a new business quality and promoter behavior analysis
            </p>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-t-4 border-t-finance-purple">
            <CardHeader>
              <CardTitle>Select Company</CardTitle>
              <CardDescription>
                Choose the company you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select value={companyId} onValueChange={setCompanyId}>
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companiesList.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name} ({company.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCompany && (
                <div className="mt-6 p-4 bg-finance-purple/5 border border-finance-purple/20 rounded-md">
                  <h3 className="text-lg font-medium mb-2">{selectedCompany.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ticker:</span>
                      <span className="ml-2 font-medium">{selectedCompany.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sector:</span>
                      <span className="ml-2 font-medium">{selectedCompany.sector}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleCreateAnalysis} 
                className="bg-finance-blue hover:bg-finance-blue/90"
                disabled={!companyId || saving}
              >
                {saving ? (
                  <>Creating...</>
                ) : (
                  <>
                    Create Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What you'll be analyzing</CardTitle>
              <CardDescription>
                Business & Promoter Analysis components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-md bg-finance-purple/5">
                  <div className="h-8 w-8 rounded-full bg-finance-purple flex items-center justify-center text-white">1</div>
                  <div>
                    <h3 className="font-medium">Business Quality</h3>
                    <p className="text-sm text-muted-foreground">MOAT analysis, SWOT matrix, and business model assessment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-md bg-finance-gold/5">
                  <div className="h-8 w-8 rounded-full bg-finance-gold flex items-center justify-center text-white">2</div>
                  <div>
                    <h3 className="font-medium">Promoter & Insider Analysis</h3>
                    <p className="text-sm text-muted-foreground">Track shareholding patterns, insider trades, and pledging</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-md bg-finance-red/5">
                  <div className="h-8 w-8 rounded-full bg-finance-red flex items-center justify-center text-white">3</div>
                  <div>
                    <h3 className="font-medium">Governance & Red Flags</h3>
                    <p className="text-sm text-muted-foreground">Board analysis, related party transactions, and governance scoring</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-md bg-finance-teal/5">
                  <div className="h-8 w-8 rounded-full bg-finance-teal flex items-center justify-center text-white">4</div>
                  <div>
                    <h3 className="font-medium">Peer Comparisons</h3>
                    <p className="text-sm text-muted-foreground">Benchmark against sector peers with visual insights</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
