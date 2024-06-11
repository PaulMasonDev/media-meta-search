import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/fbbf1bf7-9673-4319-9ed6-06ff59ba130b-5o42mg.png",
  "https://utfs.io/f/241cd40c-07ce-4e15-83cb-6b2324048e5f-5o4423.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log({ posts });
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => {
          return (
            <div key={image.id + "-" + index} className="w-48">
              <img src={image.url} alt="image" />
            </div>
          );
        })}
      </div>
      Hello (Media Meta Search in progress)
    </main>
  );
}
