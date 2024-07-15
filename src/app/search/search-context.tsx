import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
} from "react";

interface SearchContextType {
  myShowIds: number[];
  setMyShowIds: Dispatch<SetStateAction<number[]>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

interface SearchProviderProperties {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProperties) => {
  const [myShowIds, setMyShowIds] = useState<number[]>([12345]);

  const contextValue = useMemo(
    () => ({
      myShowIds,
      setMyShowIds,
    }),
    [myShowIds],
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
