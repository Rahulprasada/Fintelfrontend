import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Divider, styled } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowBigLeft, ChevronLeft} from "lucide-react";
import BackGroundImage1 from "../../asset/cardbackground.jpg";

type TemplateType = "standard" | "minimal" | "blank";

interface Template {
  id: TemplateType;
  name: string;
  description: string;
}

const templates: Template[] = [
  {
    id: "standard",
    name: "Standard Earnings Template",
    description:
      "Complete template with investment thesis, financial analysis, valuation, and risks sections.",
  },
  {
    id: "minimal",
    name: "Minimal Template",
    description:
      "Basic template with just the essential sections needed for a quick report.",
  },
  {
    id: "blank",
    name: "Blank Template",
    description: "Start from scratch with a clean slate.",
  },
];

const reportTypes = [
  { id: "earnings", name: "Earnings Update" },
  { id: "initiation", name: "Initiation of Coverage" },
  { id: "event", name: "Event Analysis" },
  { id: "quick", name: "Quick Take" },
  { id: "custom", name: "Custom" },
];

const sectors = [
  "IT Services",
  "Banking",
  "Pharmaceuticals",
  "Automotive",
  "Energy",
  "Telecom",
  "Consumer Goods",
  "Manufacturing",
];

export default function NewReportForm() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null
  );
  const [reportType, setReportType] = useState<string>("");
  const [sector, setSector] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    toast.success("Report created successfully!");
    navigate("../1");
  };

  return (
    <div>
      <MainCard1
        style={{
          backgroundImage: `url(${BackGroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mb-1  pb-2">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <ChevronLeft
              size={25}
              onClick={() =>  navigate("/dashboard/equity-research-report")}
              cursor={"pointer"}
              className="mr-2"
            />
            <Divider orientation="vertical" flexItem  />
            <div className="col ml-4">
              <h1 className="text-2xl font-bold text-finance-blue">
                Create New Report
              </h1>
              <p className="text-gray-500 mt-1">
                Set up the basic details for your new equity research report.
              </p>
            </div>
          </Box>
        </div>
      </MainCard1>
      <MainCard>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company Name
              </Label>
              <Input
                id="company"
                placeholder="e.g. Infosys Ltd"
                required
                className="bg-white border-gray-200 focus:border-finance-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-medium">
                Ticker Symbol
              </Label>
              <Input
                id="ticker"
                placeholder="e.g. INFY.NS"
                required
                className="bg-white border-gray-200 focus:border-finance-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportType" className="text-sm font-medium">
                Report Type
              </Label>
              <Select value={reportType} onValueChange={setReportType} required>
                <SelectTrigger
                  id="reportType"
                  className="bg-white border-gray-200"
                >
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector" className="text-sm font-medium">
                Sector
              </Label>
              <Select value={sector} onValueChange={setSector} required>
                <SelectTrigger id="sector" className="bg-white border-gray-200">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Report Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Q4 FY25 Earnings Update"
                required
                className="bg-white border-gray-200 focus:border-finance-blue"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Brief Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description of what this report will cover..."
                rows={3}
                className="bg-white border-gray-200 focus:border-finance-blue"
              />
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-semibold text-finance-blue">
              Select a Template
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all shadow-sm
                    ${
                      selectedTemplate === template.id
                        ? "border-finance-blue bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow"
                    }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h4 className="font-medium mb-2 text-gray-800">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 mt-8 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-finance-blue hover:bg-blue-800 text-white font-medium"
            >
              Create Report
            </Button>
          </div>
        </form>
      </MainCard>
    </div>
  );
}

const MainCard = styled(Card)`
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: #fcfcfc;
`;

const MainCard1 = styled(Card)`
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: #fcfcfc;
  margin-bottom: 10px;
`;
