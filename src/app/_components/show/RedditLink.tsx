import { RedditSVG } from "~/SVG/reddit";
import { type TvShow } from "~/server/types/search-types";

const RedditLink = ({ show }: { show: TvShow }) => {
  const url = `https://www.reddit.com/search/?q=${show.name} tv show`;
  return (
    <a
      className="text-blue-500 underline"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <RedditSVG />
    </a>
  );
};

export default RedditLink;
