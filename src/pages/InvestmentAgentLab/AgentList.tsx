import { useState } from "react";
import AgentCard from "./AgentCard";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Agent } from "./Agent";

interface AgentListProps {
  agents: Agent[];
  selectedAgentIds: string[];
  onAgentSelect: (agentId: string) => void;
}

export default function AgentList({ agents, selectedAgentIds, onAgentSelect }: AgentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStyle, setFilterStyle] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Get unique styles for dropdown
  const uniqueStyles = Array.from(new Set(agents.map(agent => agent.style)));

  // Filter agents based on search term and selected style
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStyle = filterStyle === "all" || agent.style === filterStyle;
    
    return matchesSearch && matchesStyle;
  });

  // Calculate pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredAgents.length / cardsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents by name, style, or description..."
            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <Select 
          value={filterStyle} 
          onValueChange={(value) => {
            setFilterStyle(value);
            setCurrentPage(1); 
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {uniqueStyles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentAgents.map((agent) => (
          <AgentCard 
            key={agent.id}
            agent={agent}
            isSelected={selectedAgentIds.includes(agent.id)}
            onSelect={() => onAgentSelect(agent.id)}
          />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No agents found matching "{searchTerm}"</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="cursor-pointer"
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {pageNumbers.map(number => (
              <PaginationItem key={number}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={currentPage === number}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="cursor-pointer"
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}