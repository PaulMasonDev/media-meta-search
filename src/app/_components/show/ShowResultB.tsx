import { type TvShow } from "~/server/types/search-types";

import ShowImage from "./ShowImage";
import { GenresDisplay } from "./GenresDisplay";

const extractYear = (dateString: string): string => {
  return dateString.split("-")[0] ?? "";
};

export const ShowResultB = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  console.log("ShowResultB", show);
  return (
    <div className="flex w-full bg-white text-black">
      <div className="w-auto flex-shrink-0">
        <ShowImage show={show} width={125} height={125} figCaption={false} />
      </div>
      <div className="flex flex-col p-2">
        <div className="basis-12 self-end">
          TV Show <button>▼</button>
        </div>
        <div className="text-2xl underline">{show.name}</div>
        <div className="flex flex-wrap gap-1 text-white">
          <div className="inline bg-black p-1 text-sm">
            {extractYear(show.premiered)}
          </div>
          <div className="inline bg-black p-1 text-sm">seasons*</div>
          {show.genres.map((genre) => (
            <div key={genre} className="inline bg-black p-1 text-sm">
              {genre}
            </div>
          ))}
          {/* <GenresDisplay id={show.id} genres={show.genres} /> */}
        </div>
      </div>
    </div>
  );
};
