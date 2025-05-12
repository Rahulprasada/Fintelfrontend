import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ResearchSubmission } from "./PortfolioModel";

interface ResearchSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (submission: Partial<ResearchSubmission>) => void;
}

export default function ResearchSubmissionDialog({ 
  open, 
  onOpenChange, 
  onSubmit
}: ResearchSubmissionDialogProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"Report" | "Valuation" | "Analysis" | "Note">("Report");
  const [description, setDescription] = useState("");
  const [documentUrl, setDocumentUrl] = useState("/documents/sample.pdf"); // This would be handled by a file upload in a real app
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [tags, setTags] = useState("");
  
  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive"
      });
      return;
    }

    const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
    
    onSubmit({
      title,
      type,
      description,
      submittedBy: "Current User", // Would be replaced by the actual logged-in user
      submittedAt: new Date().toISOString(),
      status: "Pending Review",
      documentUrl,
      version: "1.0",
      company: company || undefined,
      sector: sector || undefined,
      tags: tagArray,
    });
    
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle("");
    setType("Report");
    setDescription("");
    setDocumentUrl("/documents/sample.pdf");
    setCompany("");
    setSector("");
    setTags("");
  };

  const sectorOptions = [
    "Technology", "Banking", "Financial Services", "Power", "Healthcare",
    "Consumer Goods", "Automobile", "Pharmaceuticals", "Energy", "Telecom"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">New Research Submission</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Research title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select value={type} onValueChange={(value: "Report" | "Valuation" | "Analysis" | "Note") => setType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Report">Report</SelectItem>
                <SelectItem value="Valuation">Valuation</SelectItem>
                <SelectItem value="Analysis">Analysis</SelectItem>
                <SelectItem value="Note">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="col-span-3"
              placeholder="Company name (optional)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sector" className="text-right">Sector</Label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select sector (optional)" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="col-span-3"
              placeholder="Comma-separated tags"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Research description"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="document" className="text-right">Document</Label>
            <div className="col-span-3">
              <div className="py-2 px-4 border border-dashed rounded-md bg-slate-50 text-center cursor-pointer hover:bg-slate-100">
                <p>Click to upload document</p>
                <p className="text-xs text-muted-foreground">(This would be a file uploader in a real app)</p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">Submit for Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
