import React, { useContext, useEffect, useState } from "react";
import useUserLocation from "@/hooks/useUserLocation";
import { LayoutProps } from "../props";
import { fetchData } from "@/lib/fetchData";
import { useMyContext } from "@/hooks/useMyContext";

const WeatherLayout = ({ children }: LayoutProps) => {
  const userLocation = useUserLocation();
  const { setWeatherData } = useMyContext();
  const location = localStorage.getItem("location");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (userLocation) {
          const { latitude, longitude } = userLocation;
          const data = await fetchData(
            `/weather?lat=${latitude}&long=${longitude}`
          );
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [userLocation, setWeatherData]);

  return <div>{children}</div>;
};

export default WeatherLayout;
