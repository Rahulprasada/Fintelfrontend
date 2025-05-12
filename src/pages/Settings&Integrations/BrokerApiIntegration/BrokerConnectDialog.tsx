import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderKey, KeySquare, RefreshCw } from "lucide-react";
import { BrokerConnection } from "../ToolsModel";

interface BrokerConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  broker: BrokerConnection | null;
  onSave: (broker: BrokerConnection) => void;
}

const availableBrokers = [
  { id: "zerodha", name: "Zerodha", connectionType: "OAuth" },
  { id: "dhan", name: "Dhan", connectionType: "OAuth" },
  { id: "angelone", name: "Angel One", connectionType: "API Key" },
  { id: "interactive-brokers", name: "Interactive Brokers", connectionType: "API Key" },
  { id: "fyers", name: "Fyers", connectionType: "API Key" },
  { id: "upstox", name: "Upstox", connectionType: "OAuth" },
];

export default function BrokerConnectDialog({
  open,
  onOpenChange,
  broker,
  onSave
}: BrokerConnectDialogProps) {
  const [connectionType, setConnectionType] = useState<"OAuth" | "API Key">("OAuth");
  const [selectedBroker, setSelectedBroker] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [accountId, setAccountId] = useState("");
  const [tradingMode, setTradingMode] = useState<"Paper" | "Live">("Paper");
  const [paperTradingBalance, setPaperTradingBalance] = useState(1000000);
  
  useEffect(() => {
    if (broker) {
      setConnectionType(broker.connectionType);
      // Find the broker from available brokers
      const brokerInfo = availableBrokers.find(b => b.name === broker.brokerName);
      setSelectedBroker(brokerInfo?.id || "");
      setApiKey("");
      setApiSecret("");
      setAccountId(broker.accountId);
      setTradingMode(broker.tradingMode);
      setPaperTradingBalance(broker.paperTradingBalance || 1000000);
    } else {
      resetForm();
    }
  }, [broker]);
  
  const resetForm = () => {
    setConnectionType("OAuth");
    setSelectedBroker("");
    setApiKey("");
    setApiSecret("");
    setAccountId("");
    setTradingMode("Paper");
    setPaperTradingBalance(1000000);
  };
  
  const handleSave = () => {
    const selectedBrokerInfo = availableBrokers.find(b => b.id === selectedBroker);
    
    if (!selectedBrokerInfo) return;
    
    const newBroker: BrokerConnection = {
      id: broker?.id || `broker-${Date.now()}`,
      userId: broker?.userId || "user-1", // Current user ID
      brokerName: selectedBrokerInfo.name,
      accountId: accountId,
      status: "Connected",
      connectionType: connectionType,
      lastSyncAt: new Date().toISOString(),
      tradingMode: tradingMode,
      paperTradingBalance: tradingMode === "Paper" ? paperTradingBalance : undefined,
    };
    
    onSave(newBroker);
  };
  
  const isFormValid = () => {
    if (!selectedBroker || !accountId) return false;
    
    // For API Key connection, require API Key and Secret
    if (connectionType === "API Key") {
      return !!apiKey && !!apiSecret;
    }
    
    return true;
  };
  
  // Filter brokers by connection type
  const filteredBrokers = availableBrokers.filter(b => b.connectionType === connectionType);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {broker ? "Reconnect" : "Connect"} Broker Account
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <Tabs defaultValue="oauth" value={connectionType === "OAuth" ? "oauth" : "apikey"} onValueChange={(value) => setConnectionType(value === "oauth" ? "OAuth" : "API Key")} className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="oauth" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                OAuth Connection
              </TabsTrigger>
              <TabsTrigger value="apikey" className="flex-1">
                <KeySquare className="mr-2 h-4 w-4" />
                API Key Connection
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-2">
            <Label htmlFor="broker">Select Broker</Label>
            <Select value={selectedBroker} onValueChange={setSelectedBroker}>
              <SelectTrigger id="broker">
                <SelectValue placeholder="Select your broker" />
              </SelectTrigger>
              <SelectContent>
                {filteredBrokers.map(broker => (
                  <SelectItem key={broker.id} value={broker.id}>
                    {broker.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {connectionType === "API Key" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <Input
                  id="api-secret"
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  placeholder="Enter your API secret"
                />
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="account-id">Account ID</Label>
            <Input
              id="account-id"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder="Enter your account ID"
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-0.5">
              <Label htmlFor="trading-mode">Trading Mode</Label>
              <span className="text-sm text-muted-foreground">
                Paper trading lets you test without real money
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Label 
                htmlFor="trading-mode"
                className={tradingMode === "Paper" ? "text-muted-foreground" : "text-destructive font-medium"}
              >
                {tradingMode === "Paper" ? "Paper" : "Live"}
              </Label>
              <Switch 
                id="trading-mode"
                checked={tradingMode === "Live"}
                onCheckedChange={(checked) => setTradingMode(checked ? "Live" : "Paper")}
              />
            </div>
          </div>
          
          {tradingMode === "Paper" && (
            <div className="space-y-2">
              <Label htmlFor="paper-balance">Paper Trading Balance</Label>
              <Input
                id="paper-balance"
                type="number"
                value={paperTradingBalance}
                onChange={(e) => setPaperTradingBalance(Number(e.target.value))}
                min={1000}
                step={10000}
              />
            </div>
          )}
          
          {tradingMode === "Live" && (
            <div className="bg-red-50 p-3 rounded-md border border-red-200 text-red-600 text-sm">
              <strong>Warning:</strong> Live trading will execute real orders with actual funds. Make sure your API keys and settings are correctly configured.
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isFormValid()}
          >
            {connectionType === "OAuth" ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Authorize
              </>
            ) : (
              <>
                <FolderKey className="mr-2 h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
