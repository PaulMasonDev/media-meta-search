// src/app/api/my-show-recommendations/route.ts
import { type NextRequest, NextResponse } from "next/server";

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

  const prompt = `Based on the following shows: ${data.names.join(", ")}, recommend me some new shows to watch (maximum of 4 shows). Please include potential reasons for the recommendations as well when applicable.`;

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
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      },
    );

    if (!openAIResponse.ok) {
      throw new Error("Failed to fetch from OpenAI");
    }

    const openAIData: OpenAIResponse =
      (await openAIResponse.json()) as OpenAIResponse;
    return NextResponse.json(openAIData.choices[0]?.message.content);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
      },
    );
  }
}
