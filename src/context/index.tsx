import { MainContextType } from "@/data/interfaces";
import { fetchData } from "@/lib/fetchData";
import React, { createContext, useEffect, useState } from "react";

export const MainContext = createContext<MainContextType | null>(null);

/** Default weather location when nothing else is known: Toshkent. */
export const DEFAULT_COORDS = { lat: 41.2995, long: 69.2401 };

type StoredLocation = {
  districtName?: string;
  regionName?: string;
  lat?: string | number;
  long?: string | number;
};

function readStoredLocation(): StoredLocation | null {
  try {
    const raw = localStorage.getItem("location");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function validCoords(loc: StoredLocation | null) {
  const lat = Number(loc?.lat);
  const long = Number(loc?.long);
  if (!loc || !isFinite(lat) || !isFinite(long) || (lat === 0 && long === 0))
    return null;
  // Uzbekistan bounding box; rejects old stored values with swapped/garbage coords.
  if (lat < 37 || lat > 46 || long < 55 || long > 74) return null;
  return { lat, long };
}

function getBrowserCoords(): Promise<{ lat: number; long: number } | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation)
      return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, long: p.coords.longitude }),
      () => resolve(null),
      { timeout: 8000, maximumAge: 30 * 60 * 1000 }
    );
  });
}

export const MainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationInfo, setLocationInfo] = useState<StoredLocation | null>(
    null
  );
  const [locationReady, setLocationReady] = useState(false);

  // Load the location the user picked earlier (if any).
  useEffect(() => {
    setLocationInfo(readStoredLocation());
    setLocationReady(true);
  }, []);

  // Fetch weather: chosen location -> browser geolocation -> Toshkent.
  useEffect(() => {
    if (!locationReady) return;
    let cancelled = false;
    (async () => {
      const coords =
        validCoords(locationInfo) ??
        (await getBrowserCoords()) ??
        DEFAULT_COORDS;
      const data = await fetchData(
        `/weather?lat=${coords.lat}&long=${coords.long}`
      );
      if (!cancelled && data?.data) setWeatherData(data.data);
    })();
    return () => {
      cancelled = true;
    };
  }, [locationInfo, locationReady]);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        weatherData,
        setWeatherData,
        locationInfo,
        setLocationInfo,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
