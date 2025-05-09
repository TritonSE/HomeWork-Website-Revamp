"use client";

import { useEffect, useState } from "react";

import { get } from "@/api/requests";

export type Field = {
  name: string;
  type: string;
  data: unknown;
};

export type PageData = {
  pagename: string;
  lastUpdate: string; // ISO date string
  fields: Field[];
};

/**
 * Fetches all page data from the backend on mount.
 *
 * @returns An array of PageData and a loading status.
 */
export const usePageData = (): [PageData[], boolean] => {
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await get("/pageData/all");
        const data = (await response.json()) as PageData[];
        setPageData(data);
      } catch (error) {
        console.error("Error fetching page data: ", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPageData();
  }, []);

  return [pageData, loading];
};
