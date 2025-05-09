import React, { ReactNode, createContext } from "react";

import { PageData, usePageData } from "../hooks/usePageData";

type PageDataContextType = {
  pageData: PageData[];
  loading: boolean;
};

export const PageDataContext = createContext<PageDataContextType | undefined>(undefined);

export const PageDataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pageData, loading] = usePageData();

  return (
    <PageDataContext.Provider value={{ pageData, loading }}>{children}</PageDataContext.Provider>
  );
};
