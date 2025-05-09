import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BusinessAnalysis, MOATType, SWOTItem } from "./BusinessAnalysis";

interface BusinessQualitySectionProps {
  analysis: BusinessAnalysis;
}

export function BusinessQualitySection({ analysis }: BusinessQualitySectionProps) {
  const [moat, setMoat] = useState(analysis.moat);
  const [swot, setSwot] = useState(analysis.swot);
  const [businessModel, setBusinessModel] = useState(analysis.businessModel);

  const handleMoatChange = (index: number, field: string, value: any) => {
    const updatedMoat = [...moat];
    (updatedMoat[index] as any)[field] = value;
    setMoat(updatedMoat);
  };

  const handleAddMoat = () => {
    const newMoat = {
      id: `moat-${Date.now()}`,
      type: 'Brand' as MOATType,
      description: '',
      strength: 'Medium' as 'Low' | 'Medium' | 'High',
      lastUpdated: new Date()
    };
    setMoat([...moat, newMoat]);
  };

  const handleRemoveMoat = (index: number) => {
    const updatedMoat = [...moat];
    updatedMoat.splice(index, 1);
    setMoat(updatedMoat);
  };

  const handleSWOTChange = (category: keyof typeof swot, index: number, value: string) => {
    const items = [...swot[category]];
    items[index] = { ...items[index], text: value, lastUpdated: new Date() };
    setSwot({ ...swot, [category]: items });
  };

  const handleAddSWOTItem = (category: keyof typeof swot) => {
    const newItem: SWOTItem = {
      id: `${category.charAt(0)}-${Date.now()}`,
      text: '',
      lastUpdated: new Date()
    };
    setSwot({ ...swot, [category]: [...swot[category], newItem] });
  };

  const handleRemoveSWOTItem = (category: keyof typeof swot, index: number) => {
    const items = [...swot[category]];
    items.splice(index, 1);
    setSwot({ ...swot, [category]: items });
  };

  const handleBusinessModelChange = (field: keyof typeof businessModel, value: any) => {
    setBusinessModel({ ...businessModel, [field]: value });
  };

  const handleGenerateAIDraft = (section: string) => {
    toast({
      title: "AI Draft Generated",
      description: `${section} has been populated with AI-generated content based on ${analysis.companyName}'s data.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* MOAT Analysis Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-finance-purple">MOAT Analysis</h2>
          <Button 
            variant="outline" 
            className="border-finance-purple text-finance-purple hover:bg-finance-purple/10"
            onClick={() => handleGenerateAIDraft("MOAT Analysis")}
          >
            <Wand2 className="mr-2 h-4 w-4" /> AI Draft
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {moat.map((item, index) => (
            <Card key={item.id} className="bg-white hover:shadow-sm transition-shadow duration-300">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-md font-medium">MOAT Factor {index + 1}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveMoat(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 px-4 pt-0 pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`moat-type-${index}`}>MOAT Type</Label>
                    <Select
                      value={item.type}
                      onValueChange={(value) => handleMoatChange(index, 'type', value as MOATType)}
                    >
                      <SelectTrigger id={`moat-type-${index}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cost">Cost Advantage</SelectItem>
                        <SelectItem value="Network">Network Effect</SelectItem>
                        <SelectItem value="Brand">Brand Power</SelectItem>
                        <SelectItem value="Scale">Economies of Scale</SelectItem>
                        <SelectItem value="Switching">Switching Cost</SelectItem>
                        <SelectItem value="Process">Process Power</SelectItem>
                        <SelectItem value="Regulatory">Regulatory Advantage</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`moat-strength-${index}`}>Competitive Strength</Label>
                    <Select
                      value={item.strength}
                      onValueChange={(value) => handleMoatChange(index, 'strength', value as 'Low' | 'Medium' | 'High')}
                    >
                      <SelectTrigger id={`moat-strength-${index}`}>
                        <SelectValue placeholder="Select strength" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`moat-description-${index}`}>Description</Label>
                  <Textarea 
                    id={`moat-description-${index}`}
                    value={item.description}
                    onChange={(e) => handleMoatChange(index, 'description', e.target.value)}
                    placeholder="Describe this competitive advantage..."
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center py-6 border-dashed"
            onClick={handleAddMoat}
          >
            <Plus className="mr-2 h-4 w-4" /> Add MOAT Factor
          </Button>
        </div>
      </div>
      
      {/* SWOT Analysis Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-finance-green">SWOT Analysis</h2>
          <Button 
            variant="outline" 
            className="border-finance-green text-finance-green hover:bg-finance-green/10"
            onClick={() => handleGenerateAIDraft("SWOT Analysis")}
          >
            <Wand2 className="mr-2 h-4 w-4" /> AI Draft
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <Card className="bg-white hover:shadow-sm transition-shadow duration-300 border-t-4 border-t-finance-green">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {swot.strengths.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input 
                    value={item.text}
                    onChange={(e) => handleSWOTChange('strengths', index, e.target.value)}
                    placeholder="Enter a strength..."
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveSWOTItem('strengths', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border border-dashed bg-muted/30 hover:bg-muted/50 justify-center"
                onClick={() => handleAddSWOTItem('strengths')}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Strength
              </Button>
            </CardContent>
          </Card>
          
          {/* Weaknesses */}
          <Card className="bg-white hover:shadow-sm transition-shadow duration-300 border-t-4 border-t-finance-red">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Weaknesses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {swot.weaknesses.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input 
                    value={item.text}
                    onChange={(e) => handleSWOTChange('weaknesses', index, e.target.value)}
                    placeholder="Enter a weakness..."
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveSWOTItem('weaknesses', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border border-dashed bg-muted/30 hover:bg-muted/50 justify-center"
                onClick={() => handleAddSWOTItem('weaknesses')}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Weakness
              </Button>
            </CardContent>
          </Card>
          
          {/* Opportunities */}
          <Card className="bg-white hover:shadow-sm transition-shadow duration-300 border-t-4 border-t-finance-teal">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {swot.opportunities.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input 
                    value={item.text}
                    onChange={(e) => handleSWOTChange('opportunities', index, e.target.value)}
                    placeholder="Enter an opportunity..."
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveSWOTItem('opportunities', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border border-dashed bg-muted/30 hover:bg-muted/50 justify-center"
                onClick={() => handleAddSWOTItem('opportunities')}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Opportunity
              </Button>
            </CardContent>
          </Card>
          
          {/* Threats */}
          <Card className="bg-white hover:shadow-sm transition-shadow duration-300 border-t-4 border-t-finance-orange">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Threats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {swot.threats.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input 
                    value={item.text}
                    onChange={(e) => handleSWOTChange('threats', index, e.target.value)}
                    placeholder="Enter a threat..."
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveSWOTItem('threats', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full border border-dashed bg-muted/30 hover:bg-muted/50 justify-center"
                onClick={() => handleAddSWOTItem('threats')}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Threat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Business Model Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-finance-blue">Business Model</h2>
          <Button 
            variant="outline" 
            className="border-finance-blue text-finance-blue hover:bg-finance-blue/10"
            onClick={() => handleGenerateAIDraft("Business Model")}
          >
            <Wand2 className="mr-2 h-4 w-4" /> AI Draft
          </Button>
        </div>
        
        <Card className="bg-white hover:shadow-sm transition-shadow duration-300">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-narrative">Business Narrative</Label>
              <Textarea 
                id="business-narrative"
                value={businessModel.narrative}
                onChange={(e) => handleBusinessModelChange('narrative', e.target.value)}
                placeholder="Describe the company's business model..."
                rows={5}
                className="resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Revenue Sources</Label>
              <div className="space-y-3">
                {businessModel.revenueSources.map((source, index) => (
                  <div key={source.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <Input 
                      value={source.category}
                      onChange={(e) => {
                        const updated = [...businessModel.revenueSources];
                        updated[index] = { ...updated[index], category: e.target.value };
                        handleBusinessModelChange('revenueSources', updated);
                      }}
                      placeholder="Category"
                      className="sm:col-span-3"
                    />
                    <Input 
                      value={source.description}
                      onChange={(e) => {
                        const updated = [...businessModel.revenueSources];
                        updated[index] = { ...updated[index], description: e.target.value };
                        handleBusinessModelChange('revenueSources', updated);
                      }}
                      placeholder="Description"
                      className="sm:col-span-7"
                    />
                    <Input 
                      type="number"
                      value={source.percentage}
                      onChange={(e) => {
                        const updated = [...businessModel.revenueSources];
                        updated[index] = { ...updated[index], percentage: Number(e.target.value) };
                        handleBusinessModelChange('revenueSources', updated);
                      }}
                      placeholder="%"
                      className="sm:col-span-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
