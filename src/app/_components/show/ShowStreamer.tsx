import Link from "next/link";
import {
  AmazonPrimeSVG,
  AngelStudiosSVG,
  AppleTvSVG,
  DisneyPlusSVG,
  HuluSVG,
  NetflixSVG,
  ParamountPlusSVG,
  YouTubeSVG,
} from "~/SVG/streamers";

const getStreamerIcon = (name: string) => {
  switch (name) {
    case "Angel Studios":
      return <AngelStudiosSVG />;
    case "Apple TV+":
      return <AppleTvSVG />;
    case "Disney+":
      return <DisneyPlusSVG />;
    case "Hulu":
      return <HuluSVG />;
    case "Netflix":
      return <NetflixSVG />;
    case "Paramount+":
      return <ParamountPlusSVG />;
    case "Prime Video":
      return <AmazonPrimeSVG />;
    case "YouTube":
      return <YouTubeSVG />;
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
