import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash, Bell, Mail, Phone } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertCategory, AlertCondition, NotificationMethod } from "../ToolsModel";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: Alert | null;
  onSave: (alert: Alert) => void;
}

export default function AlertDialog({
  open,
  onOpenChange,
  alert,
  onSave
}: AlertDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<AlertCategory>("Market");
  const [isActive, setIsActive] = useState(true);
  const [conditions, setConditions] = useState<AlertCondition[]>([]);
  const [notificationMethods, setNotificationMethods] = useState<NotificationMethod[]>(["in-app"]);
  
  useEffect(() => {
    if (alert) {
      setName(alert.name);
      setDescription(alert.description || "");
      setCategory(alert.category);
      setIsActive(alert.isActive);
      setConditions([...alert.conditions]);
      setNotificationMethods([...alert.notificationMethod]);
    } else {
      resetForm();
    }
  }, [alert]);
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("Market");
    setIsActive(true);
    setConditions([
      {
        id: `condition-${Date.now()}`,
        field: "",
        operator: "=",
        value: ""
      }
    ]);
    setNotificationMethods(["in-app"]);
  };
  
  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      {
        id: `condition-${Date.now()}`,
        field: "",
        operator: "=",
        value: ""
      }
    ]);
  };
  
  const handleRemoveCondition = (id: string) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };
  
  const handleUpdateCondition = (id: string, field: keyof AlertCondition, value: string | number | boolean) => {
    setConditions(
      conditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };
  
  const toggleNotificationMethod = (method: NotificationMethod) => {
    if (notificationMethods.includes(method)) {
      setNotificationMethods(notificationMethods.filter(m => m !== method));
    } else {
      setNotificationMethods([...notificationMethods, method]);
    }
  };
  
  const handleSave = () => {
    const newAlert: Alert = {
      id: alert?.id || `alert-${Date.now()}`,
      name,
      description: description || undefined,
      category,
      conditions,
      notificationMethod: notificationMethods,
      createdBy: alert?.createdBy || "Current User",
      createdAt: alert?.createdAt || new Date().toISOString(),
      isActive,
      history: alert?.history || []
    };
    
    onSave(newAlert);
  };
  
  const getFieldOptions = () => {
    switch (category) {
      case "Market":
        return [
          { value: "RSI", label: "RSI" },
          { value: "MACD", label: "MACD" },
          { value: "MA_50", label: "50-Day Moving Average" },
          { value: "MA_200", label: "200-Day Moving Average" },
          { value: "VOLUME", label: "Volume" }
        ];
        
      case "Macro":
        return [
          { value: "CPI_Inflation_Rate", label: "CPI Inflation Rate" },
          { value: "GDP_Growth", label: "GDP Growth" },
          { value: "Unemployment_Rate", label: "Unemployment Rate" },
          { value: "Interest_Rate", label: "Interest Rate" }
        ];
        
      case "ESG":
        return [
          { value: "ESG_Score", label: "ESG Score" },
          { value: "E_Score", label: "Environmental Score" },
          { value: "S_Score", label: "Social Score" },
          { value: "G_Score", label: "Governance Score" }
        ];
        
      case "Portfolio":
        return [
          { value: "Portfolio_Return", label: "Portfolio Return" },
          { value: "Portfolio_Drawdown", label: "Portfolio Drawdown" },
          { value: "Position_Size", label: "Position Size" },
          { value: "Sector_Allocation", label: "Sector Allocation" }
        ];
        
      case "Research":
        return [
          { value: "report_status", label: "Report Status" },
          { value: "valuation_change", label: "Valuation Change" },
          { value: "target_price_change", label: "Target Price Change" },
          { value: "rating_change", label: "Rating Change" }
        ];
        
      default:
        return [
          { value: "user_activity", label: "User Activity" },
          { value: "system_status", label: "System Status" },
          { value: "error_count", label: "Error Count" },
          { value: "user_login", label: "User Login" }
        ];
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{alert ? "Edit" : "Create"} Alert</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="px-1 py-2 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="alert-name">Alert Name</Label>
              <Input
                id="alert-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. RSI Overbought Alert"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-description">Description (Optional)</Label>
              <Textarea
                id="alert-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what this alert does"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-category">Category</Label>
              <Select
                value={category}
                onValueChange={(value: AlertCategory) => setCategory(value)}
              >
                <SelectTrigger id="alert-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Market">Market</SelectItem>
                  <SelectItem value="Macro">Macro</SelectItem>
                  <SelectItem value="ESG">ESG</SelectItem>
                  <SelectItem value="Portfolio">Portfolio</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Conditions</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddCondition}
                  disabled={conditions.length >= 3}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Condition
                </Button>
              </div>
              
              {conditions.map((condition, index) => (
                <div 
                  key={condition.id} 
                  className="grid grid-cols-[1fr,auto,1fr,auto] gap-2 items-center"
                >
                  <Select
                    value={condition.field}
                    onValueChange={(value) => handleUpdateCondition(condition.id, "field", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {getFieldOptions().map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={condition.operator}
                    onValueChange={(value: any) => handleUpdateCondition(condition.id, "operator", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">">{">"}</SelectItem>
                      <SelectItem value="<">{"<"}</SelectItem>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value=">=">{"≥"}</SelectItem>
                      <SelectItem value="<=">{"≤"}</SelectItem>
                      <SelectItem value="!=">{"≠"}</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="not_contains">Not Contains</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    value={condition.value as string}
                    onChange={(e) => handleUpdateCondition(condition.id, "value", e.target.value)}
                    placeholder="Value"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCondition(condition.id)}
                    disabled={conditions.length <= 1}
                    className="text-muted-foreground"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <Label>Notification Methods</Label>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notification-inapp"
                    checked={notificationMethods.includes("in-app")}
                    onCheckedChange={() => toggleNotificationMethod("in-app")}
                  />
                  <Label 
                    htmlFor="notification-inapp"
                    className="flex items-center cursor-pointer text-base"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    In-app Notification
                  </Label>
                </div>
              
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notification-email"
                    checked={notificationMethods.includes("email")}
                    onCheckedChange={() => toggleNotificationMethod("email")}
                  />
                  <Label 
                    htmlFor="notification-email"
                    className="flex items-center cursor-pointer text-base"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Notification
                  </Label>
                </div>
              
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notification-sms"
                    checked={notificationMethods.includes("sms")}
                    onCheckedChange={() => toggleNotificationMethod("sms")}
                  />
                  <Label
                    htmlFor="notification-sms"
                    className="flex items-center cursor-pointer text-base"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    SMS Notification
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="alert-active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
                <Label htmlFor="alert-active">Alert Active</Label>
              </div>
              {!isActive && (
                <span className="text-sm text-muted-foreground">
                  This alert will be created but won't trigger notifications
                </span>
              )}
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name || conditions.some(c => !c.field || !c.value) || notificationMethods.length === 0}
          >
            {alert ? "Update Alert" : "Create Alert"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
