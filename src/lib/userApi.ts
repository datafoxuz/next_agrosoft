import { baseUrl } from "@/data";

function authHeaders(): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  return {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parse(res: Response) {
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.success === false) {
    throw new Error(json?.error?.message || `Error ${res.status}`);
  }
  return json;
}

/** Partial profile update (PUT /users/update). Only sent fields change. */
export async function updateMe(
  body: Record<string, string | number | null>,
  locale = "uz"
) {
  const res = await fetch(`${baseUrl}/users/update`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
      "Accept-Language": locale,
    },
    body: JSON.stringify(body),
  });
  return parse(res);
}

/** Fresh /users/about-me response (same shape the navbar stores in context). */
export async function fetchMe(locale = "uz") {
  const res = await fetch(`${baseUrl}/users/about-me`, {
    headers: { ...authHeaders(), "Accept-Language": locale },
  });
  return parse(res);
}

/** Uploads an image, returns its file id. */
export async function uploadFile(file: File): Promise<number> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${baseUrl}/file/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: fd,
  });
  const json = await parse(res);
  const id = json?.data?.file?.id;
  if (!id) throw new Error("Upload failed");
  return id;
}
