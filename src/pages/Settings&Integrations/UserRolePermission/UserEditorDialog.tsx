import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";
import { Permission, PermissionAction, User, UserRole } from "../ToolsModel";

interface UserEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  roles: UserRole[];
  onSave: (user: User) => void;
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

export default function UserEditorDialog({
  open,
  onOpenChange,
  user,
  roles,
  onSave
}: UserEditorDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [hasCustomPermissions, setHasCustomPermissions] = useState(false);
  const [customPermissions, setCustomPermissions] = useState<Permission[]>([]);
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRoleId(user.roleId);
      setIsActive(user.isActive);
      setHasCustomPermissions(!!user.customPermissions && user.customPermissions.length > 0);
      setCustomPermissions(user.customPermissions || []);
    } else {
      resetForm();
    }
  }, [user]);
  
  const resetForm = () => {
    setName("");
    setEmail("");
    setRoleId("");
    setIsActive(true);
    setHasCustomPermissions(false);
    setCustomPermissions([]);
  };
  
  const handleSave = () => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      name,
      email,
      roleId,
      roleName: roles.find(r => r.id === roleId)?.name || user.roleName,
      isActive,
      customPermissions: hasCustomPermissions ? customPermissions : undefined
    };
    
    onSave(updatedUser);
  };
  
  const getSelectedRole = () => {
    return roles.find(r => r.id === roleId);
  };
  
  const hasPermission = (resource: string, action: string) => {
    return customPermissions.some(p => p.resource === resource && p.action === action);
  };
  
  const togglePermission = (resource: string, action: string) => {
    const permissionExists = hasPermission(resource, action);
    
    if (permissionExists) {
      setCustomPermissions(customPermissions.filter(p => !(p.resource === resource && p.action === action)));
    } else {
      setCustomPermissions([...customPermissions, { resource, action: action as PermissionAction }]);
    }
  };
  
  const toggleAllResourcePermissions = (resource: string, checked: boolean) => {
    if (checked) {
      // Add all permissions for this resource if they don't exist
      const actionsToAdd = resourcesWithActions[resource];
      const newPermissions = [...customPermissions];
      
      actionsToAdd.forEach(action => {
        if (!hasPermission(resource, action)) {
          newPermissions.push({ resource, action: action as PermissionAction });
        }
      });
      
      setCustomPermissions(newPermissions);
    } else {
      // Remove all permissions for this resource
      setCustomPermissions(customPermissions.filter(p => p.resource !== resource));
    }
  };
  
  const allResourcePermissionsSelected = (resource: string) => {
    const actions = resourcesWithActions[resource];
    return actions.every(action => hasPermission(resource, action));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[70vh]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user-name">Name</Label>
                <Input
                  id="user-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user-role">Role</Label>
                <Select value={roleId} onValueChange={setRoleId}>
                  <SelectTrigger id="user-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {roleId && getSelectedRole() && (
                  <div className="text-sm text-muted-foreground pt-1">
                    {getSelectedRole()?.description}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="user-active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
                <Label htmlFor="user-active">Active User</Label>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="custom-permissions"
                    checked={hasCustomPermissions}
                    onCheckedChange={setHasCustomPermissions}
                  />
                  <Label htmlFor="custom-permissions">Custom Permissions</Label>
                </div>
                
                <div className="text-sm text-muted-foreground pt-1">
                  Override default role permissions with custom settings for this user
                </div>
              </div>
              
              {hasCustomPermissions && (
                <div className="pt-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-medium">Custom Permissions</h3>
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
              )}
            </div>
          </ScrollArea>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !email.trim() || !roleId}
            >
              Update User
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
