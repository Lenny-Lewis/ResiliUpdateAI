import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Users, Shield, FileText, UserPlus, Edit, Trash2, Key, Activity, Download, LogOut, Save, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ScrollArea } from "../components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar?: string;
}

interface Role {
  name: string;
  description: string;
  permissions: string[];
  users: number;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@nexacorp.com",
    role: "Continuity Manager",
    status: "active",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@nexacorp.com",
    role: "Resilience Officer",
    status: "active",
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@nexacorp.com",
    role: "Analyst",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@nexacorp.com",
    role: "Admin",
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@nexacorp.com",
    role: "Analyst",
    status: "inactive",
    lastActive: "2 days ago",
  },
];

const initialRoles: Role[] = [
  {
    name: "Admin",
    description: "Full system access including user management",
    permissions: ["All permissions"],
    users: 1,
  },
  {
    name: "Continuity Manager",
    description: "Manage business continuity plans and interventions",
    permissions: ["View dashboards", "Manage continuity plans", "Assign tasks", "Generate reports"],
    users: 1,
  },
  {
    name: "Resilience Officer",
    description: "Monitor risks and coordinate response efforts",
    permissions: ["View dashboards", "Monitor risks", "View reports", "Update alerts"],
    users: 1,
  },
  {
    name: "Analyst",
    description: "Analyze data and generate insights",
    permissions: ["View dashboards", "Run predictions", "View reports", "Export data"],
    users: 2,
  },
];

const auditLogs = [
  {
    id: 1,
    timestamp: "2026-03-02 14:35:22",
    user: "Sarah Johnson",
    action: "Activated backup system protocol",
    category: "System",
    severity: "high",
  },
  {
    id: 2,
    timestamp: "2026-03-02 14:28:15",
    user: "Michael Chen",
    action: "Updated risk assessment for Region A",
    category: "Data",
    severity: "moderate",
  },
  {
    id: 3,
    timestamp: "2026-03-02 14:15:08",
    user: "James Wilson",
    action: "Added new user: Lisa Anderson",
    category: "User Management",
    severity: "low",
  },
  {
    id: 4,
    timestamp: "2026-03-02 14:05:42",
    user: "Emily Rodriguez",
    action: "Generated quarterly compliance report",
    category: "Reports",
    severity: "low",
  },
  {
    id: 5,
    timestamp: "2026-03-02 13:58:30",
    user: "Sarah Johnson",
    action: "Modified continuity plan workflow",
    category: "Configuration",
    severity: "moderate",
  },
  {
    id: 6,
    timestamp: "2026-03-02 13:45:18",
    user: "Michael Chen",
    action: "Viewed sensitive disaster prediction data",
    category: "Data Access",
    severity: "moderate",
  },
];

const availablePermissions = [
  "View dashboards",
  "Manage continuity plans",
  "Assign tasks",
  "Generate reports",
  "Monitor risks",
  "Update alerts",
  "Run predictions",
  "Export data",
  "User management",
  "System configuration",
  "All permissions",
];

export function AdminSettings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-cyan-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-orange-500",
      "bg-red-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast.error("Please fill in all fields");
      return;
    }

    const user: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastActive: "Just now",
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "" });
    setIsAddUserOpen(false);
    toast.success(`User ${newUser.name} added successfully!`);
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    setUsers(users.filter((u) => u.id !== userId));
    toast.success(`User ${user?.name} deleted successfully!`);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole({ ...role });
    setIsEditRoleOpen(true);
  };

  const handleSaveRole = () => {
    if (!selectedRole) return;

    setRoles(roles.map((r) => (r.name === selectedRole.name ? selectedRole : r)));
    setIsEditRoleOpen(false);
    toast.success(`Role ${selectedRole.name} updated successfully!`);
  };

  const togglePermission = (permission: string) => {
    if (!selectedRole) return;

    const hasPermission = selectedRole.permissions.includes(permission);
    const newPermissions = hasPermission
      ? selectedRole.permissions.filter((p) => p !== permission)
      : [...selectedRole.permissions, permission];

    setSelectedRole({ ...selectedRole, permissions: newPermissions });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Admin Settings</h1>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          Administrator Panel
        </Badge>
      </div>

      {/* User Management */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              User Management
            </CardTitle>
            <Button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={() => setIsAddUserOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800/50">
                <TableHead className="text-gray-400">User</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Role</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Last Active</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className={`${getAvatarColor(user.name)} text-white`}>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-200">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === "active"
                          ? "text-green-400 border-green-400"
                          : "text-gray-400 border-gray-400"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Role Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-gray-100 mb-1">{role.name}</h4>
                    <p className="text-sm text-gray-400">{role.description}</p>
                  </div>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {role.users} user{role.users !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Permissions:</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.slice(0, 3).map((permission, pIndex) => (
                      <Badge key={pIndex} className="bg-cyan-500/20 text-cyan-400 text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {role.permissions.length > 3 && (
                      <Badge className="bg-gray-700 text-gray-400 text-xs">
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-3 w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => handleEditRole(role)}
                >
                  <Edit className="w-3 h-3 mr-2" />
                  Edit Permissions
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-gray-100 mb-1">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400">Require 2FA for all user accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-gray-100 mb-1">Session Timeout</h4>
                  <p className="text-sm text-gray-400">Auto-logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-100 mb-1">IP Whitelisting</h4>
                  <p className="text-sm text-gray-400">Restrict access to approved IP addresses</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-gray-100 mb-3">Password Policy</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="min-length" className="text-gray-300">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="min-length"
                    type="number"
                    defaultValue="12"
                    className="mt-1 bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Label className="text-gray-300">Require special characters</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Label className="text-gray-300">Require uppercase and lowercase</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Label className="text-gray-300">Password expiration (90 days)</Label>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="text-cyan-400 mb-1">Security Status: Protected</h4>
                  <p className="text-sm text-gray-300">
                    Authentication uses <span className="text-cyan-400">JWT tokens</span> and passwords are hashed with{" "}
                    <span className="text-cyan-400">bcrypt</span>. All data transmissions are encrypted via HTTPS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Logs and Audit Trail */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            System Logs & Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2 pr-4">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className={`bg-gray-800 rounded-lg p-3 border transition-colors ${
                    log.severity === "high"
                      ? "border-red-500/30 hover:border-red-500/50"
                      : log.severity === "moderate"
                      ? "border-yellow-500/30 hover:border-yellow-500/50"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">
                          {log.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            log.severity === "high"
                              ? "text-red-400 border-red-400 text-xs"
                              : log.severity === "moderate"
                              ? "text-yellow-400 border-yellow-400 text-xs"
                              : "text-gray-400 border-gray-400 text-xs"
                          }
                        >
                          {log.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-200">{log.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {log.user}
                    </span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              Filter Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="user-name"
                placeholder="John Doe"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="user-email"
                type="email"
                placeholder="john.doe@nexacorp.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-role" className="text-gray-300">
                Role
              </Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {roles.map((role) => (
                    <SelectItem key={role.name} value={role.name} className="text-gray-100">
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="border-gray-600 text-gray-300">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-gray-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Edit Role: {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Description</Label>
              <Input
                value={selectedRole?.description || ""}
                onChange={(e) =>
                  selectedRole && setSelectedRole({ ...selectedRole, description: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Permissions</Label>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-3 bg-gray-800 rounded-lg border border-gray-700">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Switch
                      checked={selectedRole?.permissions.includes(permission)}
                      onCheckedChange={() => togglePermission(permission)}
                    />
                    <Label className="text-sm text-gray-300">{permission}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditRoleOpen(false)}
              className="border-gray-600 text-gray-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveRole} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
