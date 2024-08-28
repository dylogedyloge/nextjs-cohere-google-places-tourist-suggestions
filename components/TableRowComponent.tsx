import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { MapPin, DownloadIcon, CircleX } from "lucide-react";
import { Attraction, Photo } from "@/types/attractions";
import { useState } from "react";
import EditableComponent from "@/components/EditableCell";
import { Separator } from "@/components/ui/separator";

interface TableRowComponentProps {
  attraction: Attraction;
  index: number;
  handleSave: (index: number, key: string, newValue: string) => void;
  handleRemoveRow: (index: number) => void;
  businessStatusMap: Record<string, string>;
}

const TableRowComponent: React.FC<TableRowComponentProps> = ({
  attraction,
  index,
  handleSave,
  handleRemoveRow,
  businessStatusMap,
}) => {
  const [editedData, setEditedData] = useState(attraction);
  const [photos, setPhotos] = useState<Photo[]>(attraction.عکس_ها || []);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [isRemoveRowConfirmationOpen, setIsRemoveRowConfirmationOpen] =
    useState(false);

  const handleRemoveRowClick = () => {
    console.log("first");
    setIsRemoveRowConfirmationOpen(true);
    console.log(isRemoveRowConfirmationOpen);
  };

  const handleConfirmRemoveRow = () => {
    handleRemoveRow(index);
    setIsRemoveRowConfirmationOpen(false);
  };

  const handleCellValueChange = (key: any, newValue: any) => {
    const updatedData = {
      ...editedData,
      [key]: newValue,
    };
    setEditedData(updatedData);
  };

  const handleRemovePhoto = () => {
    console.log("Photos before removal:", photos);
    console.log("Selected photo:", selectedPhoto);
    if (selectedPhoto) {
      const updatedPhotos = photos.filter((photo) => {
        console.log("Photo reference:", photo);
        console.log("Selected photo reference:", selectedPhoto);
        return photo !== selectedPhoto;
      });
      console.log("Photos after removal:", updatedPhotos);
      setPhotos(updatedPhotos);
      setSelectedPhoto(null);
      setIsConfirmationOpen(false);
    } else {
      console.warn("No photo selected for removal");
    }
  };

  return (
    <TableRow key={index}>
      <TableCell className="text-center">
        <EditableComponent
          value={attraction.کشور}
          onSave={(newValue) => handleSave(index, "کشور", newValue)}
          onValueChange={(newValue) => handleCellValueChange("کشور", newValue)}
        />
      </TableCell>
      <TableCell className="text-center">
        <EditableComponent
          value={attraction.شهر}
          onSave={(newValue) => handleSave(index, "شهر", newValue)}
          onValueChange={(newValue) => handleCellValueChange("شهر", newValue)}
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.نام_مکان}
          onSave={(newValue) => handleSave(index, "نام_مکان", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("نام_مکان", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.نام_در_زبان_محلی}
          onSave={(newValue) => handleSave(index, "نام_در_زبان_محلی", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("نام_در_زبان_محلی", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-justify w-64 h-56 relative ">
        <EditableComponent
          value={attraction.توضیحات}
          onSave={(newValue) => handleSave(index, "توضیحات", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("توضیحات", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={String(attraction.زمان_تقریبی_لازم)} // Convert number to string
          onSave={(newValue) => handleSave(index, "زمان_تقریبی_لازم", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("زمان_تقریبی_لازم", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.انرژی_تقریبی_لازم}
          onSave={(newValue) =>
            handleSave(index, "انرژی_تقریبی_لازم", newValue)
          }
          onValueChange={(newValue) =>
            handleCellValueChange("انرژی_تقریبی_لازم", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.میزان_شهرت}
          onSave={(newValue) => handleSave(index, "میزان_شهرت", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("میزان_شهرت", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.مناسب_خانواده}
          onSave={(newValue) => handleSave(index, "مناسب_خانواده", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("مناسب_خانواده", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.مناسب_کودکان}
          onSave={(newValue) => handleSave(index, "مناسب_کودکان", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("مناسب_کودکان", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.فقط_آقایان}
          onSave={(newValue) => handleSave(index, "فقط_آقایان", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("فقط_آقایان", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.فقط_بانوان}
          onSave={(newValue) => handleSave(index, "فقط_بانوان", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("فقط_بانوان", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={attraction.دسته_بندی}
          onSave={(newValue) => handleSave(index, "دسته_بندی", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("دسته_بندی", newValue)
          }
        />
      </TableCell>
      <TableCell dir="ltr" className="text-center">
        {typeof attraction.ساعات_کاری === "object" ? (
          <div className="flex flex-col gap-2">
            <div className="font-bold text-xs" dir="rtl">
              الآن&nbsp;
              {attraction.ساعات_کاری.باز_است ? "باز است" : "بسته است"}
            </div>
            <Separator className="bg-gray-600" />
            {attraction.ساعات_کاری && attraction.ساعات_کاری.متن_ساعات_کاری ? (
              <>
                <div dir="rtl" className="font-bold text-xs">
                  ساعات کاری:
                </div>
                <div className="overflow-hidden line-clamp-4">
                  <EditableComponent
                    value={attraction.ساعات_کاری.متن_ساعات_کاری.join(", ")}
                    onSave={(newValue) =>
                      handleSave(
                        index,
                        "ساعات_کاری",
                        JSON.stringify({
                          ...attraction.ساعات_کاری,
                          متن_ساعات_کاری: newValue.split(", "),
                        })
                      )
                    }
                    onValueChange={(newValue) =>
                      handleCellValueChange(
                        "ساعات_کاری",
                        JSON.stringify({
                          ...attraction.ساعات_کاری,
                          متن_ساعات_کاری: newValue.split(", "),
                        })
                      )
                    }
                  />
                </div>
              </>
            ) : (
              "اطلاعاتی موجود نیست"
            )}
          </div>
        ) : (
          attraction.ساعات_کاری
        )}
      </TableCell>
      <TableCell className="text-justify w-64 h-56 relative">
        <EditableComponent
          value={attraction.آدرس}
          onSave={(newValue) => handleSave(index, "آدرس", newValue)}
          onValueChange={(newValue) => handleCellValueChange("آدرس", newValue)}
        />
      </TableCell>
      <TableCell className="text-center ">
        {attraction.موقعیت_جغرافیایی ? (
          <div className="flex flex-col gap-6">
            {/* Editable Latitude */}
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xs" dir="rtl">
                عرض جغرافیایی:
              </span>
              <span dir="ltr">
                <EditableComponent
                  value={String(attraction.موقعیت_جغرافیایی.lat)} // Convert number to string
                  onSave={(newValue) => {
                    const updatedValue = parseFloat(newValue);
                    if (!isNaN(updatedValue)) {
                      handleSave(
                        index,
                        "موقعیت_جغرافیایی.lat",
                        String(updatedValue)
                      );
                    }
                  }}
                  onValueChange={(newValue) =>
                    handleCellValueChange("موقعیت_جغرافیایی.lat", newValue)
                  }
                />
              </span>
            </div>
            <Separator className="bg-gray-600" />

            {/* Editable Longitude */}
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xs">طول جغرافیایی:</span>
              <span dir="ltr">
                <EditableComponent
                  value={String(attraction.موقعیت_جغرافیایی.lng)} // Convert number to string
                  onSave={(newValue) => {
                    const updatedValue = parseFloat(newValue);
                    if (!isNaN(updatedValue)) {
                      handleSave(
                        index,
                        "موقعیت_جغرافیایی.lng",
                        String(updatedValue)
                      );
                    }
                  }}
                  onValueChange={(newValue) =>
                    handleCellValueChange("موقعیت_جغرافیایی.lng", newValue)
                  }
                />
              </span>
            </div>
            <Separator className="bg-gray-600" />

            {/* Map Link */}
            <a
              href={attraction.موقعیت_جغرافیایی.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400  flex justify-center items-center gap-1 "
            >
              <MapPin className="text-blue-400 " />
              <span className="text-xs text-blue-400 font-bold">
                روی نقشه ببینید
              </span>
            </a>
          </div>
        ) : (
          "اطلاعاتی موجود نیست"
        )}
      </TableCell>
      <TableCell dir="ltr" className="text-center ">
        {typeof attraction.اطلاعات_تماس === "object" ? (
          <div className="flex flex-col gap-6">
            {attraction.اطلاعات_تماس.شماره_تلفن && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-xs" dir="rtl">
                  تلفن:
                </span>
                <span dir="ltr">
                  <EditableComponent
                    value={attraction.اطلاعات_تماس.شماره_تلفن}
                    onSave={(newValue) =>
                      handleSave(index, "اطلاعات_تماس.شماره_تلفن", newValue)
                    }
                    onValueChange={(newValue) =>
                      handleCellValueChange("اطلاعات_تماس.شماره_تلفن", newValue)
                    }
                  />
                </span>
              </div>
            )}
            <Separator className="bg-gray-600" />

            {attraction.اطلاعات_تماس.وبسایت && (
              <div className="flex flex-col gap-2" dir="rtl">
                <span className="font-bold text-xs">وبسایت:</span>
                <span dir="ltr">
                  <EditableComponent
                    value={attraction.اطلاعات_تماس.وبسایت}
                    onSave={(newValue) =>
                      handleSave(index, "اطلاعات_تماس.وبسایت", newValue)
                    }
                    onValueChange={(newValue) =>
                      handleCellValueChange("اطلاعات_تماس.وبسایت", newValue)
                    }
                  />
                </span>
              </div>
            )}
          </div>
        ) : (
          attraction.اطلاعات_تماس
        )}
      </TableCell>

      <TableCell className="text-center italic ">
        <EditableComponent
          value={attraction.کلمات_کلیدی.join(", ")}
          onSave={(newValue) => handleSave(index, "کلمات_کلیدی", newValue)}
          onValueChange={(newValue) =>
            handleCellValueChange("کلمات_کلیدی", newValue)
          }
        />
      </TableCell>
      <TableCell className="text-center ">
        <EditableComponent
          value={
            attraction.وضعیت && businessStatusMap[attraction.وضعیت]
              ? businessStatusMap[attraction.وضعیت]
              : attraction.وضعیت || "نامشخص"
          }
          onSave={(newValue) => handleSave(index, "وضعیت", newValue)}
          onValueChange={(newValue) => handleCellValueChange("وضعیت", newValue)}
        />
      </TableCell>
      <TableCell className="text-center">
        {photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {photos.map((photo, idx) => (
              <Dialog
                key={photo.photo_reference}
                onOpenChange={(open) => !open && setSelectedPhoto(null)}
              >
                <DialogTrigger asChild>
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                    alt={`Photo ${idx + 1} of ${attraction.نام_مکان}`}
                    width={200}
                    height={200}
                    className="object-cover cursor-pointer"
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>تصاویر</DialogTitle>
                  </DialogHeader>
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                    alt={`Photo ${idx + 1} of ${attraction.نام_مکان}`}
                    width={400}
                    height={400}
                    className="object-contain rounded-lg"
                  />
                  <Button
                    onClick={() => {
                      const downloadUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
                      window.open(downloadUrl, "_blank");
                    }}
                    className="mt-2"
                  >
                    <DownloadIcon className="ml-2 h-4 w-4" />
                    دانلود تصویر
                  </Button>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setIsConfirmationOpen(true);
                    }}
                  >
                    حذف تصویر
                  </Button>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <span>اطلاعاتی موجود نیست</span>
        )}
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
            </DialogHeader>
            <p>آیا مطمئن هستید که می‌خواهید این تصویر را حذف کنید؟</p>
            <DialogFooter className="flex gap-2">
              <Button
                variant="default"
                onClick={() => setIsConfirmationOpen(false)}
              >
                انصراف
              </Button>
              <Button variant="destructive" onClick={handleRemovePhoto}>
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="text-center bg-red-900">
        <Dialog
          open={isRemoveRowConfirmationOpen}
          onOpenChange={setIsRemoveRowConfirmationOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              onClick={handleRemoveRowClick}
              className="flex items-center gap-2"
            >
              <CircleX className="h-4 w-4" />
              حذف
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تایید حذف ردیف</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              آیا مطمئن هستید که میخواهید این ردیف را حذف کنید؟
            </DialogDescription>
            <DialogFooter className="flex gap-2">
              <Button onClick={() => setIsRemoveRowConfirmationOpen(false)}>
                انصراف
              </Button>
              <Button variant="destructive" onClick={handleConfirmRemoveRow}>
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
