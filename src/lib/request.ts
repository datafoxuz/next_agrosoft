import { baseUrl } from "@/data";

type Method = "GET" | "POST" | "PUT";

const REQUEST_TIMEOUT = 30000; // 30 seconds
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Network timeout controller
 */
function createAbortController(timeout: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
}

/**
 * Retry wrapper with exponential backoff
 */
async function retryRequest<T>(
  fn: () => Promise<T>,
  attempts: number = RETRY_ATTEMPTS,
  delay: number = RETRY_DELAY
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on client errors (4xx)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (i < attempts - 1) {
        const waitTime = delay * Math.pow(2, i);
        console.warn(
          `Request failed (attempt ${i + 1}/${attempts}), retrying in ${waitTime}ms...`,
          error instanceof Error ? error.message : error
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError || new Error("Request failed after all retry attempts");
}

interface RequestOptions {
  timeout?: number;
  retries?: number;
  returnNull?: boolean;
  locale?: string | null;
  headers?: Record<string, string>;
}

/**
 * Main fetch wrapper with error handling, retry logic, and timeout
 */
async function request<T = any>(
  url: string,
  method: Method = "GET",
  body?: BodyInit | null,
  options: RequestOptions = {}
): Promise<{ response: Response; data: T }> {
  const {
    timeout = REQUEST_TIMEOUT,
    retries = RETRY_ATTEMPTS,
    returnNull = false,
    locale,
    headers: customHeaders = {},
  } = options;

  const resolvedLocale =
    locale ||
    (typeof window !== "undefined" && typeof navigator !== "undefined"
      ? navigator.language
      : "en");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept-Language": resolvedLocale,
    ...customHeaders,
  };

  const fullUrl = `${baseUrl}${url}`;

  return retryRequest(async () => {
    const controller = createAbortController(timeout);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
        body,
        signal: controller.signal,
      });

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;

        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || errorMessage;
        } catch {
          // If response body is not JSON, use status text
        }

        throw new ApiError(response.status, response.statusText, fullUrl, errorMessage);
      }

      // Parse response
      let data: T;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error(`Failed to parse response JSON from ${fullUrl}`);
        throw new Error(`Invalid JSON response from ${fullUrl}`);
      }

      return { response, data };
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error(`Network error: Unable to reach ${fullUrl}`);
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`Request timeout: ${fullUrl} exceeded ${timeout}ms`);
      }

      // Re-throw ApiError and other known errors
      if (error instanceof ApiError || error instanceof Error) {
        throw error;
      }

      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }, retries);
}

export { request };
