import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Check, X, Mail, Trash, ShieldCheck, History } from "lucide-react";
import RoleEditorDialog from "./RoleEditorDialog";
import UserEditorDialog from "./UserEditorDialog";
import PermissionsMatrixDialog from "./PermissionMatixDialog";
import { RoleChangeAudit, User, UserRole } from "../ToolsModel";
import { roleChangeAudits, userRoles, users } from "../ToolSettingData";

 function UserRolePermission() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isMatrixDialogOpen, setIsMatrixDialogOpen] = useState(false);
  const [isDeleteRoleDialogOpen, setIsDeleteRoleDialogOpen] = useState(false);
  
  const [rolesList, setRolesList] = useState<UserRole[]>(userRoles);
  const [usersList, setUsersList] = useState<User[]>(users);
  const [auditLogs, setAuditLogs] = useState<RoleChangeAudit[]>(roleChangeAudits);
  
  // Invite dialog state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  
  // Filter users based on search query
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.roleName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter roles based on search query
  const filteredRoles = rolesList.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter audit logs based on search query
  const filteredAudits = auditLogs.filter(audit => 
    audit.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.previousRoleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.newRoleName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsRoleDialogOpen(true);
  };
  
  const handleEditRole = (role: UserRole) => {
    setSelectedRole(role);
    setIsRoleDialogOpen(true);
  };
  
  const handleDeleteRole = (role: UserRole) => {
    setSelectedRole(role);
    setIsDeleteRoleDialogOpen(true);
  };
  
  const confirmDeleteRole = () => {
    if (selectedRole) {
      // Check if role is in use
      const roleInUse = usersList.some(user => user.roleId === selectedRole.id);
      if (roleInUse) {
        toast({
          title: "Cannot Delete Role",
          description: "This role is currently assigned to one or more users.",
          variant: "destructive"
        });
      } else {
        setRolesList(rolesList.filter(role => role.id !== selectedRole.id));
        setIsDeleteRoleDialogOpen(false);
        toast({
          title: "Role Deleted",
          description: `The "${selectedRole.name}" role has been deleted.`,
          variant: "destructive"
        });
      }
    }
  };
  
  const handleSaveRole = (role: UserRole) => {
    if (selectedRole) {
      // Edit existing role
      setRolesList(rolesList.map(r => r.id === role.id ? role : r));
      toast({
        title: "Role Updated",
        description: `The "${role.name}" role has been updated.`,
      });
    } else {
      // Create new role
      setRolesList([...rolesList, role]);
      toast({
        title: "Role Created",
        description: `The "${role.name}" role has been created.`,
      });
    }
    setIsRoleDialogOpen(false);
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };
  
  const handleToggleUserActive = (userId: string, active: boolean) => {
    setUsersList(usersList.map(user => 
      user.id === userId ? { ...user, isActive: active } : user
    ));
    
    toast({
      title: active ? "User Activated" : "User Deactivated",
      description: active ? "User has been activated." : "User has been deactivated.",
    });
  };
  
  const handleSaveUser = (user: User) => {
    // Record audit log if role changed
    const existingUser = usersList.find(u => u.id === user.id);
    if (existingUser && existingUser.roleId !== user.roleId) {
      const newRole = rolesList.find(r => r.id === user.roleId);
      const oldRole = rolesList.find(r => r.id === existingUser.roleId);
      
      if (newRole && oldRole) {
        const newAudit: RoleChangeAudit = {
          id: `audit-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          previousRoleId: existingUser.roleId,
          previousRoleName: oldRole.name,
          newRoleId: user.roleId,
          newRoleName: newRole.name,
          changedBy: "Current User",
          changedAt: new Date().toISOString()
        };
        
        setAuditLogs([newAudit, ...auditLogs]);
      }
    }
    
    setUsersList(usersList.map(u => u.id === user.id ? user : u));
    setIsUserDialogOpen(false);
    
    toast({
      title: "User Updated",
      description: `${user.name}'s information has been updated.`,
    });
  };
  
  const handleInviteUser = () => {
    if (!inviteEmail || !inviteRole) {
      toast({
        title: "Incomplete Information",
        description: "Email and role are required.",
        variant: "destructive"
      });
      return;
    }
    
    const selectedRoleObj = rolesList.find(role => role.id === inviteRole);
    if (!selectedRoleObj) {
      toast({
        title: "Invalid Role",
        description: "Please select a valid role.",
        variant: "destructive"
      });
      return;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: inviteEmail.split('@')[0], // Temporary name from email
      email: inviteEmail,
      roleId: selectedRoleObj.id,
      roleName: selectedRoleObj.name,
      isActive: true
    };
    
    setUsersList([...usersList, newUser]);
    setIsInviteDialogOpen(false);
    setInviteEmail("");
    setInviteRole("");
    
    toast({
      title: "User Invited",
      description: `Invitation has been sent to ${inviteEmail}.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-finance-blue">User Roles & Permissions</h2>
        <p className="text-muted-foreground">
          Manage user access levels, roles, and permissions across the platform
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button variant="outline" onClick={() => setIsMatrixDialogOpen(true)}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Permissions Matrix
          </Button>
          {activeTab === "roles" ? (
            <Button onClick={handleCreateRole}>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          ) : activeTab === "users" ? (
            <Button onClick={() => setIsInviteDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          ) : null}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>
    
      
      <TabsContent value="users" className="mt-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-finance-blue text-white">
                <TableRow>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="hidden md:table-cell text-white">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-white">Last Login</TableHead>
                  <TableHead className="w-[200px] text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <p className="text-lg font-medium">No users found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? "No users match your search criteria."
                            : "You haven't added any users yet."}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.roleName}
                        </Badge>
                        {user.customPermissions && user.customPermissions.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            Custom
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.isActive ? (
                          <Badge className="bg-green-50 text-green-600 border-green-200">
                            <Check className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-red-50 text-red-600 border-red-200">
                            <X className="mr-1 h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            Edit
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleUserActive(user.id, !user.isActive)}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
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
      </TabsContent>
      
      <TabsContent value="roles" className="mt-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader  className="bg-finance-blue text-white">
                <TableRow>
                  <TableHead className="text-white">Role Name</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">Permissions</TableHead>
                  <TableHead className="hidden md:table-cell text-white ">Created</TableHead>
                  <TableHead className="hidden md:table-cell text-white">Updated</TableHead>
                  <TableHead className="w-[200px] text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <p className="text-lg font-medium">No roles found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? "No roles match your search criteria."
                            : "You haven't created any roles yet."}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="font-medium">{role.name}</div>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.length > 3 ? (
                            <>
                              <Badge variant="outline">
                                {role.permissions.length} permissions
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => {
                                  setSelectedRole(role);
                                  setIsMatrixDialogOpen(true);
                                }}
                              >
                                View
                              </Button>
                            </>
                          ) : (
                            role.permissions.map((permission, index) => (
                              <Badge key={index} variant="outline">
                                {permission.resource}.{permission.action}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(role.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(role.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditRole(role)}
                          >
                            Edit
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive hover:text-destructive hover:border-destructive"
                            onClick={() => handleDeleteRole(role)}
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
      </TabsContent>
      
      <TabsContent value="audit" className="mt-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-finance-blue text-white">
                <TableRow>
                  <TableHead className="text-white">User</TableHead>
                  <TableHead className="text-white">Change</TableHead>
                  <TableHead className="text-white">Changed By</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <History className="h-10 w-10 mb-2" />
                        <p className="text-lg font-medium">No audit logs found</p>
                        <p className="text-sm">
                          {searchQuery
                            ? "No audit records match your search criteria."
                            : "There are no role changes recorded yet."}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAudits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell>
                        <div className="font-medium">{audit.userName}</div>
                      </TableCell>
                      <TableCell>
                        Role changed from <Badge variant="outline">{audit.previousRoleName}</Badge>
                        {" "}to{" "}
                        <Badge variant="outline">{audit.newRoleName}</Badge>
                      </TableCell>
                      <TableCell>{audit.changedBy}</TableCell>
                      <TableCell>
                        {new Date(audit.changedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
        </Tabs>
      {/* Role Editor Dialog */}
      <RoleEditorDialog 
        open={isRoleDialogOpen}
        onOpenChange={setIsRoleDialogOpen}
        role={selectedRole}
        onSave={handleSaveRole}
      />
      
      {/* User Editor Dialog */}
      <UserEditorDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        user={selectedUser}
        roles={rolesList}
        onSave={handleSaveUser}
      />
      
      {/* Permissions Matrix Dialog */}
      <PermissionsMatrixDialog
        open={isMatrixDialogOpen}
        onOpenChange={setIsMatrixDialogOpen}
        roles={rolesList}
        selectedRoleId={selectedRole?.id}
      />
      
      {/* Delete Role Dialog */}
      <Dialog open={isDeleteRoleDialogOpen} onOpenChange={setIsDeleteRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{selectedRole?.name}" role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteRoleDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteRole}>Delete Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite User Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>
              Send an invitation to a new user with a pre-assigned role.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Assign Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {rolesList.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleInviteUser}
              disabled={!inviteEmail || !inviteRole}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default UserRolePermission
