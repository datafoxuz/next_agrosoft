import { fetchData } from "@/lib/fetchData";
import { data } from "@/data/interfaces";

export async function searchDatas(api: string): Promise<data> {
  try {
    const searchResult = await fetchData(`${api}`);
    return searchResult;
  } catch (error) {
    console.error("Error searching datas:", error);
    throw error;
  }
}
