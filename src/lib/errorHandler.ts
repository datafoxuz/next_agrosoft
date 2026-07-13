import { toast } from "react-toastify";
import { ApiError } from "./request";

/**
 * Handle and display API errors consistently
 */
export function handleRequestError(error: unknown, defaultMessage = "An error occurred"): string {
  let errorMessage = defaultMessage;

  if (error instanceof ApiError) {
    errorMessage = error.message;
    console.error(`API Error [${error.status}] at ${error.url}:`, error.message);
  } else if (error instanceof Error) {
    errorMessage = error.message;
    console.error("Request Error:", error.message);
  } else {
    console.error("Unknown Error:", error);
  }

  // Show toast notification
  toast.error(errorMessage);

  return errorMessage;
}

/**
 * Handle API response errors
 */
export function handleResponseError(
  response: any,
  defaultMessage = "Request failed"
): string {
  let errorMessage = defaultMessage;

  if (response?.error?.message) {
    errorMessage = response.error.message;
  } else if (response?.message) {
    errorMessage = response.message;
  }

  toast.error(errorMessage);
  return errorMessage;
}
