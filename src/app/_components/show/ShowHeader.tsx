import { type TvShow } from "~/server/types/search-types";
import ShowImage from "./ShowImage";
import { GenresDisplay } from "./GenresDisplay";
import { NextEpisode } from "./NextEpisode";
import EndedStatus from "./EndedStatus";
import RedditLink from "./RedditLink";
import ShowStreamer from "./ShowStreamer";

export const ShowHeader = ({ show }: { show: TvShow }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <ShowImage show={show} />
      {show.webChannel && show.officialSite && (
        <ShowStreamer
          name={show.webChannel.name}
          officialSite={show.officialSite}
        />
      )}
      <GenresDisplay id={show.id} genres={show.genres} />
      {show.nextEpisode && <NextEpisode nextEpisode={show.nextEpisode} />}
      <EndedStatus show={show} />
      <RedditLink show={show} />
    </div>
  );
};
