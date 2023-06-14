import { StaticImageData } from "next/image";

export interface sitewayProps {
  title: string;
  url: string;
}

export interface cardTypes {
  image: StaticImageData;
  title: string;
  url: string;
  commentsNum?: string;
  date?: string;
  answered?: boolean;
  location?: string;
  price?: string;
}

export interface questionTypes {
  active: boolean;
  title?: string;
  titleFile?: null | StaticImageData;
  desc?: string;
  descFile?: null | StaticImageData;
}

export interface seo {
  title: string;
  description: string;
  image: StaticImageData;
  author: string;
  robots: string;
}

export interface card {
  id: number;
  title: string;
  slug: string;
  image?: StaticImageData;
  images?: StaticImageData[];
  created_at: string;
  body?: string;
  seo?: seo;
  date?: string;
  author_name?: string;
  author_phone?: number;
  country_name?: string;
  region_name?: string;
  low_price?: number;
  high_price?: number;
  amount_type_name?: string;
  answers_count?: number;
  is_answered?: number;
  url?: string;
  commentsNum?: string;
  answered?: boolean;
}

export interface meta {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}

export interface data {
  success: boolean;
  data: card[];
  message: string;
  meta: meta;
}

export interface siteWayTypes {
  title: string;
  url: string;
}

export type Location = {
  latitude: number;
  longitude: number;
} | null;

type StaticImport = any;

export type WeatherData = {
  success: boolean;
  message: string;
  data: {
    coldest_degree: number;
    coldest_time: string;
    current_degree: number;
    daily: [];
    daily_object: [];
    hottest_degree: number;
    hottest_time: string;
    hourly: [];
    humidity: number;
    short_info: null | string;
    time: string;
    weather_icon: number;
    weather_icon_url: string | StaticImageData | StaticImport;
    weather_status: string;
    wind_speed: number;
  };
};

export type LocationInfoType = {
  districtName: string;
  lang: string;
  lat: string;
  regionNmae: string;
};

export interface MainContextType {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<null>>;
  locationInfo: LocationInfoType | null;
  setLocationInfo: React.Dispatch<React.SetStateAction<null>>;
}

export interface DailyAndHourlyWeatherType {
  date: number;
  humidity: number;
  max: number;
  min: number;
  weather_description: string;
  weather_icon: string;
  weather_icon_day: string;
  weather_icon_night: string;
  weather_main: string;
  wind_speed: string;
}

export interface LangTypes {
  active: boolean;
  value: string;
  config?: string;
  flag?: string;
}
