import { Location } from "@/data/interfaces";
import useUserLocation from "@/hooks/useUserLocation";

const fetchUserLocation = async (): Promise<Location> => {
  const location = await new Promise<Location>((resolve) => {
    const getLocation = async () => {
      const userLocation = useUserLocation();
      resolve(userLocation);
    };

    getLocation();
  });

  return location;
};

export default fetchUserLocation;
