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

  useEffect(() => {
    const fetchShows = async () => {
      const fetchedShows = await fetchMyShows();
      setMyShows(fetchedShows);
    };
    void fetchShows();
  }, []);

  const updateShows = async () => {
    const fetchedShows = await fetchMyShows();
    setMyShows(fetchedShows);
  };

  const contextValue = useMemo(
    () => ({
      myShows,
      setMyShows,
      updateShows,
      myShowRecommendations,
      setMyShowRecommendations,
    }),
    [myShows, myShowRecommendations],
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
