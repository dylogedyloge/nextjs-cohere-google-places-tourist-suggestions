import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import TableHeaderComponent from "./TableHeaderComponent";
import TableRowComponent from "./TableRowComponent";
import { downloadJson, downloadCsv } from "@/utils/download";
import { Attraction } from "@/types/attractions";
import { Braces, DatabaseBackup, Save, Sheet } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TableComponentProps {
  attractions: Attraction[];
  jsonData: string | null;
  loadingTime: string | null;
  businessStatusMap: Record<string, string>;
}

const TableComponent: React.FC<TableComponentProps> = ({
  attractions: initialAttractions,
  jsonData,
  businessStatusMap,
}) => {
  const [attractions, setAttractions] = useState(initialAttractions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownloadJson = () => {
    const jsonData = JSON.stringify(attractions, null, 2); // Use the current state of attractions
    downloadJson(jsonData, "جاذبه_های_گردشگری.json");
  };
  const generateCsvData = (data: any) => {
    const header = Object.keys(data[0]).join(","); // Get the CSV header from the keys of the first object
    const rows = data.map((row: Attraction) => Object.values(row).join(",")); // Map each row to a CSV string
    return [header, ...rows].join("\n"); // Join header and rows with new lines
  };

  const handleDownloadCsv = () => {
    const csvData = generateCsvData(attractions); // Use the current state of attractions
    downloadCsv(csvData, "جاذبه_های_گردشگری.csv");
  };

  const handleSaveToDatabase = () => {
    // Implement your save to database logic here
    console.log("Saving to database...");
    setIsDialogOpen(false); // Close the dialog after saving
  };

  const handleRemoveRow = (index: number) => {
    const updatedAttractions = attractions.filter((_, i) => i !== index);
    setAttractions(updatedAttractions);
  };

  const handleSave = (index: number, key: string, newValue: string) => {
    const updatedAttractions = [...attractions];
    const attraction = updatedAttractions[index];

    if (key.includes("موقعیت_جغرافیایی") || key.includes("اطلاعات_تماس")) {
      const [parentKey, childKey] = key.split(".");
      (attraction as any)[parentKey] = {
        ...(attraction as any)[parentKey],
        [childKey]: parseFloat(newValue), // Convert the string back to a number
      };
    } else if (key === "عکس_ها") {
      (attraction as any)[key] = JSON.parse(newValue); // Update the specific property
    } else if (key === "کلمات_کلیدی") {
      (attraction as any)[key] = newValue
        .split(",")
        .map((keyword) => keyword.trim()); // Split string into array and trim each item
    } else if (key === "ساعات_کاری") {
      const updatedHours = JSON.parse(newValue);
      (attraction as any)[key] = updatedHours;
    } else {
      (attraction as any)[key] = newValue; // Update the specific property
    }

    setAttractions(updatedAttractions); // Update the state with the new array
  };

  return (
    <>
      {jsonData && (
        <div className="mt-20 flex items-center gap-2 sm:w-1/2 mx-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="flex items-center gap-2">
                <Save size={14} />
                ذخیره تغییرات
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>عملیات ذخیره‌سازی</DialogTitle>
                <DialogDescription className="justify-end">
                  لطفا یکی از گزینه‌های زیر را انتخاب کنید.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col gap-4">
                <Button onClick={handleDownloadCsv} className="w-full gap-2">
                  <Sheet size={14} /> دانلود فایل CSV
                </Button>
                <Button onClick={handleDownloadJson} className="w-full gap-2">
                  <Braces size={14} /> دانلود فایل JSON
                </Button>
                <Button onClick={handleSaveToDatabase} className="w-full gap-2">
                  <DatabaseBackup size={14} />
                  ذخیره در دیتابیس
                </Button>
              </div>
              <DialogClose asChild>
                <Button variant="outline" className="mt-4">
                  بستن
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {attractions.length > 0 && (
        <Card className="mt-5 animate-in sm:w-1/2 mx-auto">
          <CardContent>
            <ScrollArea className="w-full h-[400px]" dir="rtl">
              <Table>
                <TableHeaderComponent />
                <TableBody>
                  {attractions.map((attraction, index) => (
                    <TableRowComponent
                      key={index}
                      attraction={attraction}
                      index={index}
                      handleSave={handleSave}
                      businessStatusMap={businessStatusMap}
                      handleRemoveRow={handleRemoveRow}
                    />
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TableComponent;
