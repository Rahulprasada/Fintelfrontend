import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "./Agent";

interface AddAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAgent: (agent: Agent) => void;
}

export default function AddAgentDialog({
  open,
  onOpenChange,
  onAddAgent,
}: AddAgentDialogProps) {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  
  const handleSubmit = () => {
    if (!name.trim() || !style.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: name.trim(),
      style: style.trim(),
      description: description.trim(),
      avatar: "/placeholder.svg",
      bio: description.trim(),
      rules: [],
      holdingPeriod: "TBD",
      strengths: [],
      weaknesses: [],
      historicalAlpha: "N/A",
      filters: {}
    };
    
    onAddAgent(newAgent);
    setName("");
    setStyle("");
    setDescription("");
    onOpenChange(false);
    toast.success(`Agent "${name}" added successfully`);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Agent</DialogTitle>
          <DialogDescription>
            Create a new investment agent with their unique strategy and approach.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Agent Name
            </label>
            <Input
              id="name"
              placeholder="e.g., Warren Buffett"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="style" className="text-sm font-medium">
              Investment Style
            </label>
            <Input
              id="style"
              placeholder="e.g., Value & Moat-based"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe the agent's investment approach..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}