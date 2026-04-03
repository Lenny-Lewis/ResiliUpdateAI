import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Filter, Download, RefreshCcw, Eye, Lock, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ScrollArea } from "../components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";

interface SecurityLog {
  id: number;
  timestamp: string;
  event: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  source: string;
  ipAddress: string;
  user?: string;
  action: string;
  status: "blocked" | "allowed" | "flagged";
  details: string;
}

const initialLogs: SecurityLog[] = [
  {
    id: 1,
    timestamp: "2026-03-31 14:35:22",
    event: "Unauthorized Access Attempt",
    severity: "critical",
    source: "Admin Panel",
    ipAddress: "185.220.101.42",
    user: "Unknown",
    action: "Login attempt with invalid credentials",
    status: "blocked",
    details: "Multiple failed login attempts detected from suspicious IP",
  },
  {
    id: 2,
    timestamp: "2026-03-31 14:28:15",
    event: "SQL Injection Attempt",
    severity: "critical",
    source: "API Endpoint",
    ipAddress: "203.113.78.156",
    user: "Anonymous",
    action: "Malicious SQL query detected",
    status: "blocked",
    details: "WAF blocked SQL injection attempt on /api/reports endpoint",
  },
  {
    id: 3,
    timestamp: "2026-03-31 14:15:08",
    event: "Suspicious File Upload",
    severity: "high",
    source: "File Upload Module",
    ipAddress: "98.142.23.67",
    user: "emily.rodriguez@nexacorp.com",
    action: "Attempted to upload .exe file",
    status: "blocked",
    details: "Executable file upload blocked - only image files allowed",
  },
  {
    id: 4,
    timestamp: "2026-03-31 14:05:42",
    event: "Rate Limit Exceeded",
    severity: "medium",
    source: "API Gateway",
    ipAddress: "45.89.123.201",
    user: "api_client_7734",
    action: "Exceeded API rate limit",
    status: "flagged",
    details: "Client exceeded 1000 requests/hour limit - temporarily throttled",
  },
  {
    id: 5,
    timestamp: "2026-03-31 13:58:30",
    event: "Successful Authentication",
    severity: "info",
    source: "Login Portal",
    ipAddress: "192.168.1.105",
    user: "sarah.johnson@nexacorp.com",
    action: "2FA login successful",
    status: "allowed",
    details: "Normal user login with valid credentials and 2FA",
  },
  {
    id: 6,
    timestamp: "2026-03-31 13:45:18",
    event: "XSS Attack Detected",
    severity: "high",
    source: "Search Module",
    ipAddress: "167.89.45.23",
    user: "Anonymous",
    action: "Malicious script injection attempt",
    status: "blocked",
    details: "Cross-site scripting attempt blocked by input sanitization",
  },
  {
    id: 7,
    timestamp: "2026-03-31 13:32:55",
    event: "Unusual Data Access Pattern",
    severity: "medium",
    source: "Database",
    ipAddress: "10.0.0.45",
    user: "michael.chen@nexacorp.com",
    action: "Accessed sensitive disaster data",
    status: "flagged",
    details: "User accessed 500+ records in short timeframe - monitoring",
  },
  {
    id: 8,
    timestamp: "2026-03-31 13:20:11",
    event: "DDoS Attack Mitigated",
    severity: "critical",
    source: "Network Layer",
    ipAddress: "Multiple IPs",
    user: "Botnet",
    action: "Distributed denial of service attack",
    status: "blocked",
    details: "CloudFlare blocked 50,000+ requests from botnet",
  },
  {
    id: 9,
    timestamp: "2026-03-31 13:05:44",
    event: "Password Reset Requested",
    severity: "low",
    source: "Account Management",
    ipAddress: "192.168.1.88",
    user: "lisa.anderson@nexacorp.com",
    action: "Password reset initiated",
    status: "allowed",
    details: "Legitimate password reset request via verified email",
  },
  {
    id: 10,
    timestamp: "2026-03-31 12:55:33",
    event: "API Key Rotation",
    severity: "info",
    source: "Security System",
    ipAddress: "System",
    user: "System",
    action: "Automated API key rotation",
    status: "allowed",
    details: "Scheduled API key rotation completed successfully",
  },
  {
    id: 11,
    timestamp: "2026-03-31 12:42:16",
    event: "Brute Force Attack",
    severity: "critical",
    source: "Login Portal",
    ipAddress: "78.139.12.98",
    user: "admin",
    action: "100+ failed login attempts",
    status: "blocked",
    details: "IP banned for 24 hours after brute force detection",
  },
  {
    id: 12,
    timestamp: "2026-03-31 12:30:05",
    event: "Certificate Expiry Warning",
    severity: "medium",
    source: "SSL/TLS Monitor",
    ipAddress: "System",
    user: "System",
    action: "SSL certificate expires in 30 days",
    status: "flagged",
    details: "Action required: Renew SSL certificate for *.resili.ai",
  },
];

export function CyberSecurity() {
  const [logs, setLogs] = useState<SecurityLog[]>(initialLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 border-red-400";
      case "high":
        return "text-orange-400 border-orange-400";
      case "medium":
        return "text-yellow-400 border-yellow-400";
      case "low":
        return "text-blue-400 border-blue-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "blocked":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "allowed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "flagged":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm) ||
      log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const stats = {
    total: logs.length,
    critical: logs.filter((l) => l.severity === "critical").length,
    blocked: logs.filter((l) => l.status === "blocked").length,
    flagged: logs.filter((l) => l.status === "flagged").length,
  };

  const handleRefresh = () => {
    toast.success("Security logs refreshed");
  };

  const handleExport = () => {
    toast.success("Exporting security logs to CSV...");
  };

  return (
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl">Cyber Security Logs</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time security event monitoring and threat detection</p>
        </div>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          <Shield className="w-4 h-4 mr-1" />
          Active Monitoring
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Events</p>
                <p className="text-2xl font-bold text-gray-100 mt-1">{stats.total}</p>
              </div>
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-400 mt-1">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Threats Blocked</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{stats.blocked}</p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Flagged Events</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.flagged}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Filter className="w-5 h-5 text-cyan-400" />
            Filter Security Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search" className="text-gray-300 text-sm">
                Search
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by event, IP, user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-gray-100"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="severity" className="text-gray-300 text-sm">
                Severity
              </Label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="text-gray-300 text-sm">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="allowed">Allowed</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              onClick={handleRefresh}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300"
              onClick={() => {
                setSearchTerm("");
                setSeverityFilter("all");
                setStatusFilter("all");
                toast.success("Filters cleared");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Logs Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              Security Event Log ({filteredLogs.length} events)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table className="min-w-[1100px]">
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Timestamp</TableHead>
                  <TableHead className="text-gray-400">Event</TableHead>
                  <TableHead className="text-gray-400">Severity</TableHead>
                  <TableHead className="text-gray-400">Source</TableHead>
                  <TableHead className="text-gray-400">IP Address</TableHead>
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="text-gray-400 text-xs font-mono">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="text-gray-200 font-medium">{log.event}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSeverityColor(log.severity)}>
                        {log.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{log.source}</TableCell>
                    <TableCell className="text-cyan-400 font-mono text-xs">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell className="text-gray-300">{log.user || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="text-gray-300 capitalize">{log.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm max-w-xs truncate">
                      {log.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-gray-900 p-3 rounded-lg border border-gray-800">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-100 font-medium mb-1">WAF Protection Active</h4>
                <p className="text-sm text-gray-400">
                  Web Application Firewall is successfully blocking SQL injection and XSS attacks
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-900 p-3 rounded-lg border border-yellow-500/30">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-100 font-medium mb-1">SSL Certificate Renewal Needed</h4>
                <p className="text-sm text-gray-400">
                  SSL certificate for *.resili.ai expires in 30 days. Schedule renewal immediately.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-900 p-3 rounded-lg border border-gray-800">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-gray-100 font-medium mb-1">2FA Enforcement Enabled</h4>
                <p className="text-sm text-gray-400">
                  Two-factor authentication is required for all user accounts
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
