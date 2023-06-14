import { baseUrl } from "@/data";

type Method = "GET" | "POST";

async function request(
  url: string,
  method: Method = "GET",
  body?: BodyInit | null,
  returnNull = false,
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
): Promise<{ response: Response; data: any }> {
  try {
    const response = await fetch(`${baseUrl}${url}`, { method, headers, body });

    if (!response.ok) {
      console.log(
        `Could not fetch ${baseUrl}${url}, status ${response.status}`
      );
      // return returnNull ? null : response;
    }

    const data = await response.json();
    return { response, data };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { request };
