"use client";

import { useEffect, useState } from "react";

import { get } from "@/api/requests";

export type Article = {
  _id: string;
  header: string;
  dateCreated: string;
  author: string;
  body?: string | null;
  thumbnail?: string;
};

/**
 * Fetches all articles from backend on mount
 *
 * @returns List of articles
 * @returns Loading status
 */
export const useArticles = (): [Article[], boolean] => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await get("/articles/all");
        const data = (await response.json()) as Article[];

        const byRecentData = data
          .sort((a, b) => {
            return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          })
          .reverse();

        setArticles(byRecentData);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchArticles();
  }, []);

  return [articles, loading];
};
