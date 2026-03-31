import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/auth-context";
import { NotificationsProvider } from "./context/notifications-context";
import { ThemeProvider } from "./context/theme-context";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <RouterProvider router={router} />
          <Toaster />
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}