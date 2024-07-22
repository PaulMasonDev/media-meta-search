// hooks/useShowData.ts
import { useEffect, useState } from "react";
import { useSearchContext } from "../search/search-context";

export const useShowData = () => {
  const { myShows } = useSearchContext();
  const [myShowIds, setMyShowIds] = useState<number[]>([]);

  useEffect(() => {
    setMyShowIds(myShows.map((show) => show.id));
  }, [myShows]);

  return { myShowIds, myShows };
};
