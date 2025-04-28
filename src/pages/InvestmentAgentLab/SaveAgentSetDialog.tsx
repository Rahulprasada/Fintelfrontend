import { useState } from "react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AgentSet } from "./Agent";

interface SaveAgentSetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgentIds: string[];
  onSave: (agentSet: AgentSet) => void;
}

export default function SaveAgentSetDialog({ 
  open, 
  onOpenChange, 
  selectedAgentIds,
  onSave
}: SaveAgentSetDialogProps) {
  const [name, setName] = useState("");
  
  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Please enter a name for this agent set");
      return;
    }
    
    if (selectedAgentIds.length === 0) {
      toast.error("Please select at least one agent");
      return;
    }
    
    const newAgentSet: AgentSet = {
      id: `set-${Date.now()}`,
      name: name.trim(),
      agentIds: [...selectedAgentIds],
      createdAt: new Date()
    };
    
    onSave(newAgentSet);
    setName("");
    onOpenChange(false);
    toast.success(`Agent set "${name}" saved successfully`);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Agent Set</DialogTitle>
          <DialogDescription>
            Save your selected agents as a set for future use.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Agent Set Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., My Value Trio"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedAgentIds.length} agent{selectedAgentIds.length !== 1 ? "s" : ""} selected
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Agent Set
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}