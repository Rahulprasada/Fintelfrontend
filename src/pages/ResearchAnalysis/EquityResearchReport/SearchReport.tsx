import { Box, Card, styled, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { ReportCard } from "./ReportCard";

interface Report {
  id: string;
  title: string;
  company: string;
  ticker: string;
  type: string;
  sector: string;
  status: "draft" | "review" | "approved" | "published";
  lastUpdated: string;
  author: string;
}

const dummyReports: Report[] = [
  {
    id: "1",
    title: "Q4 FY25 Earnings Update",
    company: "Infosys Ltd",
    ticker: "INFY.NS",
    type: "Earnings Update",
    sector: "IT Services",
    status: "draft",
    lastUpdated: "2 hours ago",
    author: "Venkatesh",
  },
  {
    id: "2",
    title: "Initiation of Coverage",
    company: "TCS Ltd",
    ticker: "TCS.NS",
    type: "Initiation",
    sector: "IT Services",
    status: "review",
    lastUpdated: "1 day ago",
    author: "Sanjana",
  },
  {
    id: "3",
    title: "Event Analysis: Investor Day",
    company: "HDFC Bank",
    ticker: "HDFCBANK.NS",
    type: "Event Analysis",
    sector: "Banking",
    status: "approved",
    lastUpdated: "2 days ago",
    author: "Vikram",
  },
  {
    id: "4",
    title: "Quick Take: Management Call",
    company: "Wipro Ltd",
    ticker: "WIPRO.NS",
    type: "Quick Take",
    sector: "IT Services",
    status: "published",
    lastUpdated: "3 days ago",
    author: "Venkatesh",
  },
  {
    id: "5",
    title: "Quick Take: Management Call",
    company: "Wipro Ltd",
    ticker: "WIPRO.NS",
    type: "Quick Take",
    sector: "IT Services",
    status: "approved",
    lastUpdated: "3 days ago",
    author: "Dhoni",
  },
  {
    id: "6",
    title: "Event Analysis: Investor Day",
    company: "HDFC Bank",
    ticker: "HDFCBANK.NS",
    type: "Event Analysis",
    sector: "Banking",
    status: "published",
    lastUpdated: "2 days ago",
    author: "Kishore",
  },
];

const SearchReport = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleReportClick = useCallback(
    (report: any) => {
      navigate(`/dashboard/equity-research-report/${report.id}`);
    },
    [navigate]
  );

  const handleCreateReport = useCallback(() => {
    navigate("/dashboard/equity-research-report/newreport");
  }, [navigate]);

  const filteredReports = dummyReports.filter((report: any) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || statusFilter === ""
        ? true
        : report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <MainBox>
        <CustomTypography>Reports</CustomTypography>
        <Button
          onClick={handleCreateReport}
          className="bg-finance-blue hover:bg-blue-800"
        >
          <PlusCircle size={16} className="mr-2" />
          New Report
        </Button>
      </MainBox>

      <div className="flex gap-4 mb-6 mt-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="All Statuses" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((report: any) => (
          <ReportCard
            key={report.id}
            report={report}
            onClick={handleReportClick}
          />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="col-span-3 py-8 text-center text-gray-500">
          <p>No reports found matching your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredReports.length)} of{" "}
            {filteredReports.length} models
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm px-2">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchReport;

const MainCard = styled(Card)`
  padding: 20px;
  min-height: 88vh;
`;

const MainBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CustomTypography = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: #281c6d;
  @media (max-width: 900px) {
    font-size: 18px;
  }
`;
