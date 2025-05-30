"use client";

import { useEffect, useState } from "react";

import { get } from "@/api/requests";
import { useAuthState } from "@/contexts/userContext";

export type Subscription = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  joined: string | number | Date;
  status: "active" | "error";
  membership: "community" | "family";
  threadId: string;
  createdAt: string;
};

export const useSubscriptions = (): [Subscription[], boolean] => {
  const { loading: authLoading, firebaseUser } = useAuthState();

  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  /** Build the header exactly once per token refresh */
  const getAuthHeader = async (): Promise<Record<string, string>> => {
    if (!firebaseUser) throw new Error("User not authenticated");
    const token = await firebaseUser.getIdToken(/* forceRefresh = */ true);
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    // Don’t fire the network call until we know auth is ready
    if (authLoading) return;

    const fetchSubs = async () => {
      try {
        const headers = await getAuthHeader();
        const response = await get("/subscriptions", headers);
        if (!response.ok) throw new Error(await response.text());

        const data = (await response.json()) as Subscription[];

        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSubs(data);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        setSubs([]); // or leave previous data
      } finally {
        setLoading(false);
      }
    };

    void fetchSubs();
  }, [authLoading, firebaseUser]);

  return [subs, authLoading || loading];
};
