import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Agent, AgentSet } from "./Agent";
import AgentSelectionHeader from "./AgentSelectionHeader";
import AgentSets from "./AgentSet";
import AgentList from "./AgentList";
import SaveAgentSetDialog from "./SaveAgentSetDialog";
import { agentData } from "./AgentData";

export default function InvestmentAgentLab() {
  const navigate = useNavigate();
  const [agents] = useState<Agent[]>(agentData);
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>([]);
  const [agentSets, setAgentSets] = useState<AgentSet[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  useEffect(() => {
    const savedSets = localStorage.getItem("agentSets");
    if (savedSets) {
      try {
        const parsedSets: AgentSet[] = JSON.parse(savedSets);
        setAgentSets(parsedSets);
      } catch (error) {
        console.error("Failed to parse saved agent sets:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (agentSets.length > 0) {
      localStorage.setItem("agentSets", JSON.stringify(agentSets));
    }
  }, [agentSets]);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentIds(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId) 
        : [...prev, agentId]
    );
  };

  const handleSaveSet = (newSet: AgentSet) => {
    setAgentSets(prev => [...prev, newSet]);
  };

  const handleDeleteSet = (setId: string) => {
    setAgentSets(prev => prev.filter(set => set.id !== setId));
  };

  const handleSelectSet = (agentIds: string[]) => {
    setSelectedAgentIds(agentIds);
  };

  const handleContinue = () => {
    if (selectedAgentIds.length === 0) {
      toast.error("Please select at least one agent");
      return;
    }
    localStorage.setItem("selectedAgentIds", JSON.stringify(selectedAgentIds));
    toast.success(`${selectedAgentIds.length} agent(s) selected. Ready for signal generation.`);
    navigate("/");
  };

  return (
    <div className="py-2 space-y-2 animate-fade-in">
      <AgentSelectionHeader />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSaveDialogOpen(true)}
            disabled={selectedAgentIds.length === 0}
            className="shadow-sm"
          >
            Save Agent Set
          </Button>
          
          <Button 
            onClick={handleContinue}
            disabled={selectedAgentIds.length === 0}
            className="shadow-sm bg-finance-blue hover:bg-blue-800"
          >
            Continue with {selectedAgentIds.length} Agent{selectedAgentIds.length !== 1 ? "s" : ""}
          </Button>
        </div>
        
        <span className="text-sm text-muted-foreground">
          {selectedAgentIds.length} agent{selectedAgentIds.length !== 1 ? "s" : ""} selected
        </span>
      </div>

      {agentSets.length > 0 && (
        <div className="rounded-lg border bg-card shadow-sm">
          <AgentSets 
            agentSets={agentSets} 
            agents={agents}
            onSelectSet={handleSelectSet}
            onDeleteSet={handleDeleteSet}
          />
        </div>
      )}
      
      <div>
        <AgentList 
          agents={agents}
          selectedAgentIds={selectedAgentIds}
          onAgentSelect={handleAgentSelect}
        />
      </div>
      
      <SaveAgentSetDialog 
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        selectedAgentIds={selectedAgentIds}
        onSave={handleSaveSet}
      />
    </div>
  );
}
