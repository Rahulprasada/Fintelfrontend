import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { Agent, AgentSet } from "./Agent";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AgentSetsProps {
  agentSets: AgentSet[];
  agents: Agent[];
  onSelectSet: (agentIds: string[]) => void;
  onDeleteSet: (setId: string) => void;
}

export default function AgentSets({
  agentSets,
  agents,
  onSelectSet,
  onDeleteSet,
}: AgentSetsProps) {
  if (agentSets.length === 0) {
    return null;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentAgents = agentSets.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(agentSets.length / cardsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
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

  return (
    <div className="p-6 justify-center items-center">
      <h3 className="text-lg font-bold mb-4">Saved Agent Sets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentAgents.map((set) => {
          const setAgents = agents.filter((a) => set.agentIds.includes(a.id));

          return (
            <Card
              key={set.id}
              className="group hover:shadow-md transition-shadow"
              style={{
                backgroundImage: "linear-gradient(to right, #e0f2fe, #ffffff)",
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{set.name}</CardTitle>
                <CardDescription>
                  {set.agentIds.length} agent
                  {set.agentIds.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-1">
                  {setAgents.slice(0, 3).map((agent) => (
                    <div
                      key={agent.id}
                      className="bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-1"
                    >
                      {agent.name}
                    </div>
                  ))}

                  {set.agentIds.length > 3 && (
                    <div className="bg-muted text-xs rounded-full px-2 py-1">
                      +{set.agentIds.length - 3} more
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onDeleteSet(set.id);
                    toast.success(`"${set.name}" deleted`);
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onSelectSet(set.agentIds);
                    toast.success(`"${set.name}" loaded`);
                  }}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Load Set
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstCard + 1}-
            {Math.min(indexOfLastCard, agentSets.length)} of {agentSets.length}{" "}
            models
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
}
