import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartBar,
  ChartPie,
  FileText,
  Users,
  PlusCircle,
  X,
  Copy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MODEL_TEMPLATES, ModelTemplate, ModelType } from "./ValuationModel";
import type { ValuationModel } from "./ValuationModel";

interface ValuationModelSelectorProps {
  onModelCreated: (modelId: string) => void;
  setStep: any;
  step: any;
}

export default function ValuationModelSelector({
  onModelCreated,
  setStep,
  step
}: ValuationModelSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<ModelTemplate | null>(null);
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [analyst, setAnalyst] = useState("Rohit Sharma"); // Default analyst
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
 
  const [templateFilter, setTemplateFilter] = useState<string>("all");

  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case "chart-bar":
        return <ChartBar className="h-8 w-8 mb-2" />;
      case "chart-pie":
        return <ChartPie className="h-8 w-8 mb-2" />;
      case "users":
        return <Users className="h-8 w-8 mb-2" />;
      case "file-text":
      default:
        return <FileText className="h-8 w-8 mb-2" />;
    }
  };

  const handleCreateModel = () => {
    if (!selectedTemplate) return;

    // In a real app, this would call an API to create the model
    const newModel: ValuationModel = {
      id: `model-${Date.now()}`,
      name: modelName || `${company} - ${selectedTemplate.name}`,
      type: selectedTemplate.id as ModelType,
      company,
      sector,
      analyst,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDraft: true,
      assumptions: selectedTemplate.defaultAssumptions || {},
    };

    // For now, we'll just simulate saving the model
    console.log("Creating model:", newModel);

    // In a real app, you would store this in a database
    // And receive the ID from the server
    onModelCreated(newModel.id);
  };

  const isFormValid = () => {
    return selectedTemplate && company.trim() !== "" && modelName.trim() !== "";
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const templatesByCategory = {
    all: MODEL_TEMPLATES,
    dcf: MODEL_TEMPLATES.filter((t) => t.id.includes("dcf")),
    multiple: MODEL_TEMPLATES.filter(
      (t) => t.id === "pe-multiple" || t.id === "ev-ebitda"
    ),
    comparables: MODEL_TEMPLATES.filter((t) => t.id === "comparables"),
    custom: MODEL_TEMPLATES.filter((t) => t.id === "custom"),
  };

  const displayedTemplates =
    templatesByCategory[templateFilter as keyof typeof templatesByCategory] ||
    templatesByCategory.all;

  // Predefined sectors for dropdown
  const sectors = [
    "IT",
    "Banking",
    "Automotive",
    "Oil & Gas",
    "Pharmaceuticals",
    "FMCG",
    "Real Estate",
    "Telecom",
    "Infrastructure",
    "Other",
  ];

  return (
    <div className="py-2 space-y-2 animate-fade-in">
      {step === "select-template" ? (
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
              Select a Valuation Model Template
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2">
              <Button
                variant={templateFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setTemplateFilter("all")}
              >
                All
              </Button>
              <Button
                variant={templateFilter === "dcf" ? "default" : "outline"}
                size="sm"
                onClick={() => setTemplateFilter("dcf")}
              >
                DCF
              </Button>
              <Button
                variant={templateFilter === "multiple" ? "default" : "outline"}
                size="sm"
                onClick={() => setTemplateFilter("multiple")}
              >
                Multiples
              </Button>
              <Button
                variant={
                  templateFilter === "comparables" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setTemplateFilter("comparables")}
              >
                Comparables
              </Button>
              <Button
                variant={templateFilter === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => setTemplateFilter("custom")}
              >
                Custom
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer hover:border-primary transition-colors ${
                  selectedTemplate?.id === template.id
                    ? "border-primary border-2"
                    : ""
                }`}
                onClick={() => setSelectedTemplate(template)}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e0f2fe, #ffffff)",
                }}
              >
                <CardHeader className="flex items-center">
                  <div className="flex flex-col items-center text-center">
                    {getModelIcon(template.icon)}
                    <CardTitle>{template.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {template.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant={
                      selectedTemplate?.id === template.id
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setStep("configure-model");
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Select Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Configure {selectedTemplate?.name} Model
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="self-start sm:self-auto"
              onClick={() => setStep("select-template")}
            >
              Back to Templates
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                {selectedTemplate && getModelIcon(selectedTemplate.icon)}
                <CardTitle className="text-lg sm:text-xl">
                  Configure {selectedTemplate?.name} Model
                </CardTitle>
              </div>
              <CardDescription>
                Add metadata and details for your valuation model
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="modelName">Model Name*</Label>
                    <Input
                      id="modelName"
                      placeholder="e.g., TCS - Q4 2024 DCF"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive name for your model
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company*</Label>
                    <Input
                      id="company"
                      placeholder="e.g., TCS"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector*</Label>
                    <Select value={sector} onValueChange={setSector}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sectorOption) => (
                          <SelectItem key={sectorOption} value={sectorOption}>
                            {sectorOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analyst">Analyst</Label>
                    <Input
                      id="analyst"
                      placeholder="e.g., Rohit Sharma"
                      value={analyst}
                      onChange={(e) => setAnalyst(e.target.value)}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the valuation model and its purpose..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 px-3 py-1"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      id="tags"
                      placeholder="Add tag and press Enter"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                    <p className="text-xs text-muted-foreground">
                      Common tags: Q4 2025, Bull Case, Bear Case, Base Case
                    </p>
                  </div>

                  <div className="border rounded-md p-3 bg-muted/50 space-y-2 mt-5">
                    <h4 className="font-medium">Template information</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTemplate?.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-medium">Default assumptions:</span>
                      <Badge variant="outline">
                        {selectedTemplate?.id === "dcf-2stage"
                          ? "2-stage growth"
                          : selectedTemplate?.id === "dcf-3stage"
                          ? "3-stage growth"
                          : selectedTemplate?.id === "pe-multiple"
                          ? "P/E multiple"
                          : selectedTemplate?.id === "ev-ebitda"
                          ? "EV/EBITDA"
                          : "Custom"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6">
              <div className="text-sm text-muted-foreground">
                * Required fields
              </div>
              <div className="flex gap-3 self-end sm:self-auto">
                <Button
                  variant="outline"
                  onClick={() => setStep("select-template")}
                >
                  Back
                </Button>
                <Button onClick={handleCreateModel} disabled={!isFormValid()}>
                  Create Model
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
