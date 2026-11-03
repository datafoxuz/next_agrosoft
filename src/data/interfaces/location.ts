export type Location = {
  latitude: number;
  longitude: number;
} | null;

/** Weather location saved by the user (localStorage "location"). */
export type LocationInfoType = {
  districtName?: string;
  regionName?: string;
  lat?: string | number;
  long?: string | number;
};
