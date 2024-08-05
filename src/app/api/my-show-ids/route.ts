import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
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
    return existingUser.myShowIds;
  }
}

interface MyShowPostData {
  showId: number;
  name: string;
}

export async function POST(request: NextRequest) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data: MyShowPostData = (await request.json()) as MyShowPostData;

  const userId = user.userId;

  const existingUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  if (!existingUser) {
    await db.insert(users).values({ userId, myShowIds: [data.showId] });
  } else {
    await db
      .update(users)
      .set({ myShowIds: [...existingUser.myShowIds, data.showId] })
      .where(eq(users.userId, userId));
  }

  return new NextResponse("Show added to my shows");
}

export async function DELETE(request: NextRequest) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const data: { showId: number } = (await request.json()) as { showId: number };

  const existingUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  if (existingUser) {
    const updatedShowIds = existingUser.myShowIds.filter(
      (id) => id !== data.showId,
    );

    await db
      .update(users)
      .set({
        myShowIds: updatedShowIds,
      })
      .where(eq(users.userId, user.userId));
  }

  return new NextResponse("Show deleted from my shows");
}
