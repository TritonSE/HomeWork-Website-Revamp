import React, { ReactNode, createContext } from "react";

import { Article, useArticles } from "@/hooks/useArticles";

type ArticleContext = {
  articles: Article[];
  loading: boolean;
};

// Default context values
export const ArticleContext = createContext<ArticleContext>({
  articles: [],
  loading: true,
});

export const ArticleContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load the articles on mount
  const [articles, loading] = useArticles();
  return (
    <ArticleContext.Provider value={{ articles, loading }}>{children}</ArticleContext.Provider>
  );
};
