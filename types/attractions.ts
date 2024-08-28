export interface Photo {
  height: number;
  photo_reference: string;
  width: number;
}
export interface Attraction {
  کشور: string;
  شهر: string;
  نام_مکان: string;
  نام_در_زبان_محلی: string;
  توضیحات: string;
  زمان_تقریبی_لازم: number;
  انرژی_تقریبی_لازم: string;
  میزان_شهرت: string;
  مناسب_خانواده: string;
  مناسب_کودکان: string;
  فقط_آقایان: string;
  فقط_بانوان: string;
  دسته_بندی: string;
  ساعات_کاری: {
    باز_است: boolean;
    متن_ساعات_کاری: string[];
  };
  آدرس: string;
  موقعیت_جغرافیایی: {
    lat: number;
    lng: number;
    url: string;
  };
  اطلاعات_تماس: {
    شماره_تلفن?: string;
    وبسایت?: string;
    شماره_تلفن_بین_المللی?: string;
  };
  کلمات_کلیدی: string[];
  وضعیت?: string;
  عکس_ها?: Photo[] | undefined;
}
