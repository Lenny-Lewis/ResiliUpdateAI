import { Outlet, NavLink } from "react-router";
import { useEffect } from "react";
import { Bell, Search, User, LayoutDashboard, CloudRain, AlertTriangle, ClipboardCheck, FileText, Settings, LogOut, Building2, X, Check, Trash2, Moon, Sun, Shield } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useAuth } from "../context/auth-context";
import { useNotifications } from "../context/notifications-context";
import { useTheme } from "../context/theme-context";
import { useNavigate } from "react-router";
import { ScrollArea } from "./ui/scroll-area";

export function Layout() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-transparent text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/50 bg-white/65 backdrop-blur-xl dark:bg-gray-900 dark:border-gray-800 flex flex-col">
        <div className="p-6 border-b border-slate-200/80 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">Resili AI</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">Disaster Management Platform</p>
          {user && (
            <div className="mt-3 border-t border-slate-200/80 pt-3 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
                <Building2 className="w-3 h-3" />
                <span className="truncate">{user.corporation}</span>
              </div>
            </div>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/disaster-prediction"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <CloudRain className="w-5 h-5" />
            <span>Disaster Prediction</span>
          </NavLink>
          <NavLink
            to="/risk-monitoring"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Risk Monitoring</span>
          </NavLink>
          <NavLink
            to="/continuity-planning"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <ClipboardCheck className="w-5 h-5" />
            <span>Continuity Planning</span>
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span>Reports & Analytics</span>
          </NavLink>
          <NavLink
            to="/admin-settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span>Admin Settings</span>
          </NavLink>
          <NavLink
            to="/cyber-security"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`
            }
          >
            <Shield className="w-5 h-5" />
            <span>Cyber Security</span>
          </NavLink>
        </nav>

        {/* User Info and Logout Section */}
        <div className="space-y-3 border-t border-slate-200/80 p-4 dark:border-gray-800">
          {user && (
            <div className="rounded-xl bg-white/70 p-3 ring-1 ring-slate-200/70 dark:bg-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-gray-100">{user.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-gray-400">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-white/50 bg-white/55 px-6 py-4 backdrop-blur-xl dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="border-slate-200 bg-white/85 pl-10 text-slate-900 shadow-sm placeholder:text-slate-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-400">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cyan-500 text-white text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/60 dark:bg-gray-900 dark:border-gray-700">
                  <DropdownMenuLabel className="flex items-center justify-between text-slate-900 dark:text-gray-100">
                    <span>Notifications</span>
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="h-auto p-1 text-xs text-cyan-700 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Mark all read
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <ScrollArea className="h-96">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-slate-500 dark:text-gray-400">
                        No notifications
                      </div>
                    ) : (
                      <div className="space-y-1 p-1">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                              !notification.read
                                ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40"
                                : "bg-slate-50/90 border-slate-200 hover:border-slate-300 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-gray-600"
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${
                                      notification.type === "alert"
                                        ? "border-red-400 text-red-500"
                                        : notification.type === "warning"
                                        ? "border-amber-400 text-amber-600"
                                        : notification.type === "success"
                                        ? "border-emerald-500 text-emerald-600"
                                        : "border-cyan-500 text-cyan-700"
                                    }`}
                                  >
                                    {notification.category}
                                  </Badge>
                                  {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                  )}
                                </div>
                                <h4 className="mb-1 text-sm font-medium text-slate-900 dark:text-gray-100">
                                  {notification.title}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400">{notification.message}</p>
                                <p className="mt-1 text-xs text-slate-400 dark:text-gray-500">{notification.timestamp}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-auto p-1 text-slate-400 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-slate-600 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-400">
                    <User className="w-5 h-5" />
                    {user && <span className="text-sm">{user.name}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/60 dark:bg-gray-800 dark:border-gray-700">
                  <DropdownMenuLabel className="text-slate-900 dark:text-gray-100">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400">{user?.email}</p>
                      <Badge variant="outline" className="mt-1 w-fit border-cyan-500 text-xs text-cyan-700 dark:text-cyan-400">
                        {user?.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-slate-700 dark:text-gray-300">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-700 dark:text-gray-300">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-slate-700 dark:text-gray-300" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-500 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-400"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
