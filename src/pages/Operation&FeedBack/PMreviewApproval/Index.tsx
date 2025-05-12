import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  ClipboardList,
  Search,
  FileText,
  Plus,
  Clock,
  Check,
  X,
} from "lucide-react";
import { ResearchSubmission } from "../PortfolioModel";
import { researchSubmissions } from "../PortfolioData";
import ResearchSubmissionDialog from "../ResearchSubmission";

function PMreviewApproval() {
  const [submissions, setSubmissions] =
    useState<ResearchSubmission[]>(researchSubmissions);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesTab =
      (activeTab === "pending" && submission.status === "Pending Review") ||
      (activeTab === "approved" && submission.status === "Approved") ||
      (activeTab === "revisions" &&
        (submission.status === "Rejected" ||
          submission.status === "Revision Requested")) ||
      activeTab === "all";

    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (submission.company &&
        submission.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (submission.sector &&
        submission.sector.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const handleNewSubmission = (submission: Partial<ResearchSubmission>) => {
    const newSubmission: ResearchSubmission = {
      id: `rs${Date.now()}`,
      title: submission.title || "",
      type: submission.type || "Report",
      description: submission.description || "",
      submittedBy: submission.submittedBy || "Current User",
      submittedAt: submission.submittedAt || new Date().toISOString(),
      status: submission.status || "Draft",
      documentUrl: submission.documentUrl || "/documents/default.pdf",
      version: submission.version || "1.0",
      tags: submission.tags || [],
      company: submission.company,
      sector: submission.sector,
    };

    setSubmissions((prev) => [newSubmission, ...prev]);

    toast({
      title: "Research submitted",
      description: "Your research has been submitted for review.",
    });
  };

  const handleStatusChange = (
    submissionId: string,
    newStatus: ResearchSubmission["status"]
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? {
              ...sub,
              status: newStatus,
              reviewedAt: new Date().toISOString(),
              reviewerId: "Current User", // Would be the actual logged-in user
            }
          : sub
      )
    );

    toast({
      title: `Submission ${newStatus.toLowerCase()}`,
      description: `The research submission has been ${newStatus.toLowerCase()}.`,
    });
  };

  return (
    <div className=" space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-black-700 w-full">
          Research Review & Approvals
        </h2>
        <Button
          onClick={() => setSubmissionDialogOpen(true)}
          className="bg-finance-blue hover:bg-blue-800 w-full md:w-auto"
        >
          <Plus size={16} className="mr-2" />
          New Submission
        </Button>
      </div>

      <Card className="border-t-8 border-yellow-400 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between gap-4 pb-2 bg-yellow-100 p-4 rounded-md">
            <div className="mb-4 md:mb-0">
              <CardTitle className="text-lg md:text-xl">Research Submissions</CardTitle>
              <CardDescription className="text-sm">
                Manage and track research approval workflow
              </CardDescription>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8 w-full md:w-[250px] bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="pending"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 max-w-full overflow-x-auto">
              <TabsTrigger
                value="pending"
                className="flex items-center justify-center gap-2 w-full data-[state=active]:bg-red-200 text-xs md:text-sm"
              >
                <Clock size={16} /> <span className="hidden md:inline">Pending Review</span>
                <span className="md:hidden">Pending</span>
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="flex items-center justify-center gap-2 w-full data-[state=active]:bg-green-200 text-xs md:text-sm"
              >
                <Check size={16} /> Approved
              </TabsTrigger>
              <TabsTrigger
                value="revisions"
                className="flex items-center justify-center gap-2 w-full data-[state=active]:bg-pink-200 text-xs md:text-sm"
              >
                <X size={16} /> Revisions
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="flex items-center justify-center gap-2 w-full data-[state=active]:bg-blue-200 text-xs md:text-sm"
              >
                <ClipboardList size={16} /> <span className="hidden md:inline">All Submissions</span>
                <span className="md:hidden">All</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-md border bg-white overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-finance-blue">
                    <TableRow>
                      <TableHead className="text-white text-left md:w-2/6">Title</TableHead>
                      <TableHead className="text-white hidden md:table-cell">Type</TableHead>
                      <TableHead className="text-white hidden md:table-cell">Submitted By</TableHead>
                      <TableHead className="text-white hidden lg:table-cell">Submitted At</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-blue-500 hidden md:inline" />
                              <div>
                                <div className="font-semibold">{submission.title}</div>
                                <div className="text-xs text-gray-500 md:hidden">
                                  {submission.submittedBy} - {new Date(submission.submittedAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{submission.type}</TableCell>
                          <TableCell className="hidden md:table-cell">{submission.submittedBy}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`
                                ${
                                  submission.status === "Approved"
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                    : submission.status === "Pending Review"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : submission.status === "Draft"
                                    ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                } text-xs
                              `}
                            >
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-col md:flex-row justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white w-full md:w-auto"
                              >
                                View
                              </Button>

                              {submission.status === "Pending Review" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-green-500 text-green-600 hover:bg-green-50 w-full md:w-auto"
                                    onClick={() =>
                                      handleStatusChange(
                                        submission.id,
                                        "Approved"
                                      )
                                    }
                                  >
                                    <Check size={14} className="mr-1" /> Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-500 text-amber-600 hover:bg-amber-50 w-full md:w-auto"
                                    onClick={() =>
                                      handleStatusChange(
                                        submission.id,
                                        "Revision Requested"
                                      )
                                    }
                                  >
                                    <X size={14} className="mr-1" /> Revise
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No research submissions found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ResearchSubmissionDialog
        open={submissionDialogOpen}
        onOpenChange={setSubmissionDialogOpen}
        onSubmit={handleNewSubmission}
      />
    </div>
  );
}

export default PMreviewApproval;