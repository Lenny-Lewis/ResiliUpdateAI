import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  email: string;
  name: string;
  role: string;
  corporation: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials
const DUMMY_USERS = [
  {
    email: "admin@nexacorp.com",
    password: "admin123",
    name: "Sarah Mitchell",
    role: "Admin",
    corporation: "NexaCorp Industries",
  },
  {
    email: "manager@nexacorp.com",
    password: "manager123",
    name: "James Anderson",
    role: "Continuity Manager",
    corporation: "NexaCorp Industries",
  },
  {
    email: "officer@nexacorp.com",
    password: "officer123",
    name: "Emily Rodriguez",
    role: "Resilience Officer",
    corporation: "NexaCorp Industries",
  },
  {
    email: "analyst@nexacorp.com",
    password: "analyst123",
    name: "Michael Chen",
    role: "Analyst",
    corporation: "NexaCorp Industries",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("resili-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        corporation: foundUser.corporation,
      };
      setUser(userData);
      localStorage.setItem("resili-user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("resili-user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
