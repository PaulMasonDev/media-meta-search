import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { shows } from "~/server/db/schema";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  const user = auth();
  if (!user.userId) {
    return [];
  }
  const myShows = await db.query.shows.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });
  return new Response(JSON.stringify(myShows.map((show) => show.showId)));
}

interface MyShowPostData {
  showId: number;
  name: string;
}

export async function POST(request: Request) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data: MyShowPostData = (await request.json()) as MyShowPostData;

  const userId = user.userId;

  const { showId, name } = data;

  await db.insert(shows).values({ userId, showId, name });

  return new Response("Show added to my shows");
}

export async function DELETE(request: Request) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data: { showId: number } = (await request.json()) as { showId: number };

  const userId = user.userId;

  const { showId } = data;

  await db
    .delete(shows)
    .where(and(eq(shows.userId, userId), eq(shows.showId, showId)));
  return new Response("Show deleted from my shows");
}
