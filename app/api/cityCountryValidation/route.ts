// import { NextResponse } from "next/server";
// import { CohereClient } from "cohere-ai";

// const cohereApiKey = process.env.COHERE_API_KEY;

// if (!cohereApiKey) {
//   throw new Error("COHERE_API_KEY is not set in environment variables");
// }

// const cohere = new CohereClient({
//   token: cohereApiKey,
// });

// export async function POST(req: Request) {
//   try {
//     const { country, city } = await req.json();

//     // Validate the country
//     const countryResponse = await cohere.chat({
//       model: "command-r-plus",
//       message: `Is "${country}" a valid country? Please just answer with yes or no.`,
//     });

//     const countryAnswer = countryResponse.text.trim().toLowerCase();
//     if (!countryAnswer.includes("yes")) {
//       return NextResponse.json(
//         { error: `${country} نام یک کشور نیست` },
//         { status: 400 }
//       );
//     }

//     // Validate the city
//     const cityResponse = await cohere.chat({
//       model: "command-r-plus",
//       message: `Is "${city}" a valid city? Please just answer with yes or no.`,
//     });

//     const cityAnswer = cityResponse.text.trim().toLowerCase();
//     if (!cityAnswer.includes("yes")) {
//       return NextResponse.json(
//         { error: `${city} نام یک شهر نیست` },
//         { status: 400 }
//       );
//     }

//     // Check if the city is located in the specified country
//     const placementResponse = await cohere.chat({
//       model: "command-r-plus",
//       message: `Is "${city}" located in "${country}"? Please just answer with yes or no.`,
//     });

//     const placementAnswer = placementResponse.text.trim().toLowerCase();
//     if (!placementAnswer.includes("yes")) {
//       return NextResponse.json(
//         { error: `${city} در کشور ${country} قرار ندارد` },
//         { status: 400 }
//       );
//     }

//     // If all validations pass
//     return NextResponse.json({ isValid: true });
//   } catch (error) {
//     console.error("Server error:", error);
//     return NextResponse.json(
//       { error: "An error occurred during validation" },
//       { status: 500 }
//     );
//   }
// }
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

    // Validate the country
    const countryResponse = await cohere.chat({
      model: "command-r-plus",
      message: `Is "${country}" a valid country? Please just answer with yes or no.`,
    });

    const countryAnswer = countryResponse.text.trim().toLowerCase();
    if (!countryAnswer.includes("yes")) {
      return NextResponse.json(
        { error: `${country} نام یک کشور نیست` },
        { status: 400 }
      );
    }

    // If the city is provided, validate it
    if (city) {
      const cityResponse = await cohere.chat({
        model: "command-r-plus",
        message: `Is "${city}" a valid city? Please just answer with yes or no.`,
      });

      const cityAnswer = cityResponse.text.trim().toLowerCase();
      if (!cityAnswer.includes("yes")) {
        return NextResponse.json(
          { error: `${city} نام یک شهر نیست` },
          { status: 400 }
        );
      }

      // Check if the city is located in the specified country
      const placementResponse = await cohere.chat({
        model: "command-r-plus",
        message: `Is "${city}" located in "${country}"? Please just answer with yes or no.`,
      });

      const placementAnswer = placementResponse.text.trim().toLowerCase();
      if (!placementAnswer.includes("yes")) {
        return NextResponse.json(
          { error: `${city} در کشور ${country} قرار ندارد` },
          { status: 400 }
        );
      }
    }

    // If all validations pass
    return NextResponse.json({ isValid: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "An error occurred during validation" },
      { status: 500 }
    );
  }
}
