import { StaticImageData } from "next/image";

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
