import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { WatchlistItem } from "./PortfolioModel";

interface EditStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (stock: Partial<WatchlistItem>) => void;
  stock: WatchlistItem | null;
}

export default function EditStocks({ open, onOpenChange, onSave, stock }: EditStockDialogProps) {
  const [ticker, setTicker] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [status, setStatus] = useState<"Under Coverage" | "Watch Only" | "Dropped">("Watch Only");
  const [priority, setPriority] = useState(false);
  const [notes, setNotes] = useState("");

  // Populate form when stock changes
  useEffect(() => {
    if (stock) {
      setTicker(stock.ticker);
      setCompanyName(stock.companyName);
      setSector(stock.sector);
      setStatus(stock.coverageStatus);
      setPriority(stock.priority);
      setNotes(stock.notes);
    }
  }, [stock]);

  const handleSave = () => {
    if (!ticker.trim() || !companyName.trim()) {
      toast({
        title: "Validation Error",
        description: "Ticker and company name are required",
        variant: "destructive"
      });
      return;
    }

    onSave({
      id: stock?.id,
      ticker: ticker.toUpperCase(),
      companyName,
      sector,
      coverageStatus: status,
      priority,
      notes
    });
    
    onOpenChange(false);
  };

  const sectorOptions = [
    "Technology", "Banking", "Financial Services", "Power", "Healthcare",
    "Consumer Goods", "Automobile", "Pharmaceuticals", "Energy", "Telecom"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Stock</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ticker" className="text-right">Ticker</Label>
            <Input
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="col-span-3"
              placeholder="e.g. AAPL, MSFT"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">Company Name</Label>
            <Input
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="col-span-3"
              placeholder="e.g. Apple Inc."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sector" className="text-right">Sector</Label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select value={status} onValueChange={(value: "Under Coverage" | "Watch Only" | "Dropped") => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under Coverage">Under Coverage</SelectItem>
                <SelectItem value="Watch Only">Watch Only</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch id="priority" checked={priority} onCheckedChange={setPriority} />
              <Label htmlFor="priority">Mark as priority</Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
              placeholder="Add notes (optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
