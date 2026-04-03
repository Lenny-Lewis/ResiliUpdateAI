import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Activity, Shield, Cpu, MessageSquare, AlertTriangle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ScrollArea } from "../components/ui/scroll-area";

const environmentalData = [
  { time: "00:00", temperature: 22, humidity: 65, windSpeed: 12, pressure: 1013 },
  { time: "04:00", temperature: 20, humidity: 70, windSpeed: 15, pressure: 1012 },
  { time: "08:00", temperature: 24, humidity: 60, windSpeed: 18, pressure: 1011 },
  { time: "12:00", temperature: 28, humidity: 55, windSpeed: 22, pressure: 1010 },
  { time: "16:00", temperature: 30, humidity: 50, windSpeed: 25, pressure: 1009 },
  { time: "20:00", temperature: 26, humidity: 58, windSpeed: 20, pressure: 1010 },
];

const disasterTrends = [
  { month: "Sep", earthquakes: 12, floods: 8, fires: 5, storms: 15 },
  { month: "Oct", earthquakes: 15, floods: 12, fires: 7, storms: 18 },
  { month: "Nov", earthquakes: 10, floods: 15, fires: 10, storms: 22 },
  { month: "Dec", earthquakes: 18, floods: 10, fires: 8, storms: 20 },
  { month: "Jan", earthquakes: 14, floods: 18, fires: 12, storms: 25 },
  { month: "Feb", earthquakes: 20, floods: 14, fires: 15, storms: 28 },
];

const realtimeAlerts = [
  {
    id: 1,
    source: "Environmental",
    message: "Seismic activity detected: Magnitude 4.2",
    severity: "high",
    timestamp: "2026-03-02 14:35:22",
    location: "Region A-5",
  },
  {
    id: 2,
    source: "Cybersecurity",
    message: "Suspicious login attempts from unknown IP",
    severity: "moderate",
    timestamp: "2026-03-02 14:28:15",
    location: "Network Zone 3",
  },
  {
    id: 3,
    source: "Operational",
    message: "Power fluctuation in backup generator",
    severity: "low",
    timestamp: "2026-03-02 14:15:08",
    location: "Facility B",
  },
  {
    id: 4,
    source: "Social Media",
    message: "Increased mentions of infrastructure concerns",
    severity: "moderate",
    timestamp: "2026-03-02 14:05:42",
    location: "Social Analytics",
  },
  {
    id: 5,
    source: "Environmental",
    message: "Rising water levels in monitoring station #7",
    severity: "high",
    timestamp: "2026-03-02 13:58:30",
    location: "Station 7",
  },
];

const dataFeeds = [
  { name: "Environmental Sensors", status: "active", dataPoints: 1247, lastUpdate: "2 sec ago" },
  { name: "Cybersecurity Logs", status: "active", dataPoints: 3891, lastUpdate: "5 sec ago" },
  { name: "Operational Metrics", status: "active", dataPoints: 756, lastUpdate: "8 sec ago" },
  { name: "Social Media Signals", status: "degraded", dataPoints: 2143, lastUpdate: "45 sec ago" },
];

export function RiskMonitoring() {
  return (
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl">Risk Monitoring</h1>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Live Monitoring
        </Badge>
      </div>

      {/* Data Feeds Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataFeeds.map((feed, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  {feed.name.includes("Environmental") && <Activity className="w-5 h-5 text-cyan-400" />}
                  {feed.name.includes("Cyber") && <Shield className="w-5 h-5 text-cyan-400" />}
                  {feed.name.includes("Operational") && <Cpu className="w-5 h-5 text-cyan-400" />}
                  {feed.name.includes("Social") && <MessageSquare className="w-5 h-5 text-cyan-400" />}
                </div>
                <Badge
                  variant="outline"
                  className={
                    feed.status === "active"
                      ? "text-green-400 border-green-400"
                      : "text-yellow-400 border-yellow-400"
                  }
                >
                  {feed.status}
                </Badge>
              </div>
              <h3 className="text-sm text-gray-400 mb-1">{feed.name}</h3>
              <p className="text-2xl text-gray-100 mb-1">{feed.dataPoints.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{feed.lastUpdate}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environmental Data Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Environmental Sensor Data (24h)
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[320px]">
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={environmentalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#D1D5DB" }}
              />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#22D3EE" name="Temperature (°C)" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="windSpeed" stroke="#F59E0B" name="Wind Speed (km/h)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#8B5CF6" name="Humidity (%)" strokeWidth={2} />
            </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Disaster Trends */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Disaster Trends (6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[320px]">
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={disasterTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#D1D5DB" }}
              />
              <Area type="monotone" dataKey="earthquakes" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Earthquakes" />
              <Area type="monotone" dataKey="floods" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Floods" />
              <Area type="monotone" dataKey="fires" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Fires" />
              <Area type="monotone" dataKey="storms" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Storms" />
            </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Alerts Panel */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-cyan-400" />
            Real-time Alerts Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3 pr-4">
              {realtimeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`bg-gray-800 rounded-lg p-4 border transition-colors ${
                    alert.severity === "high"
                      ? "border-red-500/30 hover:border-red-500/50"
                      : alert.severity === "moderate"
                      ? "border-yellow-500/30 hover:border-yellow-500/50"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          alert.severity === "high"
                            ? "bg-red-500"
                            : alert.severity === "moderate"
                            ? "bg-yellow-500"
                            : "bg-cyan-500"
                        }`}
                      />
                      <span className="text-sm text-cyan-400">{alert.source}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        alert.severity === "high"
                          ? "text-red-400 border-red-400"
                          : alert.severity === "moderate"
                          ? "text-yellow-400 border-yellow-400"
                          : "text-cyan-400 border-cyan-400"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-200 mb-2">{alert.message}</p>
                  <div className="flex flex-col gap-1 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>{alert.location}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
