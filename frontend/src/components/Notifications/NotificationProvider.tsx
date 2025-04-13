// src/components/NotificationProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { NotificationCard } from "./NotificationCard";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  text: string;
  type: NotificationType; // ← REQUIRED (never undefined)
  duration?: number; // ms before auto‑dismiss
}

interface NotificationContextValue {
  /**
   * Fire a new toast.
   * @param input.text      Message to show
   * @param input.type      Style variant (defaults to "info")
   * @param input.duration  Auto‑dismiss time in ms (defaults to 4000)
   */
  notify: (input: Omit<Notification, "id">) => void;
}

/* ────────────────────────────────────────────────────────── *
 *  Context
 * ────────────────────────────────────────────────────────── */

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Notification[]>([]);

  /** Remove a toast by id */
  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /** Public function exposed by the context */
  const notify: NotificationContextValue["notify"] = useCallback(
    ({ text, type = "info", duration = 4000 }) => {
      const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
      setItems((prev) => [...prev, { id, text, type, duration }]);
      setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {/* Toast stack (bottom‑right) */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {items.map(({ id, text, type }) => (
          <NotificationCard key={id} id={id} text={text} type={type} onClose={() => remove(id)} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used inside a <NotificationProvider>");
  }
  return ctx.notify;
};
