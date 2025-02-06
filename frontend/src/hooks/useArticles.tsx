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
        const data = await response.json() as Article[];
        setArticles(data);
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
