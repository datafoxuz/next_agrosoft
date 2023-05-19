import { request } from "./request";

export async function fetchCachedData(api: string) {
  // if (cachedData) {
  //   return cachedData;
  // }

  try {
    const data = await request(api);
    return data;
  } catch (error) {
    // Handle error
    return [];
  }
}
