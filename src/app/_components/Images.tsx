import Image from "next/image";
import { getMyImages } from "~/server/queries";

export default async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image, index) => {
        return (
          <div key={image.id + "-" + index} className="flex h-48 w-48 flex-col">
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
              //   fill
              alt={image.name}
            />
            <div>{image.name}</div>
          </div>
        );
      })}
    </div>
  );
}
