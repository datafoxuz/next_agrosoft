import { MainContextType } from "@/data/interfaces";
import React, { createContext, useState } from "react";

export const MainContext = createContext<MainContextType | null>(null);

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <MainContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </MainContext.Provider>
  );
};
