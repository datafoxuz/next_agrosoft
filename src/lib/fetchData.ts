import { request } from "./request";

let cachedData: [] | null = null;

export async function fetchCachedData(api: string) {
  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await request(api);
    cachedData = data || [];
    return cachedData;
  } catch (error) {
    // Handle error
    return [];
  }
}

export function clearCachedData() {
  cachedData = null;
}
