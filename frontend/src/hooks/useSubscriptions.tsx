"use client";

import { useEffect, useState } from "react";
import { get } from "@/api/requests";

/** Raw document returned by the backend */
type RawSubscription = { _id: string; name: string; email?: string };

/** Shape the table expects */
export interface Subscription {
  firstName: string;
  lastName: string;
  emailAdd: string;
}

/**
 * Fetches all subscriptions from `/subscription` on mount.
 * Returns `[rows, loading]`, exactly like `useArticles`.
 */
export const useSubscriptions = (): [Subscription[], boolean] => {
  const [rows, setRows] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await get("/subscription");          // ← string path only
        const data: RawSubscription[] = await res.json();

        const mapped = data.map<Subscription>((d) => {
          const [firstName, ...rest] = d.name.trim().split(" ");
          return {
            firstName,
            lastName: rest.join(" "),
            emailAdd: d.email ?? "",
          };
        });
        setRows(mapped);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchSubs();
  }, []);

  return [rows, loading];
};
