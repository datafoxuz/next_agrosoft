import React, { useContext, useEffect, useState } from "react";
import useUserLocation from "@/hooks/useUserLocation";
import { LayoutProps } from "../props";
import { fetchData } from "@/lib/fetchData";
import { useMyContext } from "@/hooks/useMyContext";

const WeatherLayout = ({ children }: LayoutProps) => {
  const userLocation = useUserLocation();
  const { setWeatherData } = useMyContext();
  let locationInfo: { name: string; long: string; lat: string } | null = null;

  // if (typeof window !== "undefined" && localStorage) {
  //   locationInfo = JSON.parse(localStorage.getItem("location"));
  // }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (locationInfo) {
          const data = await fetchData(
            `/weather?lat=${locationInfo.long}&long=${locationInfo.lat}`
          );
          setWeatherData(data);
        }
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
  }, [userLocation, setWeatherData, locationInfo]);

  return <div>{children}</div>;
};

export default WeatherLayout;
