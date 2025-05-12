import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Watchlist } from "./PortfolioModel";

interface WatchlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watchlist?: Watchlist;
  onSave: (watchlist: Partial<Watchlist>) => void;
}

export default function WatchlistDialog({ open, onOpenChange, watchlist, onSave }: WatchlistDialogProps) {
  const [name, setName] = useState(watchlist?.name || "");
  const [description, setDescription] = useState(watchlist?.description || "");

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Watchlist name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    onSave({
      id: watchlist?.id,
      name,
      description,
    });
    
    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{watchlist ? "Edit Watchlist" : "Create New Watchlist"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Watchlist name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Add a description (optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
