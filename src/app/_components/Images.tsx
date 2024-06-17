import { getMyImages } from "~/server/queries";

export default async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => {
        return (
          <div key={image.id + "-" + index} className="flex w-48 flex-col">
            <img src={image.url} alt={image.name} />
            <div>{image.name}</div>
          </div>
        );
      })}
    </div>
  );
}
