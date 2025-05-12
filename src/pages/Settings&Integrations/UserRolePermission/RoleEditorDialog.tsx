import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";
import { Permission, PermissionAction, UserRole } from "../ToolsModel";

interface RoleEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: UserRole | null;
  onSave: (role: UserRole) => void;
}

// Define available resources and their possible actions
const resourcesWithActions: Record<string, string[]> = {
  reports: ["create", "read", "update", "delete", "approve"],
  valuation: ["create", "read", "update", "delete", "approve"],
  watchlists: ["create", "read", "update", "delete"],
  trading: ["create", "read", "update", "delete"],
  users: ["create", "read", "update", "delete"],
  settings: ["create", "read", "update", "delete"],
};

export default function RoleEditorDialog({
  open,
  onOpenChange,
  role,
  onSave
}: RoleEditorDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  
  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
      setPermissions([...role.permissions]);
    } else {
      resetForm();
    }
  }, [role]);
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setPermissions([]);
  };
  
  const handleSave = () => {
    const newRole: UserRole = {
      id: role?.id || `role-${Date.now()}`,
      name,
      description,
      permissions,
      createdAt: role?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(newRole);
  };
  
  const hasPermission = (resource: string, action: string) => {
    return permissions.some(p => p.resource === resource && p.action === action);
  };
  
  const togglePermission = (resource: string, action: string) => {
    const permissionExists = hasPermission(resource, action);
    
    if (permissionExists) {
      setPermissions(permissions.filter(p => !(p.resource === resource && p.action === action)));
    } else {
      setPermissions([...permissions, { resource, action: action as PermissionAction }]);
    }
  };
  
  const toggleAllResourcePermissions = (resource: string, checked: boolean) => {
    if (checked) {
      // Add all permissions for this resource if they don't exist
      const actionsToAdd = resourcesWithActions[resource];
      const newPermissions = [...permissions];
      
      actionsToAdd.forEach(action => {
        if (!hasPermission(resource, action)) {
          newPermissions.push({ resource, action: action as PermissionAction });
        }
      });
      
      setPermissions(newPermissions);
    } else {
      // Remove all permissions for this resource
      setPermissions(permissions.filter(p => p.resource !== resource));
    }
  };
  
  const allResourcePermissionsSelected = (resource: string) => {
    const actions = resourcesWithActions[resource];
    return actions.every(action => hasPermission(resource, action));
  };
  
  const someResourcePermissionsSelected = (resource: string) => {
    const actions = resourcesWithActions[resource];
    return actions.some(action => hasPermission(resource, action)) && 
           !actions.every(action => hasPermission(resource, action));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>{role ? "Edit" : "Create"} Role</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Analyst, Portfolio Manager, Admin"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose and scope of this role"
                  rows={2}
                />
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-indigo-500" />
                  <h3 className="text-lg font-medium">Permissions</h3>
                </div>
                
                <Accordion type="multiple" className="w-full">
                  {Object.keys(resourcesWithActions).map((resource) => (
                    <AccordionItem key={resource} value={resource}>
                      <AccordionTrigger className="py-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`select-all-${resource}`}
                            checked={allResourcePermissionsSelected(resource)} 
                            onCheckedChange={(checked) => toggleAllResourcePermissions(resource, !!checked)}
                            className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                            aria-label={`Select all ${resource} permissions`}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="font-medium capitalize">{resource}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-8 space-y-2 py-2">
                          {resourcesWithActions[resource].map((action) => (
                            <div key={`${resource}-${action}`} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`${resource}-${action}`}
                                checked={hasPermission(resource, action)} 
                                onCheckedChange={(checked) => togglePermission(resource, action)}
                                className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                              />
                              <Label 
                                htmlFor={`${resource}-${action}`}
                                className="capitalize cursor-pointer"
                              >
                                {action}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim()}
            >
              {role ? "Update Role" : "Create Role"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
