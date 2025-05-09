import { Download, Share, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExportOptionsProps {
  reportId: string;
  reportTitle: string;
}

export default function ExportOptions({ reportId, reportTitle }: ExportOptionsProps) {
  const handleExport = (format: "pdf" | "html" | "markdown") => {
    // In a real implementation, this would call an API endpoint to generate the export
    toast.success(`Exporting ${reportTitle} as ${format.toUpperCase()}`);
  };

  const handleShare = () => {
    // In a real implementation, this would generate a secure, time-bound share link
    const dummyShareLink = `https://research.example.com/share/${reportId}`;
    navigator.clipboard.writeText(dummyShareLink);
    toast.success("Share link copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("html")}>
          <FileText className="mr-2 h-4 w-4" />
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("markdown")}>
          <FileText className="mr-2 h-4 w-4" />
          Export as Markdown
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          Share Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}