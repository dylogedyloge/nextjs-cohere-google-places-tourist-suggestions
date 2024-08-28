import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TableSkeleton() {
  return (
    <div className="mt-32 border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">کشور</TableHead>
            <TableHead className="text-center font-bold">شهر</TableHead>
            <TableHead className="text-center font-bold">مکان</TableHead>
            <TableHead className="text-center font-bold">
              نام در زبان محلی
            </TableHead>

            <TableHead className="text-center font-bold">توضیحات</TableHead>

            <TableHead className="text-center font-bold">
              زمان تقریبی لازم (دقیقه)
            </TableHead>
            <TableHead className="text-center font-bold">
              {" "}
              انرژی تقریبی لازم
            </TableHead>
            <TableHead className="text-center font-bold">میزان شهرت</TableHead>
            <TableHead className="text-center font-bold">
              مناسب خانواده
            </TableHead>
            <TableHead className="text-center font-bold">
              مناسب کودکان
            </TableHead>
            <TableHead className="text-center font-bold">فقط آقایان</TableHead>
            <TableHead className="text-center font-bold">فقط بانوان</TableHead>
            <TableHead className="text-center font-bold">دسته بندی</TableHead>
            <TableHead className="text-center font-bold">ساعات کاری</TableHead>

            <TableHead className="text-center font-bold ">آدرس</TableHead>
            <TableHead className="text-center font-bold ">
              موقعیت جغرافیایی
            </TableHead>
            <TableHead className="text-center font-bold ">
              اطلاعات تماس
            </TableHead>
            <TableHead className="text-center font-bold">کلمات کلیدی</TableHead>
            <TableHead className="text-center font-bold">وضعیت</TableHead>
            <TableHead className="text-center font-bold">عکس ها</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-16 w-[70px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
