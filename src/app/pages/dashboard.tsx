import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const riskScore = 42; // 0-100 scale
const riskLevel = riskScore < 33 ? "low" : riskScore < 66 ? "moderate" : "high";
const riskColor = riskLevel === "low" ? "text-cyan-400" : riskLevel === "moderate" ? "text-yellow-400" : "text-red-400";
const riskBg = riskLevel === "low" ? "bg-cyan-500/20" : riskLevel === "moderate" ? "bg-yellow-500/20" : "bg-red-500/20";

const alerts = [
  { id: 1, type: "Environmental", message: "High wind speed detected in Region A", severity: "high", time: "2 min ago" },
  { id: 2, type: "Cyber", message: "Unusual network traffic patterns", severity: "moderate", time: "15 min ago" },
  { id: 3, type: "Operational", message: "Supply chain delay in Sector B", severity: "low", time: "1 hour ago" },
];

const continuityStatus = [
  { name: "Backup Systems", status: "active", progress: 100 },
  { name: "Communication Network", status: "active", progress: 100 },
  { name: "Recovery Procedures", status: "in-progress", progress: 65 },
  { name: "Staff Training", status: "pending", progress: 30 },
];

const rocData = [
  { fpr: 0, tpr_cnn: 0, tpr_rf: 0, tpr_xgb: 0 },
  { fpr: 0.2, tpr_cnn: 0.75, tpr_rf: 0.65, tpr_xgb: 0.7 },
  { fpr: 0.4, tpr_cnn: 0.88, tpr_rf: 0.78, tpr_xgb: 0.82 },
  { fpr: 0.6, tpr_cnn: 0.95, tpr_rf: 0.87, tpr_xgb: 0.90 },
  { fpr: 0.8, tpr_cnn: 0.98, tpr_rf: 0.94, tpr_xgb: 0.96 },
  { fpr: 1, tpr_cnn: 1, tpr_rf: 1, tpr_xgb: 1 },
];

const shapData = [
  { feature: "Seismic Activity", importance: 0.28 },
  { feature: "Weather Patterns", importance: 0.22 },
  { feature: "Infrastructure Age", importance: 0.18 },
  { feature: "Population Density", importance: 0.15 },
  { feature: "Historical Data", importance: 0.10 },
  { feature: "Social Sentiment", importance: 0.07 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Dashboard Overview</h1>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Risk Score Card */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Overall Risk Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className={`${riskBg} rounded-lg p-8`}>
              <div className={`text-6xl ${riskColor}`}>{riskScore}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400">Risk Level:</span>
                <Badge className={`${riskColor}`}>{riskLevel.toUpperCase()}</Badge>
              </div>
              <p className="text-gray-400 text-sm">
                Current risk assessment based on CNN and ML model predictions. Score ranges from 0 (minimal risk) to 100 (critical risk).
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">-5 from yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Alerts */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-cyan-400" />
              Current Disaster Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-cyan-400">{alert.type}</span>
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
                <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {alert.time}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Continuity Status */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              Business Continuity Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {continuityStatus.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <Badge
                    variant="outline"
                    className={
                      item.status === "active"
                        ? "text-green-400 border-green-400"
                        : item.status === "in-progress"
                        ? "text-yellow-400 border-yellow-400"
                        : "text-gray-400 border-gray-400"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${
                      item.status === "active" ? "bg-green-500" : item.status === "in-progress" ? "bg-yellow-500" : "bg-gray-600"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Intervention Actions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Intervention Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-300">Completed</span>
                </div>
                <p className="text-2xl text-green-400">12</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-sm text-gray-300">In Progress</span>
                </div>
                <p className="text-2xl text-yellow-400">5</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-300">Pending</span>
                </div>
                <p className="text-2xl text-red-400">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROC Curve */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">ROC Curve - Model Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rocData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="fpr" stroke="#9CA3AF" label={{ value: "False Positive Rate", position: "insideBottom", offset: -5 }} />
                <YAxis stroke="#9CA3AF" label={{ value: "True Positive Rate", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#D1D5DB" }}
                />
                <Legend />
                <Line key="line-cnn" type="monotone" dataKey="tpr_cnn" stroke="#22D3EE" name="CNN" strokeWidth={2} dot={{ r: 3 }} />
                <Line key="line-rf" type="monotone" dataKey="tpr_rf" stroke="#F59E0B" name="Random Forest" strokeWidth={2} dot={{ r: 3 }} />
                <Line key="line-xgb" type="monotone" dataKey="tpr_xgb" stroke="#8B5CF6" name="XGBoost" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SHAP Feature Importance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">SHAP Feature Importance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shapData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="feature" type="category" stroke="#9CA3AF" width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#D1D5DB" }}
                />
                <Bar dataKey="importance" fill="#22D3EE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}