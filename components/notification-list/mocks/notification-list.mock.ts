export interface NotificationItem {
  notificationId: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  read: boolean;
}

export interface NotificationListProps {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  maxVisible?: number;
}

export const notificationListMock: NotificationItem[] = [
  {
    notificationId: "ntf-001",
    message: "Tu deploy a producción fue exitoso",
    type: "success",
    timestamp: "2026-03-30T08:15:00Z",
    read: false,
  },
  {
    notificationId: "ntf-002",
    message: "CPU usage exceeded 90% on server-3",
    type: "error",
    timestamp: "2026-03-30T07:45:00Z",
    read: false,
  },
  {
    notificationId: "ntf-003",
    message: "New team member joined: @carlos",
    type: "info",
    timestamp: "2026-03-29T14:30:00Z",
    read: true,
  },
  {
    notificationId: "ntf-004",
    message: "Your trial expires in 3 days",
    type: "warning",
    timestamp: "2026-03-28T10:00:00Z",
    read: true,
  },
];
