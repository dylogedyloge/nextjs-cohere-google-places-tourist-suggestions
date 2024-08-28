"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import FormComponent from "@/components/FormComponent";
import TableComponent from "@/components/TableComponent";
import TableSkeleton from "@/components/TableSkeleton";
import { Attraction } from "@/types/attractions";

const businessStatusMap: Record<string, string> = {
  OPERATIONAL: "فعال",
  CLOSED_TEMPORARILY: "بسته موقت",
  CLOSED_PERMANENTLY: "بسته دائم",
};

const Form = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [numLocations, setNumLocations] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [loadingTime, setLoadingTime] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoading) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isLoading && timer !== 0) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      if (minutes === 0) {
        setLoadingTime(`${seconds} ثانیه`);
      } else {
        setLoadingTime(`${minutes} دقیقه و ${seconds} ثانیه`);
      }
      setTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAttractions([]);
    setJsonData(null);
    setLoadingTime(null);

    try {
      // Call the cityCountryValidation API first
      const validationResponse = await fetch("/api/cityCountryValidation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country, city }),
      });

      if (!validationResponse.ok) {
        const errorData = await validationResponse.json();
        console.error("cityCountryValidation API error:", errorData);
        toast.error(errorData.error); // Display the specific error message
        return; // Exit the function if there's an error
      }

      // If validation passes, call the attractions API
      const response = await fetch("/api/attractions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country, city, numLocations }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fetch error:", errorData);
        throw new Error("Failed to fetch attractions");
      } else {
        toast.success("اطلاعات مورد نظر شما با موفقیت تولید شد.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setAttractions(data.attractions);
      setJsonData(JSON.stringify(data.attractions, null, 2));
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(`هنگام دریافت اطلاعات خطایی رخ داد: ${error.message}`);
      } else {
        toast.error("هنگام دریافت اطلاعات خطای ناشناختهای رخ داد");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-screen mx-auto mt-10 p-5 ">
      <FormComponent
        country={country}
        setCountry={setCountry}
        city={city}
        setCity={setCity}
        numLocations={numLocations}
        setNumLocations={setNumLocations}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        timer={timer}
      />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          attractions={attractions}
          jsonData={jsonData}
          loadingTime={loadingTime}
          businessStatusMap={businessStatusMap}
        />
      )}
    </div>
  );
};

export default Form;
