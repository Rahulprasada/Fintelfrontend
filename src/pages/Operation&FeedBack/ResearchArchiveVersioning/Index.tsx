import { useState } from "react";import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText,
  Search,
  History,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ResearchSubmission } from "../PortfolioModel";
import { researchSubmissions, researchVersions } from "../PortfolioData";

 function ResearchArchivingVersioning() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const [selectedSubmission, setSelectedSubmission] = useState<ResearchSubmission | null>(null);
  
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  
  // Filter and sort submissions
  const filteredSubmissions = researchSubmissions.filter(submission => {
    const matchesSearch = 
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (submission.company && submission.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (submission.sector && submission.sector.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === "all" || submission.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || submission.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    let compareResult = 0;
    
    if (sortBy === "date") {
      compareResult = new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    } else if (sortBy === "title") {
      compareResult = a.title.localeCompare(b.title);
    } else if (sortBy === "type") {
      compareResult = a.type.localeCompare(b.type);
    } else if (sortBy === "status") {
      compareResult = a.status.localeCompare(b.status);
    }
    
    return sortOrder === "asc" ? compareResult : -compareResult;
  });
  
  // Get versions for selected submission
  const submissionVersions = selectedSubmission 
    ? researchVersions.filter(version => version.parentId === selectedSubmission.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];
    
  const handleDownload = (documentUrl: string) => {
    toast({
      title: "Download started",
      description: "Your document is being prepared for download",
    });
    // Download logic would be implemented here
  };
  
  const handleExportArchiveIndex = () => {
    toast({
      title: "Exporting archive index",
      description: "Archive index export initiated",
    });
    // Export logic would be implemented here
  };
  
  const handleCompareVersions = (v1: string, v2: string) => {
    toast({
      title: "Version comparison",
      description: `Comparing versions ${v1} and ${v2}`,
    });
    // Version comparison logic would be implemented here
  };
  
  // Render the status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex gap-1 items-center">
          <CheckCircle size={12} /> Approved
        </Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex gap-1 items-center">
          <AlertCircle size={12} /> Rejected
        </Badge>;
      case 'pending review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex gap-1 items-center">
          <Clock size={12} /> Pending
        </Badge>;
      case 'revision requested':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex gap-1 items-center">
          <AlertCircle size={12} /> Revision Requested
        </Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-black-700">Research Archive</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by title, company, or sector..."
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending review">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="revision requested">Revision Requested</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="valuation">Valuation</SelectItem>
              <SelectItem value="analysis">Analysis</SelectItem>
              <SelectItem value="note">Note</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="bg-white"
            onClick={handleExportArchiveIndex}
          >
            <Download size={16} className="mr-2" /> Export Index
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-2/3 border-t-8 border-emerald-500 shadow-md">
          <CardHeader>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-t-md">
            <CardTitle className="text-lg text-emerald-800">Document Repository</CardTitle>
            <CardDescription>
              {filteredSubmissions.length} document{filteredSubmissions.length !== 1 ? 's' : ''} found
            </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md overflow-hidden p-4">
              <Table>
                <TableHeader className="bg-finance-blue">
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-emerald-100 text-white"
                      onClick={() => toggleSort("title")}
                    >
                      <div className="flex items-center">
                        Title
                        {sortBy === "title" && (
                          sortOrder === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-emerald-100 text-white"
                      onClick={() => toggleSort("type")}
                    >
                      <div className="flex items-center">
                        Type
                        {sortBy === "type" && (
                          sortOrder === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-white">Version</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-emerald-100 text-white"
                      onClick={() => toggleSort("date")}
                    >
                      <div className="flex items-center">
                        Date
                        {sortBy === "date" && (
                          sortOrder === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-emerald-100 text-white"
                      onClick={() => toggleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {sortBy === "status" && (
                          sortOrder === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <TableRow 
                        key={submission.id} 
                        className={`cursor-pointer hover:bg-gray-50 ${selectedSubmission?.id === submission.id ? 'bg-emerald-50' : ''}`}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText size={16} className="mr-2 text-emerald-600" />
                            {submission.title}
                          </div>
                        </TableCell>
                        <TableCell>{submission.type}</TableCell>
                        <TableCell>v{submission.version}</TableCell>
                        <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{renderStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(submission.documentUrl);
                              }}
                            >
                              <Download size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubmission(submission);
                              }}
                            >
                              <History size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No documents found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full lg:w-1/3 border-t-8 border-teal-500 shadow-md h-fit">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 pb-2">
            <CardTitle className="text-lg text-teal-800 flex items-center">
              <History size={18} className="mr-2" />
              Version History
            </CardTitle>
            <CardDescription>
              {selectedSubmission ? (
                `Viewing history for: ${selectedSubmission.title}`
              ) : (
                'Select a document to view history'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {selectedSubmission ? (
              submissionVersions.length > 0 ? (
                <div className="space-y-3">
                  {submissionVersions.map((version, index) => (
                    <div 
                      key={version.id}
                      className={`p-3 border rounded-md ${
                        version.status === 'Approved' 
                          ? 'border-green-200 bg-green-50' 
                          : version.status === 'Rejected'
                          ? 'border-red-200 bg-red-50'
                          : version.status === 'Submitted'
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{version.version}</div>
                        <Badge 
                          className={
                            version.status === 'Approved' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : version.status === 'Rejected'
                              ? 'bg-red-100 text-red-800 hover:bg-red-100'
                              : version.status === 'Submitted'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                          }
                        >
                          {version.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(version.createdAt).toLocaleString()}
                      </div>
                      
                      <div className="text-sm mt-1">{version.notes}</div>
                      
                      <div className="flex gap-2 mt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs bg-white"
                          onClick={() => handleDownload(version.documentUrl)}
                        >
                          <Download size={12} className="mr-1" /> Download
                        </Button>
                        
                        {index < submissionVersions.length - 1 && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs bg-white"
                            onClick={() => handleCompareVersions(
                              version.version,
                              submissionVersions[index + 1].version
                            )}
                          >
                            <ArrowUpDown size={12} className="mr-1" /> Compare
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No version history found
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a document to view its version history
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default ResearchArchivingVersioning
