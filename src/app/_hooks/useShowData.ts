import { useEffect, useState } from "react";
import { useShowsContext } from "../search/shows-context";

export const useShowData = () => {
  const { myShows } = useShowsContext();
  const [myShowIds, setMyShowIds] = useState<number[]>([]);

  useEffect(() => {
    setMyShowIds(myShows.map((show) => show.id));
  }, [myShows]);

  return { myShowIds, myShows };
};
