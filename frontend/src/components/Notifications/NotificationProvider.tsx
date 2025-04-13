import React, { ReactNode, createContext, useCallback, useContext, useState } from "react";

import { NotificationCard } from "./NotificationCard";

type NotificationType = "success" | "error" | "info" | "warning";

type Notification = {
  id: string;
  text: string;
  type: NotificationType;
  duration?: number;
};

type NotificationContextValue = {
  notify: (input: Omit<Notification, "id">) => void;
};
const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Notification[]>([]);
  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);
  const notify: NotificationContextValue["notify"] = useCallback(
    ({ text, type = "info", duration = 4000 }) => {
      const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
      setItems((prev) => [...prev, { id, text, type, duration }]);
      setTimeout(() => {
        remove(id);
      }, duration);
    },
    [remove],
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <div className="fixed top-0 right-1/2 transform translate-x-1/2 flex flex-col gap-2 z-50">
        {items.map(({ id, text, type }) => (
          <NotificationCard
            key={id}
            id={id}
            text={text}
            type={type}
            onClose={() => {
              remove(id);
            }}
          />
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
