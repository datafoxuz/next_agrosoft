import { request } from "./request";

export async function fetchData(api: string) {
  try {
    const { data } = await request(api);
    return data;
  } catch (error) {
    // Handle error
    return [];
  }
}
