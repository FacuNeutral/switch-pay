import { useState } from "react";

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

const typeIcons: Record<NotificationItem["type"], string> = {
  info: "ℹ",
  warning: "⚠",
  error: "✗",
  success: "✓",
};

const typeColors: Record<NotificationItem["type"], string> = {
  info: "text-blue-400",
  warning: "text-amber-400",
  error: "text-red-400",
  success: "text-emerald-400",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function NotificationList({
  items,
  onMarkRead,
  onDismiss,
  maxVisible = 5,
}: NotificationListProps) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const visibleItems = items.slice(0, maxVisible);

  function handleClick(id: string) {
    setReadIds((prev) => new Set(prev).add(id));
    onMarkRead?.(id);
  }

  if (items.length === 0) {
    return (
      <div data-component="NotificationList" className="p-6 text-center text-zinc-500 text-sm">
        No notifications
      </div>
    );
  }

  return (
    <div data-component="NotificationList" className="flex flex-col divide-y divide-zinc-800">
      {visibleItems.map((item) => {
        const isRead = item.read || readIds.has(item.notificationId);
        return (
          <div
            key={item.notificationId}
            className={`flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer hover:bg-zinc-800/50 ${
              !isRead ? "bg-indigo-500/5" : ""
            }`}
            onClick={() => handleClick(item.notificationId)}
          >
            <span className={`mt-0.5 text-sm ${typeColors[item.type]}`}>
              {typeIcons[item.type]}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${isRead ? "text-zinc-500" : "text-zinc-200"}`}>
                {item.message}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">{relativeTime(item.timestamp)}</p>
            </div>
            {!isRead && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            )}
            {onDismiss && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(item.notificationId);
                }}
                className="text-zinc-600 hover:text-zinc-400 text-xs shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
