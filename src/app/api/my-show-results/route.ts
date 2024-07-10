import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { shows } from "~/server/db/schema";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const user = auth();
  if (!user.userId) {
    return new NextResponse(JSON.stringify([]));
  }
  const myShows = await db.query.shows.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  const showIds = myShows.map((show) => show.showId);
  const requests = showIds.map((id) =>
    fetch(`https://api.tvmaze.com/shows/${id}`),
  );

  try {
    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map((res) => res.json()));
    console.log(data);
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Failed to retrieve show details", error);
    return [];
  }
}
