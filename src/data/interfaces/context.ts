import { FullUserData } from "./user";
import { WeatherData } from "./weather";
import { LocationInfoType } from "./location";

export interface MainContextType {
  user: FullUserData | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<null>>;
  locationInfo: LocationInfoType | null;
  setLocationInfo: React.Dispatch<React.SetStateAction<null>>;
}
