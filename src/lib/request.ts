import { baseUrl } from "@/data";

type method = "GET" | "POST";

async function request(
  url: string,
  method: method = "GET",
  body?: BodyInit | null,
  returnNull: boolean = false,
  headers: {} = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      console.log(
        `Could not fetch ${baseUrl}${url}, status ${response.status}`
      );
      return returnNull ? null : [];
    } else if (response.ok) {
      const { data } = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export { request };
