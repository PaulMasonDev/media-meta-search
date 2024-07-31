import { type TvShow } from "~/server/types/search-types";

const EndedStatus = ({ show }: { show: TvShow }) => {
  if (show.status === "Ended") {
    return (
      <em className="flex flex-col items-center font-thin">
        Show ended on {new Date(show.ended).toLocaleDateString()}.
      </em>
    );
  }
  return null;
};

export default EndedStatus;
