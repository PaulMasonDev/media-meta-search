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
import { fetchMyShows } from "./client-library";

interface SearchContextType {
  myShows: TvShow[];
  setMyShows: Dispatch<SetStateAction<TvShow[]>>;
  updateShows: () => Promise<void>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

interface SearchProviderProperties {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProperties) => {
  const [myShows, setMyShows] = useState<TvShow[]>([]);

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
    }),
    [myShows],
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }

  return context;
};