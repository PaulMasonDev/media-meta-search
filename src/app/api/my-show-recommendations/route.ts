// src/app/api/my-show-recommendations/route.ts
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
