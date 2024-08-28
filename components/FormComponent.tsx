import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { AlertCircle, LoaderCircle, LocateFixed } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as z from "zod";

// Define the Zod schema for form validation
const formSchema = z.object({
  country: z.string().min(1, "نام کشور الزامی است"),
  city: z.string().optional(),
  numLocations: z.number().int().min(1, "تعداد مکان‌ها باید حداقل 1 باشد"),
});

// Infer the form's type from the schema
type FormSchemaType = z.infer<typeof formSchema>;

// Define a type for the errors
type FormErrors = Partial<Record<keyof FormSchemaType, string>>;

interface FormComponentProps {
  country: string;
  setCountry: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  numLocations: number;
  setNumLocations: (value: number) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  timer: number;
}

const FormComponent: React.FC<FormComponentProps> = ({
  country,
  setCountry,
  city,
  setCity,
  numLocations,
  setNumLocations,
  isLoading,
  handleSubmit,
  timer,
}) => {
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestedNumLocations, setSuggestedNumLocations] = useState<
    number | null
  >(null);
  const [userEdited, setUserEdited] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    try {
      formSchema.parse({ country, city, numLocations });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as keyof FormSchemaType] = issue.message;
          }
        });
        setErrors(errors);
      }
      return false;
    }
  };

  const handleSuggestion = async () => {
    if (!validateForm()) {
      return;
    }

    setSuggestionLoading(true);
    setSuggestedNumLocations(null); // Clear previous suggestion

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

      // If validation is successful, proceed to suggest number of locations
      const suggestionResponse = await fetch("/api/suggestNumOfLocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country, city }), // Send country and city if needed
      });

      if (!suggestionResponse.ok) {
        const errorData = await suggestionResponse.json();
        console.error("suggestNumOfLocation API error:", errorData);
        toast.error("خطا در دریافت پیشنهاد تعداد مکان‌ها"); // Show error toast
        return;
      }

      const data = await suggestionResponse.json();
      setSuggestedNumLocations(data); // Assuming the response is a number
      setUserEdited(false); // Reset user edit state
    } catch (error) {
      console.error("Error:", error);
      toast.error("خطا در دریافت پیشنهاد تعداد مکان‌ها"); // Show error toast
    } finally {
      setSuggestionLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    } else {
      // You can optionally add a toast or other UI feedback here
      toast.error("لطفاً تمام فیلدهای ضروری را تکمیل کنید");
    }
  };

  return (
    <div className="sm:w-1/2 mx-auto ">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            فرم دریافت جاذبه‌های گردشگری
          </CardTitle>

          <CardDescription>
            <Alert variant="blue">
              <div className="flex gap-2 ">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>راهنمایی:</AlertTitle>
              </div>
              <AlertDescription className="">
                نام کشور و (در صورت نیاز) نام شهر مورد نظر را وارد کنید و از
                دکمۀ پیشنهاد تعداد مکان کمک بگیرید تا به صورت تقریبی از تعداد
                جاذبه های گردشگری در کشور و شهر مورد نظرتان آگاه شوید.
              </AlertDescription>
            </Alert>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4 text-4xl">
            <div>
              <Label htmlFor="country">نام کشور</Label>
              <Input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                disabled={isLoading}
              />
              {errors.country && (
                <Alert variant="destructive" className="my-2">
                  <AlertDescription className="flex gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.country}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div>
              <Label htmlFor="city">نام شهر (اختیاری)</Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <div className="flex justify-between items-center my-2">
                <Label htmlFor="numLocations">تعداد مکان</Label>
                <Button
                  onClick={handleSuggestion}
                  disabled={isLoading || suggestionLoading}
                  className="mt-2 bg-blue-400"
                  type="submit"
                >
                  {suggestionLoading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      پیشنهاد تعداد مکان
                    </div>
                  ) : (
                    <>
                      <LocateFixed className="ml-2 h-4 w-4 animate-bounce " />{" "}
                      پیشنهاد تعداد مکان
                    </>
                  )}
                </Button>
              </div>
              <Input
                id="numLocations"
                type="number"
                value={
                  suggestedNumLocations !== null && !userEdited
                    ? suggestedNumLocations
                    : numLocations
                }
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setNumLocations(isNaN(value) ? 1 : value);
                  setUserEdited(true);
                }}
                min="1"
                required
                disabled={isLoading}
              />
              {errors.numLocations && (
                <p className="text-red-500 text-sm">{errors.numLocations}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </div>
              ) : (
                "شروع"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormComponent;
