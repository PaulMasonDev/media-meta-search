import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const user = auth();
  if (!user.userId) {
    return new NextResponse(JSON.stringify([]));
  }
  const existingUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  if (!existingUser) {
    await db.insert(users).values({ userId: user.userId, myShowIds: [] });
    return new NextResponse(JSON.stringify([]));
  } else {
    const requests = existingUser.myShowIds.map((id) =>
      fetch(`https://api.tvmaze.com/shows/${id}`),
    );

    try {
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map((res) => res.json()));
      return new NextResponse(JSON.stringify(data));
    } catch (error) {
      console.error("Failed to retrieve show details", error);
      return [];
    }
  }
}
