import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle, ShieldCheck, LogIn } from "lucide-react";
import { Badge } from "../components/ui/badge";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const demoAccounts = [
    { email: "admin@nexacorp.com", password: "admin123", role: "Admin" },
    { email: "manager@nexacorp.com", password: "manager123", role: "Continuity Manager" },
    { email: "officer@nexacorp.com", password: "officer123", role: "Resilience Officer" },
    { email: "analyst@nexacorp.com", password: "analyst123", role: "Analyst" },
  ];

  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    const success = login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-6 text-white">
          <div>
            <h1 className="text-5xl font-bold text-cyan-400 mb-2">Resili AI</h1>
            <p className="text-xl text-gray-300">Enterprise Disaster Management Platform</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">AI-Powered Risk Assessment</h3>
                <p className="text-gray-400 text-sm">
                  Advanced CNN and ML models for real-time disaster prediction and risk analysis
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Business Continuity Planning</h3>
                <p className="text-gray-400 text-sm">
                  Comprehensive tools for creating and managing recovery workflows and interventions
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Real-Time Monitoring</h3>
                <p className="text-gray-400 text-sm">
                  Live sensor data feeds and automated alert systems for proactive response
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-gray-500 text-sm">
              Trusted by leading enterprises worldwide for mission-critical disaster resilience
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100 text-2xl">Sign In</CardTitle>
              <p className="text-gray-400 text-sm">Enter your credentials to access the platform</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@nexacorp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-100 text-lg">Demo Accounts</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {showCredentials ? "Hide" : "Show"}
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Quick access for testing</p>
            </CardHeader>
            {showCredentials && (
              <CardContent className="space-y-2">
                {demoAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-300 font-mono">{account.email}</span>
                        <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-400">
                          {account.role}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">Password: {account.password}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => quickLogin(account.email, account.password)}
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      Quick Login
                    </Button>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
