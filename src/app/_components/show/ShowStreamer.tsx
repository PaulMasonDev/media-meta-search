import Link from "next/link";
import {
  AmazonPrimeSVG,
  AngelStudiosSVG,
  AppleTvSVG,
  NetflixSVG,
  ParamountPlusSVG,
} from "~/SVG/streamers";

const getStreamerIcon = (name: string) => {
  switch (name) {
    case "Netflix":
      return <NetflixSVG />;
    case "Apple TV+":
      return <AppleTvSVG />;
    case "Prime Video":
      return <AmazonPrimeSVG />;
    case "Paramount+":
      return <ParamountPlusSVG />;
    case "Angel Studios":
      return <AngelStudiosSVG />;
    // case "Peacock":
    //   return <PeacockSVG />;
    default:
      return <div>{name}</div>;
  }
};

const ShowStreamer = ({
  name,
  officialSite,
}: {
  name: string;
  officialSite: string;
}) => {
  return (
    <div>
      <Link href={officialSite} target="_blank" rel="noreferrer">
        {getStreamerIcon(name)}
      </Link>
    </div>
  );
};

export default ShowStreamer;
