import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FileText, Download, BarChart3, TrendingUp, Eye, FileSpreadsheet } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "sonner";

const shapFeatureImportance = [
  { feature: "Seismic Activity", importance: 0.28, avgImpact: 0.32 },
  { feature: "Weather Patterns", importance: 0.22, avgImpact: 0.25 },
  { feature: "Infrastructure Age", importance: 0.18, avgImpact: 0.20 },
  { feature: "Population Density", importance: 0.15, avgImpact: 0.12 },
  { feature: "Historical Events", importance: 0.10, avgImpact: 0.08 },
  { feature: "Social Sentiment", importance: 0.07, avgImpact: 0.03 },
];

const modelPerformance = [
  { metric: "Accuracy", CNN: 94, RF: 89, XGBoost: 92, SVM: 85 },
  { metric: "Precision", CNN: 93, RF: 87, XGBoost: 90, SVM: 83 },
  { metric: "Recall", CNN: 95, RF: 91, XGBoost: 94, SVM: 88 },
  { metric: "F1-Score", CNN: 94, RF: 89, XGBoost: 92, SVM: 85 },
];

const radarData = [
  { metric: "Accuracy", CNN: 94, Traditional_ML: 89 },
  { metric: "Speed", CNN: 78, Traditional_ML: 92 },
  { metric: "Interpretability", CNN: 65, Traditional_ML: 88 },
  { metric: "Scalability", CNN: 95, Traditional_ML: 75 },
  { metric: "Resource Usage", CNN: 60, Traditional_ML: 85 },
];

const riskAssessmentData = [
  { region: "California", earthquake: 8.5, flood: 4.2, wildfire: 9.1, hurricane: 2.3, overall: 7.8 },
  { region: "Florida", earthquake: 1.5, flood: 8.7, wildfire: 3.2, hurricane: 9.5, overall: 7.2 },
  { region: "Texas", earthquake: 2.1, flood: 6.5, wildfire: 7.8, hurricane: 7.2, overall: 6.4 },
  { region: "Louisiana", earthquake: 1.8, flood: 9.2, wildfire: 2.5, hurricane: 8.9, overall: 7.6 },
  { region: "Washington", earthquake: 7.5, flood: 5.1, wildfire: 6.3, hurricane: 1.9, overall: 6.2 },
];

const incidentTimeline = [
  { date: "2026-01-15", type: "Earthquake", location: "San Francisco, CA", severity: "High", response: "Emergency teams deployed", casualties: 0 },
  { date: "2026-01-22", type: "Flood", location: "New Orleans, LA", severity: "Critical", response: "Evacuation initiated", casualties: 0 },
  { date: "2026-02-03", type: "Wildfire", location: "Los Angeles, CA", severity: "Moderate", response: "Containment operations", casualties: 0 },
  { date: "2026-02-14", type: "Hurricane", location: "Miami, FL", severity: "High", response: "Shelters activated", casualties: 0 },
  { date: "2026-02-28", type: "Earthquake", location: "Seattle, WA", severity: "Moderate", response: "Infrastructure assessment", casualties: 0 },
];

const reports = [
  {
    id: 1,
    title: "Monthly Risk Assessment Report",
    description: "Comprehensive analysis of disaster risks and mitigation strategies",
    date: "February 2026",
    format: ["PDF", "Excel"],
    size: "2.4 MB",
    status: "ready",
    data: riskAssessmentData,
  },
  {
    id: 2,
    title: "ML Model Performance Analysis",
    description: "Detailed comparison of CNN, Random Forest, XGBoost, and SVM models",
    date: "February 2026",
    format: ["PDF"],
    size: "1.8 MB",
    status: "ready",
    data: modelPerformance,
  },
  {
    id: 3,
    title: "Business Continuity Compliance Report",
    description: "Regulatory compliance and continuity planning effectiveness",
    date: "Q1 2026",
    format: ["PDF", "Excel"],
    size: "3.1 MB",
    status: "ready",
    data: shapFeatureImportance,
  },
  {
    id: 4,
    title: "Incident Response Timeline",
    description: "Detailed timeline of disaster events and response actions",
    date: "January-February 2026",
    format: ["PDF", "Excel"],
    size: "1.5 MB",
    status: "ready",
    data: incidentTimeline,
  },
  {
    id: 5,
    title: "Quarterly Executive Summary",
    description: "High-level overview for leadership and stakeholders",
    date: "Q1 2026",
    format: ["PDF"],
    size: "890 KB",
    status: "generating",
    data: [],
  },
];

export function Reports() {
  const downloadPDF = (report: typeof reports[0]) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(34, 211, 238); // Cyan color
    doc.text("Resili AI", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Enterprise Disaster Management Platform", 14, 26);
    
    // Report Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(report.title, 14, 40);
    
    // Report Info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 48);
    doc.text(`Period: ${report.date}`, 14, 54);
    
    // Description
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(report.description, 14, 65, { maxWidth: 180 });
    
    // Data Table
    if (report.data && report.data.length > 0) {
      const headers = Object.keys(report.data[0]);
      const rows = report.data.map(item => Object.values(item));
      
      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 75,
        theme: 'grid',
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [34, 211, 238],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      doc.text(
        'Resili AI - Confidential',
        14,
        doc.internal.pageSize.getHeight() - 10
      );
    }
    
    // Save
    doc.save(`${report.title.replace(/\s+/g, '_')}.pdf`);
    toast.success("PDF downloaded successfully!");
  };

  const downloadExcel = (report: typeof reports[0]) => {
    if (!report.data || report.data.length === 0) {
      toast.error("No data available for export");
      return;
    }

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    
    // Main data sheet
    const ws = XLSX.utils.json_to_sheet(report.data);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    
    // Summary sheet
    const summaryData = [
      ["Report Title", report.title],
      ["Description", report.description],
      ["Period", report.date],
      ["Generated", new Date().toLocaleDateString()],
      ["Status", report.status],
      [""],
      ["Resili AI - Enterprise Disaster Management Platform"],
      ["Confidential Data - Handle with Care"],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    
    // Write file
    XLSX.writeFile(wb, `${report.title.replace(/\s+/g, '_')}.xlsx`);
    toast.success("Excel file downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Reports & Analytics</h1>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Downloadable Reports */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-gray-100">{report.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          report.status === "ready"
                            ? "text-green-400 border-green-400"
                            : "text-yellow-400 border-yellow-400"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>Formats: {report.format.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {report.status === "ready" ? (
                      <>
                        {report.format.includes("PDF") && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                            onClick={() => downloadPDF(report)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        )}
                        {report.format.includes("Excel") && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-green-500 text-green-400 hover:bg-green-500/10"
                            onClick={() => downloadExcel(report)}
                          >
                            <FileSpreadsheet className="w-4 h-4 mr-1" />
                            Excel
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="border-gray-600 text-gray-500">
                        Generating...
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SHAP Explainability Dashboard */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            SHAP Explainability Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="text-cyan-400">SHAP (SHapley Additive exPlanations)</span> values show how much each
              feature contributes to model predictions, providing transparency in AI decision-making.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={shapFeatureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="feature" type="category" stroke="#9CA3AF" width={150} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#D1D5DB" }}
              />
              <Legend />
              <Bar key="bar-importance" dataKey="importance" fill="#22D3EE" name="Feature Importance" />
              <Bar key="bar-avgimpact" dataKey="avgImpact" fill="#8B5CF6" name="Average Impact" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance Comparison */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Model Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="metric" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#D1D5DB" }}
                />
                <Legend />
                <Bar key="bar-cnn" dataKey="CNN" fill="#22D3EE" />
                <Bar key="bar-rf" dataKey="RF" fill="#F59E0B" />
                <Bar key="bar-xgboost" dataKey="XGBoost" fill="#8B5CF6" />
                <Bar key="bar-svm" dataKey="SVM" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Comparison */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              CNN vs Traditional ML
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                <PolarRadiusAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#D1D5DB" }}
                />
                <Legend />
                <Radar key="radar-cnn" name="CNN" dataKey="CNN" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.5} />
                <Radar key="radar-ml" name="Traditional ML" dataKey="Traditional_ML" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Key Analytics Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <h4 className="text-cyan-400">Best Model</h4>
              </div>
              <p className="text-2xl text-gray-100 mb-1">CNN</p>
              <p className="text-sm text-gray-400">94% overall accuracy in disaster prediction</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <h4 className="text-green-400">Top Feature</h4>
              </div>
              <p className="text-2xl text-gray-100 mb-1">Seismic Activity</p>
              <p className="text-sm text-gray-400">28% contribution to predictions</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h4 className="text-purple-400">Reports Generated</h4>
              </div>
              <p className="text-2xl text-gray-100 mb-1">47</p>
              <p className="text-sm text-gray-400">This quarter (Q1 2026)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
