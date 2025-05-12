import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bell,
  Plus,
  Search,
  Trash,
  AlertCircle,
  Download,
  Clock,
  Check,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertCategory } from "../ToolsModel";
import { alerts } from "../ToolSettingData";
import AlertDialog from "./AlertDialog";

function AlertManager() {
  const [userAlerts, setUserAlerts] = useState<Alert[]>(alerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Filter alerts based on search query and active tab
  const filteredAlerts = userAlerts.filter((alert) => {
    const matchesSearch =
      alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "active")
      return matchesSearch && alert.isActive && !alert.snoozedUntil;
    if (activeTab === "snoozed") return matchesSearch && alert.snoozedUntil;
    return matchesSearch;
  });

  const handleCreateAlert = () => {
    setSelectedAlert(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsCreateDialogOpen(true);
  };

  const handleSaveAlert = (alert: Alert) => {
    if (selectedAlert) {
      // Edit existing alert
      setUserAlerts(userAlerts.map((a) => (a.id === alert.id ? alert : a)));
      toast({
        title: "Alert Updated",
        description: `"${alert.name}" has been updated.`,
      });
    } else {
      // Create new alert
      setUserAlerts([...userAlerts, alert]);
      toast({
        title: "Alert Created",
        description: `"${alert.name}" has been created.`,
      });
    }
    setIsCreateDialogOpen(false);
  };

  const handleToggleAlertActive = (alertId: string, active: boolean) => {
    setUserAlerts(
      userAlerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, isActive: active, snoozedUntil: undefined }
          : alert
      )
    );

    toast({
      title: `Alert ${active ? "Activated" : "Deactivated"}`,
      description: `The alert has been ${
        active ? "activated" : "deactivated"
      }.`,
    });
  };

  const handleToggleSnooze = (alertId: string, shouldSnooze: boolean) => {
    setUserAlerts(
      userAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              snoozedUntil: shouldSnooze
                ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
            }
          : alert
      )
    );

    toast({
      title: shouldSnooze ? "Alert Snoozed" : "Alert Unsnooozed",
      description: shouldSnooze
        ? "The alert has been snoozed for 7 days."
        : "The alert has been unsnooozed.",
    });
  };

  const handleDeleteAlert = (alertId: string) => {
    setUserAlerts(userAlerts.filter((alert) => alert.id !== alertId));

    toast({
      title: "Alert Deleted",
      description: "The alert has been deleted.",
      variant: "destructive",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAlerts(filteredAlerts.map((alert) => alert.id));
    } else {
      setSelectedAlerts([]);
    }
  };

  const handleSelectAlert = (alertId: string, checked: boolean) => {
    if (checked) {
      setSelectedAlerts([...selectedAlerts, alertId]);
    } else {
      setSelectedAlerts(selectedAlerts.filter((id) => id !== alertId));
    }
  };

  const handleBulkDelete = () => {
    setUserAlerts(
      userAlerts.filter((alert) => !selectedAlerts.includes(alert.id))
    );
    toast({
      title: "Alerts Deleted",
      description: `${selectedAlerts.length} alerts have been deleted.`,
      variant: "destructive",
    });
    setSelectedAlerts([]);
  };

  const handleBulkSnooze = () => {
    setUserAlerts(
      userAlerts.map((alert) =>
        selectedAlerts.includes(alert.id)
          ? {
              ...alert,
              snoozedUntil: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            }
          : alert
      )
    );

    toast({
      title: "Alerts Snoozed",
      description: `${selectedAlerts.length} alerts have been snoozed for 7 days.`,
    });

    setSelectedAlerts([]);
  };

  const handleBulkActivate = () => {
    setUserAlerts(
      userAlerts.map((alert) =>
        selectedAlerts.includes(alert.id)
          ? { ...alert, isActive: true, snoozedUntil: undefined }
          : alert
      )
    );

    toast({
      title: "Alerts Activated",
      description: `${selectedAlerts.length} alerts have been activated.`,
    });

    setSelectedAlerts([]);
  };

  const handleExportAlerts = () => {
    toast({
      title: "Alerts Exported",
      description: "Alert log has been exported as CSV.",
    });
  };

  const getCategoryColor = (category: AlertCategory) => {
    switch (category) {
      case "Market":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Macro":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "ESG":
        return "bg-green-50 text-green-600 border-green-200";
      case "Portfolio":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Research":
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
      case "System":
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div
        className="mb-6 p-4 rounded-md shadow-sm"
        style={{ background: "linear-gradient(to right, #d5e2f3, #effcec)" }}
      >
        <h2 className="text-xl font-bold text-finance-blue">Alert Manager</h2>
        <p className="text-muted-foreground">
          Create and manage custom alerts for research, market, and portfolio
          events
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportAlerts}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button onClick={handleCreateAlert} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active
            <Badge className="ml-2 h-5 bg-green-500">
              {userAlerts.filter((a) => a.isActive && !a.snoozedUntil).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="snoozed">
            <Clock className="mr-2 h-4 w-4" />
            Snoozed
          </TabsTrigger>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
        </TabsList>
      </Tabs>

      {selectedAlerts.length > 0 && (
        <div className="bg-muted p-3 rounded-md mb-4 flex justify-between items-center">
          <span className="text-sm font-medium">
            {selectedAlerts.length} alerts selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBulkActivate}>
              <Check className="mr-2 h-4 w-4" />
              Activate
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkSnooze}>
              <Clock className="mr-2 h-4 w-4" />
              Snooze
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-finance-blue text-white">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedAlerts.length === filteredAlerts.length &&
                      filteredAlerts.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all alerts"
                  />
                </TableHead>
                <TableHead className="text-white">Alert Name</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Notification</TableHead>
                <TableHead className="hidden md:table-cell text-white">
                  Status
                </TableHead>
                <TableHead className="hidden md:table-cell text-white">
                  Created
                </TableHead>
                <TableHead className="w-[250px] text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="h-10 w-10 mb-2" />
                      <p className="text-lg font-medium">No alerts found</p>
                      <p className="text-sm">
                        {searchQuery
                          ? "No alerts match your search criteria."
                          : activeTab === "snoozed"
                          ? "You don't have any snoozed alerts."
                          : activeTab === "active"
                          ? "You don't have any active alerts."
                          : "You don't have any alerts yet."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedAlerts.includes(alert.id)}
                        onCheckedChange={(checked) =>
                          handleSelectAlert(alert.id, checked === true)
                        }
                        aria-label={`Select ${alert.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{alert.name}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {alert.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getCategoryColor(alert.category)}
                      >
                        {alert.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {alert.notificationMethod.includes("in-app") && (
                          <Badge variant="secondary" className="h-6">
                            In-app
                          </Badge>
                        )}
                        {alert.notificationMethod.includes("email") && (
                          <Badge variant="outline" className="h-6">
                            Email
                          </Badge>
                        )}
                        {alert.notificationMethod.includes("sms") && (
                          <Badge variant="outline" className="h-6">
                            SMS
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {alert.snoozedUntil ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-600 border-amber-200"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          Snoozed
                        </Badge>
                      ) : alert.isActive ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 border-green-200"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-600 border-gray-200"
                        >
                          <X className="mr-1 h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAlert(alert)}
                        >
                          Edit
                        </Button>

                        {alert.snoozedUntil ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleSnooze(alert.id, false)}
                          >
                            Unsnooze
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleSnooze(alert.id, true)}
                          >
                            Snooze
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleToggleAlertActive(alert.id, !alert.isActive)
                          }
                        >
                          {alert.isActive ? "Disable" : "Enable"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="text-destructive hover:text-destructive hover:border-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alert Dialog */}
      <AlertDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        alert={selectedAlert}
        onSave={handleSaveAlert}
      />
    </div>
  );
}
export default AlertManager;
