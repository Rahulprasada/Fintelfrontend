import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import  cardBackground  from "../../asset/cardbackground.jpg";

export interface Report {
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
  interface ReportCardProps {
    report: Report;
    onClick: (report: Report) => void;
  }

  export function ReportCard({ report, onClick }: ReportCardProps) {
    const statusColors = {
      draft: "bg-gray-200 text-gray-800",
      review: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      published: "bg-finance-gold text-finance-navy",
    };
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onClick(report)}
      style={{
        backgroundImage: `url(${cardBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-finance-gray" />
            <p className="font-medium text-xs text-gray-500">{report.type}</p>
          </div>
          <h3 className="font-semibold text-lg mt-1">{report.title}</h3>
        </div>
        <Badge className={cn(statusColors[report.status])}>
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-semibold">{report.company}</p>
            <p className="text-xs text-gray-500">{report.ticker}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {report.sector}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-2 text-xs text-gray-500 flex justify-between">
        <span>By {report.author}</span>
        <span>Updated {report.lastUpdated}</span>
      </CardFooter>
    </Card>
  )
}

