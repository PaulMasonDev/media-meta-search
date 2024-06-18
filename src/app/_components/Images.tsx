import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export default async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {[...images, ...images, ...images, ...images, ...images].map(
        (image, index) => {
          return (
            <div
              key={image.id + "-" + index}
              className="flex h-48 w-48 flex-col"
            >
              <Link href={`/img/${image.id}`}>
                <Image
                  src={image.url}
                  style={{ objectFit: "contain" }}
                  width={192}
                  height={192}
                  alt={image.name}
                />
              </Link>
              <div>{image.name}</div>
            </div>
          );
        },
      )}
    </div>
  );
}
