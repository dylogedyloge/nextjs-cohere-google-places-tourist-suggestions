import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";

const cohereApiKey = process.env.COHERE_API_KEY;

if (!cohereApiKey) {
  throw new Error("COHERE_API_KEY is not set in environment variables");
}

const cohere = new CohereClient({
  token: cohereApiKey,
});

export async function POST(req: Request) {
  try {
    const { country, city } = await req.json();

    // Ask Cohere AI how many tourist attractions exist in the specified country and city
    const response = await cohere.chat({
      model: "command-r-plus",
      message: `How many tourist attractions exist in ${country}, ${city}?  Please suggest the maximum number of locations and consider these categories:
      \"رستوران\"، \"طبیعت\"، \"خرید\"، \"مذهبی\"، \"فرهنگی-هنری\"، \"تاریخی\"، \"ماجراجویی\`.Please answer just with a number.`,
    });

    const answer = response.text.trim();

    // Check if the answer is a valid number
    const parsedNumber = parseInt(answer, 10);
    if (!isNaN(parsedNumber)) {
      return NextResponse.json(parsedNumber); // Return the number
    } else {
      return NextResponse.json(
        { error: "Unable to retrieve a valid number." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while retrieving the number of attractions.",
      },
      { status: 500 }
    );
  }
}
