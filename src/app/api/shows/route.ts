import { type NextRequest } from "next/server";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const showId = searchParams.get("showId");

  if (!showId) {
    return new Response("showId is required", { status: 400 });
  }

  const existingShow = await db.query.shows.findFirst({
    where: (model, { eq }) => eq(model.showId, showId),
  });

  if (existingShow) {
    return new Response(JSON.stringify(existingShow.tvShowData));
  } else {
    return new Response("Show not found", { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  // Create an entry into the shows table based upon the request body
}
