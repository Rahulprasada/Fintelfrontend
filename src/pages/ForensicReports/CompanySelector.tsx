import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { companies } from "./Data/ForensicData";

interface CompanySelectorProps {
  selectedCompanyId: string;
  onCompanyChange: (companyId: string) => void;
}

export function CompanySelector({
  selectedCompanyId,
  onCompanyChange,
}: CompanySelectorProps) {
  const handleCompanyChange = (value: string) => {
    onCompanyChange(value);
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return "bg-green-500 hover:bg-green-600";
      case "Medium":
        return "bg-orange-500 hover:bg-orange-600";
      case "High":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full">
      <div className="w-full md:w-80">
        <Select value={selectedCompanyId} onValueChange={handleCompanyChange}>
          <SelectTrigger className="bg-white shadow-md border rounded-lg px-4 py-2 w-full">
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg">
            {companies.map((company) => (
              <SelectItem
                key={company.id}
                value={company.id}
                className="flex justify-between items-center hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="flex items-start justify-between w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-medium truncate max-w-[150px]">
                          {company.name.length > 14
                            ? `${company.name.slice(0, 14)}…`
                            : company.name}{" "}
                          <span className="text-gray-500 text-xs">
                            ({company.ticker})
                          </span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{company.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Badge
                    className={`ml-1 ${getRiskBadgeClass(
                      company.riskLevel
                    )} text-xs`}
                    variant="default"
                  >
                    {company.riskLevel} Risk
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}