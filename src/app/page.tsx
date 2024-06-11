const mockUrls = [
  "https://utfs.io/f/fbbf1bf7-9673-4319-9ed6-06ff59ba130b-5o42mg.png",
  "https://utfs.io/f/241cd40c-07ce-4e15-83cb-6b2324048e5f-5o4423.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => {
          return (
            <div key={image.id} className="w-48">
              <img src={image.url} alt="image" />
            </div>
          );
        })}
      </div>
      Hello (Media Meta Search in progress)
    </main>
  );
}
