import { type TvShow } from "~/server/types/search-types";
import { ShowResult } from "./ShowResult";

interface ShowListProps {
  shows: TvShow[];
  myShowIds: number[];
}

const ShowList = ({ shows, myShowIds }: ShowListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {shows?.map((result) => (
        <ShowResult
          key={result.id}
          show={result}
          isMyShow={myShowIds.includes(result.id)}
        />
      ))}
    </div>
  );
};

export default ShowList;
