import { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "alert" | "warning" | "info" | "success";
  timestamp: string;
  read: boolean;
  category: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Critical Alert: Earthquake Risk Elevated",
    message: "Seismic activity detected in San Andreas Fault region. Probability: 78%",
    type: "alert",
    timestamp: "5 minutes ago",
    read: false,
    category: "Risk Alert",
  },
  {
    id: 2,
    title: "Flood Warning Issued",
    message: "Mississippi River levels rising. Evacuation recommended for low-lying areas.",
    type: "warning",
    timestamp: "15 minutes ago",
    read: false,
    category: "Weather Alert",
  },
  {
    id: 3,
    title: "New Report Available",
    message: "Monthly Risk Assessment Report for February 2026 is ready to download.",
    type: "info",
    timestamp: "1 hour ago",
    read: false,
    category: "Reports",
  },
  {
    id: 4,
    title: "System Backup Completed",
    message: "Daily system backup completed successfully at 02:00 AM.",
    type: "success",
    timestamp: "3 hours ago",
    read: true,
    category: "System",
  },
  {
    id: 5,
    title: "Model Training Complete",
    message: "CNN model retraining completed with 94.2% accuracy.",
    type: "success",
    timestamp: "5 hours ago",
    read: true,
    category: "AI/ML",
  },
  {
    id: 6,
    title: "User Access Alert",
    message: "New user Lisa Anderson added to the system.",
    type: "info",
    timestamp: "1 day ago",
    read: true,
    category: "User Management",
  },
];

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
