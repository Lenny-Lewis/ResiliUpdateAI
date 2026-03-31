import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Upload, FileImage, Activity, Brain, Sparkles, AlertCircle, CheckCircle2, Layers, MapPin, Zap, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Progress } from "../components/ui/progress";

const mlModels = [
  { name: "Random Forest", accuracy: 0.89, precision: 0.87, recall: 0.91, f1Score: 0.89 },
  { name: "XGBoost", accuracy: 0.92, precision: 0.90, recall: 0.94, f1Score: 0.92 },
  { name: "SVM", accuracy: 0.85, precision: 0.83, recall: 0.88, f1Score: 0.85 },
  { name: "CNN", accuracy: 0.94, precision: 0.93, recall: 0.95, f1Score: 0.94 },
];

interface ImageAnalysis {
  primaryDisaster: string;
  confidence: number;
  location: string;
  severity: "low" | "moderate" | "high" | "critical";
  detectedFeatures: string[];
  recommendation: string;
  metadata: {
    resolution: string;
    captureDate: string;
    coordinates: string;
  };
  detailedAnalysis: {
    terrainType: string;
    weatherConditions: string;
    populationDensity: string;
    infrastructureStatus: string;
  };
}

const sampleAnalyses: { [key: string]: ImageAnalysis } = {
  "satellite-image-1.jpg": {
    primaryDisaster: "Earthquake Risk - Fault Line Activity Detected",
    confidence: 92,
    location: "San Andreas Fault Region, California",
    severity: "high",
    detectedFeatures: [
      "Ground displacement patterns (8.2cm detected)",
      "Fault line stress accumulation",
      "Seismic wave propagation indicators",
      "Building structural vulnerabilities",
      "Infrastructure damage risk zones"
    ],
    recommendation: "Immediate evacuation planning recommended for red zones. Deploy emergency response teams to high-risk areas. Activate earthquake early warning system.",
    metadata: {
      resolution: "0.5m/pixel",
      captureDate: "March 15, 2026",
      coordinates: "37.8719° N, 122.2585° W"
    },
    detailedAnalysis: {
      terrainType: "Mountainous with urban development",
      weatherConditions: "Clear, optimal for analysis",
      populationDensity: "High (2,500+ per km²)",
      infrastructureStatus: "Mixed - 35% buildings pre-1980s"
    }
  },
  "flood-area.png": {
    primaryDisaster: "Severe Flooding - River Overflow Detected",
    confidence: 88,
    location: "Mississippi River Delta, Louisiana",
    severity: "critical",
    detectedFeatures: [
      "Water level rise of 4.8 meters",
      "Levee structural weakness identified",
      "Vegetation submersion (85% coverage)",
      "Urban area inundation risk",
      "Drainage system overload"
    ],
    recommendation: "Critical alert: Immediate evacuation of low-lying areas. Deploy water rescue teams. Activate flood barriers and emergency shelters.",
    metadata: {
      resolution: "1.0m/pixel",
      captureDate: "March 16, 2026",
      coordinates: "29.9511° N, 90.0715° W"
    },
    detailedAnalysis: {
      terrainType: "Low-lying delta region",
      weatherConditions: "Heavy precipitation (150mm/24hrs)",
      populationDensity: "Moderate (800 per km²)",
      infrastructureStatus: "Critical - aging levee system"
    }
  },
  "wildfire-region.jpg": {
    primaryDisaster: "Wildfire Spread - High Vegetation Stress",
    confidence: 95,
    location: "California Central Valley",
    severity: "high",
    detectedFeatures: [
      "Vegetation moisture deficit critical",
      "Temperature anomaly +12°C above normal",
      "Wind speed favorable for fire spread",
      "Smoke plume detection",
      "Populated areas in fire path"
    ],
    recommendation: "Pre-emptive evacuation advised. Deploy firefighting resources. Establish firebreaks in strategic locations. Air quality monitoring active.",
    metadata: {
      resolution: "10m/pixel (thermal)",
      captureDate: "March 17, 2026",
      coordinates: "36.7783° N, 119.4179° W"
    },
    detailedAnalysis: {
      terrainType: "Dry grassland and forest",
      weatherConditions: "High winds (45 km/h), low humidity (18%)",
      populationDensity: "Low to moderate (200 per km²)",
      infrastructureStatus: "Rural - limited firefighting access"
    }
  }
};

export function DisasterPrediction() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysis | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setIsAnalyzing(true);
      setAnalysisComplete(false);
      setAnalysisResult(null);

      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        
        // Get the filename in lowercase
        const fileName = file.name.toLowerCase();
        
        // Detect disaster type from filename
        let selectedAnalysis: ImageAnalysis;
        
        if (fileName.includes("fire") || fileName.includes("wildfire")) {
          selectedAnalysis = sampleAnalyses["wildfire-region.jpg"];
        } else if (fileName.includes("flood") || fileName.includes("flooding")) {
          selectedAnalysis = sampleAnalyses["flood-area.png"];
        } else {
          // Default to earthquake analysis
          selectedAnalysis = sampleAnalyses["satellite-image-1.jpg"];
        }
        
        setAnalysisResult(selectedAnalysis);
      }, 3000);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    }
  };

  const riskClassifications = [
    { category: "Earthquake", level: "High", probability: 0.78, confidence: 0.92 },
    { category: "Flood", level: "Moderate", probability: 0.45, confidence: 0.87 },
    { category: "Hurricane", level: "Low", probability: 0.15, confidence: 0.95 },
    { category: "Wildfire", level: "Moderate", probability: 0.52, confidence: 0.89 },
  ];

  const cnnFeatures = [
    { id: 1, name: "Ground Displacement", intensity: 85 },
    { id: 2, name: "Cloud Formation", intensity: 62 },
    { id: 3, name: "Temperature Anomaly", intensity: 73 },
    { id: 4, name: "Vegetation Stress", intensity: 48 },
    { id: 5, name: "Infrastructure Density", intensity: 91 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Disaster Prediction & Image Analysis</h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered disaster detection from satellite imagery</p>
        </div>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          CNN & ML Analysis
        </Badge>
      </div>

      {/* Upload Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            Upload Satellite Imagery for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".jpg,.jpeg,.png,.tiff"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileImage className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-300 mb-2">
                Drop satellite imagery here, or click to browse
              </p>
              <p className="text-sm text-gray-500">Supports: JPG, PNG, TIFF (Max 50MB)</p>
              <p className="text-xs text-gray-600 mt-2">Try: satellite-image-1.jpg, flood-area.png, or wildfire-region.jpg</p>
            </label>
            {uploadedFile && (
              <div className="mt-4 inline-flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400">{uploadedFile}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <Button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={() => {}}
              disabled={!uploadedFile || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              disabled={!uploadedFile}
            >
              <Layers className="w-4 h-4 mr-2" />
              Run All Models
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Results */}
      {analysisResult && (
        <Card className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                AI Analysis Results
              </CardTitle>
              <Badge className={getSeverityColor(analysisResult.severity)}>
                {analysisResult.severity.toUpperCase()} RISK
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Finding */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-100 mb-2">{analysisResult.primaryDisaster}</h3>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{analysisResult.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400">{analysisResult.confidence}% Confidence</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">Confidence Level</span>
                      <span className="text-cyan-400">{analysisResult.confidence}%</span>
                    </div>
                    <Progress value={analysisResult.confidence} className="bg-gray-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                        style={{ width: `${analysisResult.confidence}%` }}
                      />
                    </Progress>
                  </div>
                </div>
              </div>
            </div>

            {/* Detected Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <h4 className="text-gray-100 font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Detected Features
                </h4>
                <ul className="space-y-2">
                  {analysisResult.detectedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <h4 className="text-gray-100 font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Image Metadata
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resolution:</span>
                    <span className="text-gray-300">{analysisResult.metadata.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capture Date:</span>
                    <span className="text-gray-300">{analysisResult.metadata.captureDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Coordinates:</span>
                    <span className="text-gray-300 font-mono text-xs">{analysisResult.metadata.coordinates}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`rounded-lg p-4 border ${
              analysisResult.severity === "critical" 
                ? "bg-red-500/10 border-red-500/30" 
                : analysisResult.severity === "high"
                ? "bg-orange-500/10 border-orange-500/30"
                : "bg-yellow-500/10 border-yellow-500/30"
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  analysisResult.severity === "critical" ? "text-red-400" :
                  analysisResult.severity === "high" ? "text-orange-400" : "text-yellow-400"
                }`} />
                <div>
                  <h4 className="font-semibold mb-1 text-gray-100">Recommended Action</h4>
                  <p className="text-sm text-gray-300">{analysisResult.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Detailed Analysis Toggle */}
            <div>
              <Button
                variant="outline"
                onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                {showDetailedAnalysis ? "Hide" : "Show"} Detailed Analysis
              </Button>
            </div>

            {/* Detailed Analysis Section */}
            {showDetailedAnalysis && (
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 space-y-3">
                <h4 className="text-gray-100 font-semibold">Detailed Environmental Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Terrain Type:</span>
                    <p className="text-gray-300 mt-1">{analysisResult.detailedAnalysis.terrainType}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Weather Conditions:</span>
                    <p className="text-gray-300 mt-1">{analysisResult.detailedAnalysis.weatherConditions}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Population Density:</span>
                    <p className="text-gray-300 mt-1">{analysisResult.detailedAnalysis.populationDensity}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Infrastructure Status:</span>
                    <p className="text-gray-300 mt-1">{analysisResult.detailedAnalysis.infrastructureStatus}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CNN Feature Detection */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              CNN Feature Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Heatmap Placeholder */}
            <div className="bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-red-900/40 rounded-lg aspect-video flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <Activity className="w-12 h-12 mx-auto mb-2 text-cyan-400" />
                <p className="text-gray-400 text-sm">CNN Activation Heatmap</p>
                <p className="text-xs text-gray-500 mt-1">Upload & analyze to generate visualization</p>
              </div>
            </div>

            {/* Feature Intensities */}
            <div className="space-y-3">
              <h4 className="text-sm text-gray-400">Feature Intensity Scores</h4>
              {cnnFeatures.map((feature) => (
                <div key={feature.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{feature.name}</span>
                    <span className="text-cyan-400">{feature.intensity}%</span>
                  </div>
                  <Progress value={feature.intensity} className="bg-gray-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      style={{ width: `${feature.intensity}%` }}
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Classifications */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Regional Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskClassifications.map((risk, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-200">{risk.category}</span>
                  <Badge
                    className={
                      risk.level === "High"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : risk.level === "Moderate"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    }
                  >
                    {risk.level}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Probability</span>
                    <span className="text-cyan-400">{(risk.probability * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={risk.probability * 100} className="bg-gray-700">
                    <div
                      className="h-full bg-cyan-500 transition-all"
                      style={{ width: `${risk.probability * 100}%` }}
                    />
                  </Progress>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-gray-300">{(risk.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ML Model Comparison Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">ML Model Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800/50">
                <TableHead className="text-gray-400">Model</TableHead>
                <TableHead className="text-gray-400">Accuracy</TableHead>
                <TableHead className="text-gray-400">Precision</TableHead>
                <TableHead className="text-gray-400">Recall</TableHead>
                <TableHead className="text-gray-400">F1-Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mlModels.map((model, index) => (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell className="text-gray-200">
                    <div className="flex items-center gap-2">
                      {model.name === "CNN" && <Brain className="w-4 h-4 text-cyan-400" />}
                      {model.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        model.accuracy >= 0.9
                          ? "text-green-400 border-green-400"
                          : model.accuracy >= 0.85
                          ? "text-cyan-400 border-cyan-400"
                          : "text-yellow-400 border-yellow-400"
                      }
                    >
                      {(model.accuracy * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{(model.precision * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-gray-300">{(model.recall * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-gray-300">{(model.f1Score * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="text-cyan-400">Best Performance:</span> CNN model with 94% accuracy for disaster prediction
              based on satellite imagery and sensor fusion. Real-time analysis processes imagery in under 3 seconds.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}