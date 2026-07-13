import { toast } from "react-toastify";
import { ApiError } from "./request";

/**
 * Parse validation errors from backend (messages already localized)
 */
export function parseValidationErrors(
  errors: Record<string, string>
): Record<string, string> {
  // Backend already provides localized messages, just return as-is
  return errors;
}

/**
 * Handle and display API errors consistently
 */
export function handleRequestError(error: unknown, defaultMessage = "An error occurred"): {
  message: string;
  validationErrors?: Record<string, string>;
} {
  let errorMessage = defaultMessage;
  let validationErrors: Record<string, string> | undefined;

  if (error instanceof ApiError) {
    errorMessage = error.message;
    console.error(`API Error [${error.status}] at ${error.url}:`, error.message);
    
    if (error.validationErrors) {
      validationErrors = parseValidationErrors(error.validationErrors);
      // Show toast with main error only
      toast.error(errorMessage);
    } else {
      toast.error(errorMessage);
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
    console.error("Request Error:", error.message);
    toast.error(errorMessage);
  } else {
    console.error("Unknown Error:", error);
    toast.error(defaultMessage);
  }

  return { message: errorMessage, validationErrors };
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

