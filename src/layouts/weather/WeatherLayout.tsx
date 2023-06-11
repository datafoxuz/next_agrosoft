import React, { useContext, useEffect, useState } from "react";
import useUserLocation from "@/hooks/useUserLocation";
import {
  WeatherContext,
  WeatherContextProvider,
} from "@/context/weatherContext/WeatherContext";
import { LayoutProps } from "../props";
import { fetchData } from "@/lib/fetchData";

const WeatherLayout = ({ children }: LayoutProps) => {
  const userLocation = useUserLocation();
  const { setWeatherData } = useContext(WeatherContext);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (userLocation) {
          const { latitude, longitude } = userLocation;
          const data = await fetchData(
            `/weather?lat=${latitude}&long=${longitude}`
          );
          setWeatherData(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [userLocation, setWeatherData]);

  return (
    <WeatherContextProvider>
      <div>{children}</div>
    </WeatherContextProvider>
  );
};

export default WeatherLayout;
