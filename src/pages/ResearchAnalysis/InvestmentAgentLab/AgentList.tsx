import { useState } from "react";
import AgentCard from "./AgentCard";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Agent } from "./Agent";
import AddAgentDialog from "./AddAgentDialog";

interface AgentListProps {
  agents: Agent[];
  selectedAgentIds: string[];
  onAgentSelect: (agentId: string) => void;
}

export default function AgentList({
  agents: initialAgents,
  selectedAgentIds,
  onAgentSelect,
}: AgentListProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filterStyle, setFilterStyle] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const [open, setOpen] = useState(false);

  const uniqueStyles = Array.from(new Set(agents.map((agent) => agent.style)));

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStyle = filterStyle === "all" || agent.style === filterStyle;

    return matchesSearch && matchesStyle;
  });

  const handleAddAgent = (newAgent: Agent) => {
    setCurrentPage(1);
    setAgents((prev) => [newAgent, ...prev]);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredAgents.length / cardsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-start"
              >
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                {filterStyle === "all"
                  ? "Search or select style..."
                  : filterStyle}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search agents or select style..."
                  value={searchTerm}
                  onValueChange={(value) => {
                    setSearchTerm(value);
                    setCurrentPage(1);
                  }}
                />
                <CommandList>
                  <CommandEmpty>No style found.</CommandEmpty>
                  <CommandGroup heading="Styles">
                    <CommandItem
                      onSelect={() => {
                        setFilterStyle("all");
                        setOpen(false);
                      }}
                    >
                      All Styles
                    </CommandItem>
                    {uniqueStyles.map((style) => (
                      <CommandItem
                        key={style}
                        onSelect={() => {
                          setFilterStyle(style);
                          setOpen(false);
                        }}
                      >
                        {style}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="shadow-sm bg-finance-blue hover:bg-blue-800"
          onClick={() => setShowModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
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
          <p className="text-muted-foreground">
            No agents found matching "{searchTerm}"
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstCard + 1}-
            {Math.min(indexOfLastCard, filteredAgents.length)} of{" "}
            {filteredAgents.length} models
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
      <AddAgentDialog
        open={showModal}
        onOpenChange={setShowModal}
        onAddAgent={handleAddAgent}
      />
    </div>
  );
}
