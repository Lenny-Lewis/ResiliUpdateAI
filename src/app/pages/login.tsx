import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle, ShieldCheck, LogIn, Mail, KeyRound, CloudRain, AlertTriangle, ClipboardCheck, FileText, Sparkles, LockKeyhole, Radar } from "lucide-react";

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

      <div className="relative w-full max-w-5xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="hidden lg:block">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15 ring-1 ring-cyan-500/30">
                  <ShieldCheck className="h-4 w-4 text-cyan-200" />
                </div>
                <span className="text-sm font-medium tracking-[0.24em] text-cyan-200">RESILI AI</span>
              </div>

              <div className="mt-8 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Enterprise Resilience Platform
                </div>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                  Coordinate prediction, monitoring, response, and reporting from one resilient control center.
                </h1>
                <p className="max-w-lg text-base leading-7 text-gray-300">
                  Designed for client-facing resilience operations with a clean executive view, high-signal risk tracking,
                  and dependable continuity workflows.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <Radar className="h-5 w-5 text-cyan-300" />
                  <p className="mt-4 text-sm font-medium text-white">Live Monitoring</p>
                  <p className="mt-1 text-sm text-gray-400">Centralized risk visibility across environmental, operational, and cyber signals.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <LockKeyhole className="h-5 w-5 text-cyan-300" />
                  <p className="mt-4 text-sm font-medium text-white">Controlled Access</p>
                  <p className="mt-1 text-sm text-gray-400">Role-aware access and streamlined oversight for sensitive resilience workflows.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <FileText className="h-5 w-5 text-cyan-300" />
                  <p className="mt-4 text-sm font-medium text-white">Executive Reporting</p>
                  <p className="mt-1 text-sm text-gray-400">Presentation-ready analytics and exportable summaries for stakeholder review.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <div className="w-9 h-9 rounded-full bg-cyan-500/15 ring-1 ring-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-cyan-200" />
            </div>
            <span className="text-sm font-medium tracking-wider text-cyan-200">Resili AI</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">Secure access to the resilience operations workspace</p>
        </div>

        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/70 via-indigo-400/35 to-cyan-400/70">
          <Card className="bg-gray-950/70 border-white/10 backdrop-blur-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-100 text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2">
                <LogIn className="w-5 h-5 text-cyan-300" />
                Sign In
              </CardTitle>
              <p className="text-gray-400 text-sm">Enter your credentials to access dashboards, risk monitoring, continuity workflows, and reporting.</p>
            </CardHeader>

            <CardContent>
              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Coverage</p>
                  <p className="mt-2 text-sm text-gray-200">Disaster intelligence and operational continuity in one interface.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Signal</p>
                  <p className="mt-2 text-sm text-gray-200">Fast access to alerts, trends, model outputs, and security events.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Audience</p>
                  <p className="mt-2 text-sm text-gray-200">Suitable for client demos, internal reviews, and executive walkthroughs.</p>
                </div>
              </div>

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
                      placeholder="name@company.com"
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
                  Access Workspace
                </Button>
              </form>

              <div className="pt-5">
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Platform Highlights</p>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-2">
                      <CloudRain className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Disaster Prediction</p>
                        <p className="text-xs text-gray-500">Model-informed insights for forecasted regional risk and intervention planning.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Risk Monitoring</p>
                        <p className="text-xs text-gray-500">High-signal monitoring across active incidents, threats, and escalations.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <ClipboardCheck className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Continuity Planning</p>
                        <p className="text-xs text-gray-500">Track recovery actions, ownership, and execution readiness in one place.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-0.5 text-cyan-200/80" />
                      <div>
                        <p className="text-sm text-gray-200">Reports & Analytics</p>
                        <p className="text-xs text-gray-500">Generate polished summaries and exportable analytics for stakeholder review.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
          </section>
        </div>
      </div>
    </div>
  );
}
