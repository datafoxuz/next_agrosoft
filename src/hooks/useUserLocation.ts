import { useEffect, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
} | null;

const useUserLocation = (): Location => {
  const [location, setLocation] = useState<Location>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    getUserLocation();
  }, []);

  return location;
};

export default useUserLocation;
