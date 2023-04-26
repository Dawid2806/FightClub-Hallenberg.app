import { createContext, useContext, useState } from "react";

interface NewsContextData {
  hasUnreadNews: boolean;
  setHasUnreadNews: (value: boolean) => void;
}

const NewsContext = createContext<NewsContextData>({
  hasUnreadNews: false,
  setHasUnreadNews: () => {},
});

export const useNewsContext = () => {
  return useContext(NewsContext);
};

interface NewsProviderProps {
  children: React.ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [hasUnreadNews, setHasUnreadNews] = useState(false);

  return (
    <NewsContext.Provider value={{ hasUnreadNews, setHasUnreadNews }}>
      {children}
    </NewsContext.Provider>
  );
};
