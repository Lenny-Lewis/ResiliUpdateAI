import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle, ShieldCheck, LogIn, Mail, KeyRound, CloudRain, AlertTriangle, ClipboardCheck, FileText } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 login-bg opacity-[0.55]" />
        <div className="absolute inset-0 bg-gray-950/55" />
        <div className="absolute -top-52 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent)] blur-3xl" />
        <div className="absolute -top-64 left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.18),transparent)] blur-3xl" />
        <div className="absolute -bottom-72 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),transparent)] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <div className="w-9 h-9 rounded-full bg-cyan-500/15 ring-1 ring-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-cyan-200" />
            </div>
            <span className="text-sm font-medium tracking-wider text-cyan-200">Resili AI</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">Secure access to your resilience workspace</p>
        </div>

        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/70 via-indigo-400/35 to-cyan-400/70">
          <Card className="bg-gray-950/70 border-white/10 backdrop-blur-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-100 text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2">
                <LogIn className="w-5 h-5 text-cyan-300" />
                Sign In
              </CardTitle>
              <p className="text-gray-400 text-sm">Enter your credentials to continue (you land on the dashboard)</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-300/80" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="user@nexacorp.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-white/10 text-gray-100 placeholder:text-gray-500 pl-10 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/35"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-300/80" />
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent border-white/10 text-gray-100 placeholder:text-gray-500 pl-10 focus-visible:border-cyan-400 focus-visible:ring-cyan-400/35"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 text-red-300" />
                    <span className="text-sm text-red-300">{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-gray-950 font-semibold shadow-[0_0_0_1px_rgba(34,211,238,0.28),0_20px_70px_rgba(34,211,238,0.16)] transition-transform duration-150 hover:scale-[1.01]"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </form>

              <div className="pt-4">
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">What you can do</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start gap-2">
                      <CloudRain className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Disaster Prediction</p>
                        <p className="text-xs text-gray-500">Review forecasted risk trends and alerts.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Risk Monitoring</p>
                        <p className="text-xs text-gray-500">Track live signals and escalation status.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <ClipboardCheck className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Continuity Planning</p>
                        <p className="text-xs text-gray-500">Create and manage recovery workflows.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Reports & Analytics</p>
                        <p className="text-xs text-gray-500">Export summaries and model insights.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
