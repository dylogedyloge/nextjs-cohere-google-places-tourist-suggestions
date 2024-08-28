import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";
import cohereMessage from "@/utils/cohereMessage";
import {
  getGooglePlaceDetails,
  getPlaceIdFromAutocomplete,
} from "@/utils/geocoding";

interface GooglePlaceDetails {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_phone_number?: string | null;
  website?: string | null;
  international_phone_number?: string | null;
  business_status?: string | null;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  } | null;
  icon?: string | null;
  photos?: {
    photo_reference: string;
  }[];
}

const cohereApiKey = process.env.COHERE_API_KEY;

if (!cohereApiKey) {
  throw new Error("COHERE_API_KEY is not set in environment variables");
}

const cohere = new CohereClient({
  token: cohereApiKey,
});

export async function POST(req: Request) {
  try {
    const { country, city, numLocations } = await req.json();
    console.log("Request received:", { country, city, numLocations });

    // const response = await cohere.chat({
    //   model: "command-r-plus",
    //   message: cohereMessage(numLocations, country, city),
    //   responseFormat: {
    //     type: "json_object",
    //     schema: {
    //       type: "object",
    //       required: ["attractions"],
    //       properties: {
    //         attractions: {
    //           type: "array",

    //           items: {
    //             type: "object",
    //             required: [
    //               "شهر",
    //               "نام_مکان",
    //               "نام_در_زبان_محلی",
    //               "شهر_در_زبان_محلی",
    //               "کشور_در_زبان_محلی",
    //               "آدرس",
    //               "موقعیت_جغرافیایی",
    //               "توضیحات",
    //               "زمان_تقریبی_لازم",
    //               "انرژی_تقریبی_لازم",
    //               "میزان_شهرت",
    //               "مناسب_خانواده",
    //               "مناسب_کودکان",
    //               "فقط_آقایان",
    //               "فقط_بانوان",
    //               "دسته_بندی",
    //               "ساعات_کاری",
    //               "اطلاعات_تماس",
    //               "کلمات_کلیدی",
    //             ],
    //             properties: {
    //               شهر: { type: "string" },
    //               نام_مکان: { type: "string" },
    //               نام_در_زبان_محلی: { type: "string" },
    //               شهر_در_زبان_محلی: { type: "string" },
    //               کشور_در_زبان_محلی: { type: "string" },
    //               آدرس: { type: "string" },
    //               موقعیت_جغرافیایی: { type: "string" },
    //               توضیحات: { type: "string" },
    //               زمان_تقریبی_لازم: { type: "number" },
    //               انرژی_تقریبی_لازم: { type: "string" },
    //               میزان_شهرت: { type: "string" },
    //               مناسب_خانواده: { type: "string" },
    //               مناسب_کودکان: { type: "string" },
    //               فقط_آقایان: { type: "string" },
    //               فقط_بانوان: { type: "string" },
    //               دسته_بندی: { type: "string" },
    //               ساعات_کاری: {
    //                 type: "object",
    //                 properties: {
    //                   باز_است: { type: "boolean" },
    //                   متن_ساعات_کاری: {
    //                     type: "array",
    //                     items: { type: "string" },
    //                   },
    //                 },
    //               },
    //               اطلاعات_تماس: { type: "string" },
    //               کلمات_کلیدی: {
    //                 type: "array",
    //                 items: { type: "string" },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    const response = await cohere.chat({
      model: "command-r-plus",
      message: cohereMessage(numLocations, country, city),
      responseFormat: {
        type: "json_object",
        schema: {
          type: "object",
          required: ["attractions"],
          properties: {
            attractions: {
              type: "array",
              items: {
                type: "object",
                required: [
                  "شهر",
                  "نام_مکان",
                  "نام_در_زبان_محلی",
                  "شهر_در_زبان_محلی",
                  "کشور_در_زبان_محلی",
                  "آدرس",
                  "موقعیت_جغرافیایی",
                  "توضیحات",
                  "زمان_تقریبی_لازم",
                  "انرژی_تقریبی_لازم",
                  "میزان_شهرت",
                  "مناسب_خانواده",
                  "مناسب_کودکان",
                  "فقط_آقایان",
                  "فقط_بانوان",
                  "دسته_بندی",
                  "ساعات_کاری",
                  "اطلاعات_تماس",
                  "کلمات_کلیدی",
                ],
                properties: {
                  شهر: { type: "string" },
                  نام_مکان: { type: "string" },
                  نام_در_زبان_محلی: { type: "string" },
                  شهر_در_زبان_محلی: { type: "string" },
                  کشور_در_زبان_محلی: { type: "string" },
                  آدرس: { type: "string" },
                  موقعیت_جغرافیایی: { type: "string" },
                  توضیحات: { type: "string" },
                  زمان_تقریبی_لازم: { type: "number" },
                  انرژی_تقریبی_لازم: { type: "string" },
                  میزان_شهرت: { type: "string" },
                  مناسب_خانواده: { type: "string" },
                  مناسب_کودکان: { type: "string" },
                  فقط_آقایان: { type: "string" },
                  فقط_بانوان: { type: "string" },
                  دسته_بندی: { type: "string" },
                  ساعات_کاری: {
                    type: "object",
                    required: ["باز_است", "متن_ساعات_کاری"],
                    properties: {
                      باز_است: { type: "boolean" },
                      متن_ساعات_کاری: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                  اطلاعات_تماس: {
                    type: "object",
                    required: ["شماره_تلفن", "وبسایت", "شماره_تلفن_بین_المللی"],
                    properties: {
                      شماره_تلفن: { type: "string" },
                      وبسایت: { type: "string" },
                      شماره_تلفن_بین_المللی: { type: "string" },
                    },
                  },
                  کلمات_کلیدی: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("Cohere API response:", response);

    const attractions = JSON.parse(response.text).attractions;
    console.log("Parsed attractions:", attractions);

    const attractionsWithDetails = await Promise.all(
      attractions.map(async (attraction: any) => {
        const placeId = await getPlaceIdFromAutocomplete(
          attraction.نام_در_زبان_محلی
        );

        if (!placeId) {
          console.log(`No Place ID found for ${attraction.نام_در_زبان_محلی}`);
          return {
            کشور: country,
            ...attraction,
            آدرس: "اطلاعاتی موجود نیست",
            موقعیت_جغرافیایی: "اطلاعاتی موجود نیست",
            اطلاعات_تماس: "اطلاعاتی موجود نیست",
            منبع_اطلاعات: "Cohere AI",
          };
        }
        const placeDetails: GooglePlaceDetails = await getGooglePlaceDetails(
          placeId
        );
        return {
          کشور: country,
          ...attraction,
          آدرس: placeDetails.formatted_address,
          موقعیت_جغرافیایی: {
            lat: placeDetails.geometry.location.lat,
            lng: placeDetails.geometry.location.lng,
            url: `https://www.google.com/maps?q=${placeDetails.geometry.location.lat},${placeDetails.geometry.location.lng}`,
          },
          منبع_اطلاعات: "Cohere AI + Google Places",
          اطلاعات_تماس: {
            شماره_تلفن:
              placeDetails.formatted_phone_number || "اطلاعاتی موجود نیست",
            وبسایت: placeDetails.website || "اطلاعاتی موجود نیست",
            شماره_تلفن_بین_المللی:
              placeDetails.international_phone_number || "اطلاعاتی موجود نیست",
          },
          وضعیت: placeDetails.business_status || "اطلاعاتی موجود نیست",
          ساعات_کاری: {
            باز_است: placeDetails.opening_hours?.open_now || false,
            متن_ساعات_کاری: placeDetails.opening_hours?.weekday_text || [],
          },
          عکس_ها:
            placeDetails.photos?.map((photo) => photo.photo_reference) || [],
        };
      })
    );

    return NextResponse.json({ attractions: attractionsWithDetails });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching attractions" },
      { status: 500 }
    );
  }
}
