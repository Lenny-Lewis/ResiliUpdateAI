import { Outlet, NavLink } from "react-router";
import { Bell, Search, User, LayoutDashboard, CloudRain, AlertTriangle, ClipboardCheck, FileText, Settings, LogOut, Building2, X, Check, Moon, Sun, Shield, Menu } from "lucide-react";
import { useState } from "react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function Layout() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/disaster-prediction", label: "Disaster Prediction", icon: CloudRain },
    { to: "/risk-monitoring", label: "Risk Monitoring", icon: AlertTriangle },
    { to: "/continuity-planning", label: "Continuity Planning", icon: ClipboardCheck },
    { to: "/reports", label: "Reports & Analytics", icon: FileText },
    { to: "/admin-settings", label: "Admin Settings", icon: Settings },
    { to: "/cyber-security", label: "Cyber Security", icon: Shield },
  ];

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
      isActive
        ? "border border-cyan-500/20 bg-cyan-500/12 text-cyan-700 shadow-sm dark:text-cyan-400"
        : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  const sidebarContent = (
    <>
      <div className="border-b border-slate-200/80 p-5 dark:border-gray-800 sm:p-6">
        <h1 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 sm:text-2xl">Resili AI</h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">Disaster Management Platform</p>
        {user && (
          <div className="mt-3 border-t border-slate-200/80 pt-3 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{user.corporation}</span>
            </div>
          </div>
        )}
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navLinkClassName}
              onClick={() => setMobileNavOpen(false)}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="space-y-3 border-t border-slate-200/80 p-4 dark:border-gray-800">
        {user && (
          <div className="rounded-xl bg-white/70 p-3 ring-1 ring-slate-200/70 dark:bg-gray-800">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
                <User className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-gray-100">{user.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
          </div>
        )}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-500/50 text-red-600 hover:border-red-500 hover:bg-red-500/10 dark:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-transparent text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <aside className="hidden w-64 flex-col border-r border-white/50 bg-white/65 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900 lg:flex">
        {sidebarContent}
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="border-b border-white/50 bg-white/55 px-4 py-3 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900 sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-600 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-400">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="flex w-[88vw] max-w-[20rem] flex-col border-slate-200/80 bg-white/95 p-0 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Open the Resili AI navigation menu.</SheetDescription>
                  </SheetHeader>
                  {sidebarContent}
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Resili AI</p>
                <p className="text-[11px] text-slate-500 dark:text-gray-400">Mobile workspace</p>
              </div>
            </div>

            <div className="order-3 w-full sm:order-2 sm:flex-1 sm:max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="border-slate-200 bg-white/85 pl-10 text-slate-900 shadow-sm placeholder:text-slate-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="order-2 ml-auto flex items-center gap-1 sm:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-400">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cyan-500 text-white text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] max-w-96 border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/60 dark:border-gray-700 dark:bg-gray-900">
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 text-slate-600 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-400 sm:px-3">
                    <User className="h-5 w-5" />
                    {user && <span className="hidden text-sm sm:inline">{user.name}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/60 dark:border-gray-700 dark:bg-gray-800">
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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
