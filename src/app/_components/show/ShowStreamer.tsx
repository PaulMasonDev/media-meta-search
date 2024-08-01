import Link from "next/link";
import {
  AmazonPrimeSVG,
  AppleTvSVG,
  NetflixSVG,
  ParamountPlusSVG,
} from "~/SVG/streamers";

const getStreamerIcon = (name: string) => {
  console.log(name);
  switch (name) {
    case "Netflix":
      return <NetflixSVG />;
    case "Apple TV+":
      return <AppleTvSVG />;
    case "Prime Video":
      return <AmazonPrimeSVG />;
    case "Paramount+":
      return <ParamountPlusSVG />;
    case "HBO":
      return <img src="/streamers/hbo.svg" alt="HBO" className="h-10 w-10" />;
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
