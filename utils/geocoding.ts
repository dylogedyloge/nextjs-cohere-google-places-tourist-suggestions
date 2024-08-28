const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

if (!googleApiKey) {
  throw new Error("GOOGLE_API_KEY is not set in environment variables");
}

export async function getGooglePlaceDetails(
  placeId: string
): Promise<GooglePlaceDetails> {
  console.log(`Fetching details for Place ID: ${placeId}`);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}`
  );
  const data = await response.json();
  console.log("Google Place Details response:", data.result);
  return data.result;
}

export async function getPlaceIdFromAutocomplete(
  query: string
): Promise<string | null> {
  console.log(`Fetching Place ID for query: ${query}`);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${googleApiKey}`
  );
  const data = await response.json();
  console.log("Google Place Autocomplete response:", data);
  const predictions = data.predictions;
  if (predictions.length > 0) {
    return predictions[0].place_id; // Return the top match
  }
  return null;
}

// Define the type for Google Place Details
interface GooglePlaceDetails {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_phone_number: string | null;
}
