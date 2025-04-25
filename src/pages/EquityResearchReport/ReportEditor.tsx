import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Save,
  ChevronLeft,
  FileText,
  Send,
  Download,
  MessagesSquare,
  History,
  ChevronDown,
  Play,
  PlusCircle,
  Table,
  BarChart,
  Sparkles,
} from "lucide-react";
import ReportSection from "./ReportSection";
import ExportOptions from "./ExportOption";
import { Divider } from "@mui/material";
import BackGroundImage1 from "../../asset/cardbackground.jpg";

interface EditorProps {
  reportId: string;
}

const mockSections = [
  {
    id: "thesis",
    title: "Investment Thesis",
    content: "Despite near-term headwinds from North America, Infosys remains well-positioned to benefit from digital transformation initiatives. We maintain a positive long-term view based on the company's strong delivery capabilities, strategic acquisitions, and leadership in AI implementation.",
    status: "draft",
    comments: [
      {
        id: "c1",
        user: "Sanjana Patel",
        text: "Can we add more details about their AI strategy here?",
        timestamp: "2 hours ago",
        resolved: false,
      }
    ]
  },
  {
    id: "financials",
    title: "Key Financials",
    content: "Q4FY25 revenue grew 4.8% YoY, with EBIT margin declining 40bps to 20.2% due to wage hikes and FX volatility. Revenue from digital services increased to 59.4% of total revenue, up from 54.5% in the same period last year.",
    status: "approved",
    comments: []
  },
  {
    id: "valuation",
    title: "Valuation Update",
    content: "We revise our target price to ₹1,850, implying a 10% upside from current levels. Our valuation is based on 22x FY26E EPS, in line with the stock's 5-year average forward P/E multiple.",
    status: "review",
    comments: [
      {
        id: "c2",
        user: "Sanjana Patel",
        text: "Please justify why you moved from 20x to 22x PE multiple.",
        timestamp: "1 hour ago",
        resolved: false,
      }
    ]
  },
  {
    id: "risks",
    title: "Risks & Outlook",
    content: "Key risks include delayed deal closures, currency headwinds, and higher subcontracting costs. Additionally, margin pressure may persist in the near term as the company continues to invest in capabilities and talent.",
    status: "draft",
    comments: []
  }
];

export default function ReportEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sections, setSections] = useState(mockSections);
  const [activeTab, setActiveTab] = useState("edit");
  
  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };
  
  const handleSubmitForReview = () => {
    toast.success("Report submitted for review");
    navigate("/");
  };

  const handleAddSection = () => {
    const newSection = {
      id: `section-${sections.length + 1}`,
      title: `New Section ${sections.length + 1}`,
      content: "Add your content here...",
      status: "draft",
      comments: []
    };
    setSections([...sections, newSection]);
    toast.success("New section added");
  };
  
  const generateSection = (sectionId: string) => {
    // In a real implementation, this would call the LLM API
    toast.success(`Generating ${sectionId} section...`);
    
    // For demo purposes, we'll just update the sections after a timeout
    setTimeout(() => {
      setSections(prev => 
        prev.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content + " [AI generated content would appear here with more detailed analysis based on financial data and market trends.]"
            };
          }
          return section;
        })
      );
      toast.success(`Generated ${sectionId} section successfully`);
    }, 1500);
  };
  
  
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-slate-200 p-3 sm:p-4 rounded-lg gap-4"
        style={{
          backgroundImage: `url(${BackGroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center">
            <ChevronLeft
              size={20}
              onClick={() => navigate(-1)}
              cursor={"pointer"}
              className="mr-2"
            />
            <Divider orientation="vertical" flexItem/>
          </div>
          <div className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold truncate">Q4 FY25 Earnings Update</h1>
              <Badge variant="outline" className="self-start sm:self-auto">Draft</Badge>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
              <FileText size={12} className="mr-1 flex-shrink-0" />
              <span className="truncate">Infosys Ltd (INFY.NS) • IT Services</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveDraft}>
            <Save size={16} className="mr-2" />
            Save Draft
          </Button>
          
          <ExportOptions 
            reportId={id} 
            reportTitle="Q4 FY25 Earnings Update"
          />
          
          <Button size="sm" className="bg-finance-blue hover:bg-blue-800" onClick={handleSubmitForReview}>
            <Send size={16} className="mr-2" />
            Submit for Review
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <MessagesSquare size={16} className="mr-2" />
                  View Comments
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <History size={16} className="mr-2" />
                  Version History
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="bg-white border rounded-t-lg">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger value="edit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-finance-blue data-[state=active]:bg-white px-2 py-2">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-finance-blue data-[state=active]:bg-white px-2 py-2">
              Preview
            </TabsTrigger>
            <TabsTrigger value="comments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-finance-blue data-[state=active]:bg-white px-2 py-2">
              Comments
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="flex-1 overflow-auto mt-0 bg-white border border-t-0 rounded-b-lg p-6">
          <div className="flex justify-end mb-4 gap-2">
            <Button variant="outline" size="sm" onClick={handleAddSection}>
              <PlusCircle size={14} className="mr-2" />
              Add Section
            </Button>
            <Button variant="outline" size="sm">
              <Table size={14} className="mr-2" />
              Insert Table
            </Button>
            <Button variant="outline" size="sm">
              <BarChart size={14} className="mr-2" />
              Add Chart
            </Button>
          </div>
          
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div key={section.id}>
                {idx > 0 && <Separator className="my-8" />}
                <ReportSection
                  section={section}
                  onGenerate={() => generateSection(section.id)}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 overflow-auto mt-0 bg-white border border-t-0 rounded-b-lg p-8">
          <div className="max-w-4xl mx-auto editor-content">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Q4 FY25 Earnings Update</h1>
              <p className="text-xl">Infosys Ltd (INFY.NS)</p>
              <p className="text-gray-500">April 23, 2025</p>
            </div>
            
            {sections.map((section, idx) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="comments" className="flex-1 overflow-auto mt-0 bg-white border border-t-0 rounded-b-lg p-6">
          <div className="space-y-6">
            <h3 className="font-semibold">All Comments</h3>
            
            {sections.flatMap(section => 
              section.comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{comment.user}</p>
                      <p className="text-sm text-gray-500">Section: {section.title}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {comment.resolved ? "Resolved" : "Open"}
                    </Badge>
                  </div>
                  <p className="mb-2">{comment.text}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{comment.timestamp}</span>
                    <Button variant="ghost" size="sm">Resolve</Button>
                  </div>
                </div>
              ))
            )}
            
            {sections.flatMap(section => section.comments).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No comments yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
