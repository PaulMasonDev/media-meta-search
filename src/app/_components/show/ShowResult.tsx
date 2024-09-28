import { type TvShow } from "~/server/types/search-types";
import { ShowResultA } from "./ShowResultA";
import { ShowResultB } from "./ShowResultB";

export const ShowResult = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  return <ShowResultA show={show} isMyShow={isMyShow} />;
  // return <ShowResultB show={show} isMyShow={isMyShow} />;
};
