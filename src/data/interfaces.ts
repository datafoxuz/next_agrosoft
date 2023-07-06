import { StaticImageData } from "next/image";

export interface User {
  address: string | null;
  componay_name: string | null;
  country_id: number | null;
  created_at: string;
  deleted_at: string | null;
  email: string;
  email_verified_at: string;
  firstname: string | null;
  id: number;
  lastname: string | null;
  name: string | null;
  phone: string | null;
  photo: string | null;
  photo_file_id: number | null;
  profession: string | null;
  region_id: string | null;
  role: string;
  status: string;
  territory: string | null;
  updated_at: string | null;
  username: string | null;
  photo_id: number;
}

export interface FullUserData {
  data: User;
  message: string;
  success: boolean;
}

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
  file?: null | File;
  desc?: string;
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
  status: number;
  answers?: {
    data: answerType[];
  };
}

export interface responseData {
  success?: boolean;
  status: number;
  data: card;
  message?: string;
  similar: [];
  seo: {
    author: string;
    description: string;
    image: string;
    robots: string;
    title: string;
  };
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
  status: number;
  seo: {
    title: string;
    keyword: string;
    descriptions: string;
  };
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
  user: FullUserData | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
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
  value: string;
  config?: string;
  flag?: string;
}

export interface districtTypes {
  districtName: string;
  lang: string;
  lat: string;
}

export interface answerType {
  created_at: string;
  id: number;
  problem_id: number;
  text: string;
  updated_at: string;
  user_id: number;
  images: StaticImageData[];
}
