import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Check, ShieldAlert, X } from "lucide-react";
import { UserRole } from "../ToolsModel";

interface PermissionsMatrixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roles: UserRole[];
  selectedRoleId?: string;
}

// Define all available resources and their actions for the matrix
const allResources = [
  { id: "reports", name: "Reports", actions: ["create", "read", "update", "delete", "approve"] },
  { id: "valuation", name: "Valuation", actions: ["create", "read", "update", "delete", "approve"] },
  { id: "watchlists", name: "Watchlists", actions: ["create", "read", "update", "delete"] },
  { id: "trading", name: "Trading", actions: ["create", "read", "update", "delete"] },
  { id: "users", name: "Users", actions: ["create", "read", "update", "delete"] },
  { id: "settings", name: "Settings", actions: ["create", "read", "update", "delete"] },
];

export default function PermissionsMatrixDialog({
  open,
  onOpenChange,
  roles,
  selectedRoleId
}: PermissionsMatrixDialogProps) {
  const [displayRoles, setDisplayRoles] = useState<UserRole[]>([]);
  
  // Filter roles to show if a specific role is selected
  useEffect(() => {
    if (selectedRoleId) {
      const role = roles.find(r => r.id === selectedRoleId);
      setDisplayRoles(role ? [role] : []);
    } else {
      setDisplayRoles(roles);
    }
  }, [roles, selectedRoleId]);
  
  // Check if a role has a specific permission
  const hasPermission = (roleId: string, resource: string, action: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.some(p => p.resource === resource && p.action === action) || false;
  };
  
  return (
   <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
    <DialogHeader>
      <DialogTitle className="flex items-center">
        <ShieldAlert className="mr-2 h-5 w-5 text-amber-500" />
        Permissions Matrix
      </DialogTitle>
    </DialogHeader>

    {/* Scrollable table area */}
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="w-full min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Resource</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
                {displayRoles.map(role => (
                  <TableHead key={role.id} className="text-center">
                    {role.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allResources.map(resource =>
                resource.actions.map((action, actionIndex) => (
                  <TableRow key={`${resource.id}-${action}`}>
                    {actionIndex === 0 ? (
                      <TableCell
                        className="font-medium capitalize bg-muted/30"
                        rowSpan={resource.actions.length}
                      >
                        {resource.name}
                      </TableCell>
                    ) : null}
                    <TableCell className="capitalize">{action}</TableCell>
                    {displayRoles.map(role => (
                      <TableCell key={role.id} className="text-center">
                        {hasPermission(role.id, resource.id, action) ? (
                          <Check className="h-5 w-5 mx-auto text-green-600" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-gray-300" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>

    <DialogFooter className="pt-4">
      <Button onClick={() => onOpenChange(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
}
