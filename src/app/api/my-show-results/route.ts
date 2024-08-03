import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { type TvEpisode, type TvShow } from "~/server/types/search-types";

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
    const requests = existingUser.myShowIds
    .filter((_, index) => index < 10)
    .map((id) =>
      fetch(`https://api.tvmaze.com/shows/${id}`),
    );

    try {
      const responses = await Promise.all(requests);
      const data: TvShow[] = (await Promise.all(
        responses.map((res) => res.json()),
      )) as TvShow[];
      const episodeDataRequests = data
        .filter((show) => {
          return show._links.nextepisode;
        })
        .map((filteredShow) => {
          return fetch(filteredShow._links.nextepisode?.href);
        });
      const episodeDataResponses = await Promise.all(episodeDataRequests);
      const episodeData: TvEpisode[] = await Promise.all(
        episodeDataResponses.map((res) => res?.json()),
      );
      const showsWithNextEpisode: TvShow[] = data.map((show) => {
        const episodeId = show._links.nextepisode?.href.split("/").pop();
        const foundEpisode: TvEpisode | undefined = episodeData.find(
          (episodeDataItem: TvEpisode) => {
            return episodeDataItem.id === +episodeId;
          },
        );
        return {
          ...show,
          ...(foundEpisode && { nextEpisode: foundEpisode }),
        } as TvShow;
      });

      return new NextResponse(JSON.stringify(showsWithNextEpisode));
    } catch (error) {
      console.error("Failed to retrieve show details", error);
      return [];
    }
  }
}
