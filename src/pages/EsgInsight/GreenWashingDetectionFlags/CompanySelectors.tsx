import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ESGCompanyScore } from "../Sustainability/ESGIntellegence";

interface CompanySelectorProps {
  companies: ESGCompanyScore[];
  selectedCompanyId: string;
  onSelectCompany: (id: string) => void;
}

export function CompanySelector({ 
  companies, 
  selectedCompanyId, 
  onSelectCompany 
}: CompanySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Find selected company
  const selectedCompany = companies.find(company => company.companyId === selectedCompanyId);
  
  // Filter companies based on search query
  const filteredCompanies = searchQuery
    ? companies.filter(company => 
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.ticker.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : companies;
  
  // Group companies by sector
  const sectors = [...new Set(companies.map(company => company.sector))];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[200px] justify-between">
          {selectedCompany ? (
            <span className="truncate">{selectedCompany.companyName}</span>
          ) : (
            "Select Company"
          )}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" align="end">
        <div className="p-2">
          <div className="flex items-center border rounded-md px-3 py-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-0 h-8"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="max-h-[300px] overflow-auto">
          {searchQuery ? (
            filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <DropdownMenuItem
                  key={company.companyId}
                  onSelect={() => onSelectCompany(company.companyId)}
                  className="flex justify-between items-center"
                >
                  <div>
                    <span>{company.companyName}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {company.ticker}
                    </span>
                  </div>
                  {selectedCompanyId === company.companyId && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No companies found
              </div>
            )
          ) : (
            sectors.map(sector => (
              <div key={sector}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted">
                  {sector}
                </div>
                {companies
                  .filter(company => company.sector === sector)
                  .map(company => (
                    <DropdownMenuItem
                      key={company.companyId}
                      onSelect={() => onSelectCompany(company.companyId)}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span>{company.companyName}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {company.ticker}
                        </span>
                      </div>
                      {selectedCompanyId === company.companyId && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))
                }
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
