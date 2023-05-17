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
) {
  try {
    const response = await fetch(`${baseUrl}${url}`, { method, headers, body });

    if (!response.ok) {
      console.log(
        `Could not fetch ${baseUrl}${url}, status ${response.status}`
      );
      return returnNull ? null : [];
    }

    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { request };
