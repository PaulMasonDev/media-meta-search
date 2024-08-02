import { type NextRequest, NextResponse } from "next/server";
import { showRecommendationPrompt } from "./prompt";

interface MyShowRecommendationPostData {
  names: string[];
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(request: NextRequest) {
  const data: MyShowRecommendationPostData =
    (await request.json()) as MyShowRecommendationPostData;

  console.log(data.names);
  try {
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: showRecommendationPrompt(data.names) },
          ],
          temperature: 0.7,
        }),
      },
    );

    if (!openAIResponse.ok) {
      throw new Error("Failed to fetch from OpenAI");
    }

    const openAIData: OpenAIResponse =
      (await openAIResponse.json()) as OpenAIResponse;
    const parsedData: ShowRecommendation[] = JSON.parse(
      openAIData.choices[0]?.message.content,
    ) as ShowRecommendation[];
    const showNames = parsedData.map((show) => show.showName);

    const requests = showNames.map((showName) =>
      fetch(`https://api.tvmaze.com/singlesearch/shows?q=${showName}`),
    );
    try {
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map((res) => res.json()));
      const showRecommendations = data.map((show) => {
        return {
          ...show,
          reason: parsedData.find(
            (parsedShow) => parsedShow.showName === show.name,
          )?.reason,
        };
      });
      return new NextResponse(JSON.stringify(showRecommendations));
    } catch (error) {
      console.error("Failed to retrieve show details", error);
      return [];
    }
    // return NextResponse.json(openAIData.choices[0]?.message.content);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
      },
    );
  }
}
