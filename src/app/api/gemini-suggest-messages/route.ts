import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { NextResponse } from "next/server";

interface RequestBody {
  body: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Validate the API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not defined in the environment variables." },
        { status: 400 }
      );
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Parse the incoming request body
    const data: RequestBody = await req.json();
    const prompt = data.body;

    // Validate the prompt
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid prompt provided in the request body." },
        { status: 400 }
      );
    }

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = await response.text();

    // Return the generated content
    return NextResponse.json({ output });
  } catch (error: unknown) { 
    console.error("Error in POST handler:", error);

    // Ensure the error is a string or has a message property
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
