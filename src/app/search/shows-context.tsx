"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import { type TvShow } from "~/server/types/search-types";
import { fetchMyShows } from "../client-library";

interface ShowsContextType {
  myShows: TvShow[];
  setMyShows: Dispatch<SetStateAction<TvShow[]>>;
  myShowRecommendations: TvShow[];
  setMyShowRecommendations: Dispatch<SetStateAction<TvShow[]>>;
  updateShows: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const ShowsContext = createContext<ShowsContextType | undefined>(
  undefined,
);

interface ShowsProviderProperties {
  children: ReactNode;
}

export const ShowsProvider = ({ children }: ShowsProviderProperties) => {
  const [myShows, setMyShows] = useState<TvShow[]>([]);
  const [myShowRecommendations, setMyShowRecommendations] = useState<TvShow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      setIsLoading(true);
      const fetchedShows = await fetchMyShows();
      setMyShows(fetchedShows);
      setIsLoading(false);
    };
    void fetchShows();
  }, []);

  const updateShows = async () => {
    setIsLoading(true);
    const fetchedShows = await fetchMyShows();
    setMyShows(fetchedShows);
    setIsLoading(false);
  };

  const contextValue = useMemo(
    () => ({
      myShows,
      setMyShows,
      updateShows,
      myShowRecommendations,
      setMyShowRecommendations,
      isLoading,
      setIsLoading,
    }),
    [myShows, myShowRecommendations, isLoading],
  );

  return (
    <ShowsContext.Provider value={contextValue}>
      {children}
    </ShowsContext.Provider>
  );
};

export const useShowsContext = () => {
  const context = useContext(ShowsContext);

  if (context === undefined) {
    throw new Error("useShowsContext must be used within a ShowsProvider");
  }

  return context;
};
