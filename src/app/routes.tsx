import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { DisasterPrediction } from "./pages/disaster-prediction";
import { RiskMonitoring } from "./pages/risk-monitoring";
import { ContinuityPlanning } from "./pages/continuity-planning";
import { Reports } from "./pages/reports";
import { AdminSettings } from "./pages/admin-settings";
import { CyberSecurity } from "./pages/cyber-security";
import { Login } from "./pages/login";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("resili-user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "disaster-prediction", Component: DisasterPrediction },
      { path: "risk-monitoring", Component: RiskMonitoring },
      { path: "continuity-planning", Component: ContinuityPlanning },
      { path: "reports", Component: Reports },
      { path: "admin-settings", Component: AdminSettings },
      { path: "cyber-security", Component: CyberSecurity },
    ],
  },
]);