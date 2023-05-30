import React, { createContext, useState } from "react";

type WeatherData = {
  // Define the structure of the weather data
};

type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
};

type WeatherContextProviderProps = {
  children: React.ReactNode;
};

export const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  setWeatherData: () => {},
});

export const WeatherContextProvider = ({
  children,
}: WeatherContextProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
