import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import InsertContentToolbar from "./InsertContentToolBar";

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

interface Section {
  id: string;
  title: string;
  content: string;
  status: string;
  comments: Comment[];
}

interface ReportSectionProps {
  section: Section;
  onGenerate: () => void;
}

export default function ReportSection({ section, onGenerate }: ReportSectionProps) {
  const [content, setContent] = useState(section.content);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    onGenerate();
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const handleInsertChart = () => {
    // In a real implementation, this would open a chart builder/selector
    toast.info("Chart insertion coming soon!");
  };

  const handleInsertTable = () => {
    // In a real implementation, this would open a table builder
    const tableTemplate = `
| Company    | Revenue (Cr) | Growth YoY |
|------------|-------------|------------|
| Infosys    | 38,200      | 4.8%       |
| TCS        | 45,300      | 3.5%       |
| Wipro      | 21,500      | 2.1%       |
`;
    setContent(prev => prev + "\n" + tableTemplate);
  };

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      // In a real implementation, this would upload to a server and get a URL
      toast.success(`Image ${file.name} will be added to the report`);
    } else {
      // For Excel files
      toast.success(`File ${file.name} will be attached to the report`);
    }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-800",
    review: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800"
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-lg">{section.title}</h3>
          <Badge className={statusColors[section.status] || ""}>
            {section.status.charAt(0).toUpperCase() + section.status.slice(1)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {section.comments.length > 0 && (
            <Button variant="ghost" size="sm" className="text-finance-gray">
              <MessageSquare size={16} className="mr-1" />
              {section.comments.length}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles size={16} className="mr-2" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>

      <InsertContentToolbar
        onInsertChart={handleInsertChart}
        onInsertTable={handleInsertTable}
        onUploadFile={handleFileUpload}
      />
      
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="font-sans"
      />
    </div>
  );
}