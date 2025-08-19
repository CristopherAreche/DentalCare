import Swal from "sweetalert2";

export class AppError extends Error {
  constructor(message, code = "UNKNOWN_ERROR", details = null) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
  }
}

export const ErrorCodes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  PERMISSION_DENIED: "PERMISSION_DENIED",
};

export const handleError = (error, context = "Operation") => {
  console.error(`Error in ${context}:`, error);

  let message = "An unexpected error occurred. Please try again.";
  let icon = "error";

  if (error instanceof AppError) {
    switch (error.code) {
      case ErrorCodes.NETWORK_ERROR:
        message =
          "Network connection error. Please check your internet connection.";
        break;
      case ErrorCodes.AUTHENTICATION_ERROR:
        message = "Authentication failed. Please log in again.";
        icon = "warning";
        break;
      case ErrorCodes.VALIDATION_ERROR:
        message = error.message || "Please check your input and try again.";
        icon = "warning";
        break;
      case ErrorCodes.SERVER_ERROR:
        message = "Server error. Please try again later.";
        break;
      case ErrorCodes.NOT_FOUND:
        message = "The requested resource was not found.";
        icon = "info";
        break;
      case ErrorCodes.PERMISSION_DENIED:
        message = "You don't have permission to perform this action.";
        icon = "warning";
        break;
      default:
        message = error.message || message;
    }
  } else if (error.response) {
    // Axios error response
    const status = error.response.status;
    switch (status) {
      case 400:
        message = "Invalid request. Please check your input.";
        break;
      case 401:
        message = "Authentication required. Please log in again.";
        icon = "warning";
        break;
      case 403:
        message = "Access denied. You don't have permission for this action.";
        icon = "warning";
        break;
      case 404:
        message = "The requested resource was not found.";
        icon = "info";
        break;
      case 500:
        message = "Server error. Please try again later.";
        break;
      default:
        message = `Server error (${status}). Please try again later.`;
    }
  } else if (error.request) {
    // Network error
    message =
      "Network connection error. Please check your internet connection.";
  }

  return Swal.fire({
    title: "Error",
    text: message,
    icon: icon,
    confirmButtonText: "OK",
  });
};

export const handleSuccess = (message, title = "Success") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const handleWarning = (message, title = "Warning") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    confirmButtonText: "OK",
  });
};

export const handleInfo = (message, title = "Information") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "info",
    confirmButtonText: "OK",
  });
};

export const showConfirmation = (message, title = "Confirm") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: true,
  });
};
