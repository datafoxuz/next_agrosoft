import { MainContextType } from "@/data/interfaces";
import React, { createContext, useState } from "react";

export const MainContext = createContext<MainContextType | null>(null);

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null)
  const [weatherData, setWeatherData] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

  return (
    <MainContext.Provider
      value={{user, setUser, weatherData, setWeatherData, locationInfo, setLocationInfo }}
    >
      {children}
    </MainContext.Provider>
  );
};
