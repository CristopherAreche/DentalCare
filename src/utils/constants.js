// Application constants
export const APP_CONFIG = {
  NAME: "Dental Care",
  VERSION: "1.0.0",
  API_TIMEOUT: 10000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};

// Validation constants
export const VALIDATION = {
  DNI_LENGTH: 8,
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 50,
  MAX_PHONE_LENGTH: 15,
  MAX_EMAIL_LENGTH: 100,
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  API: "yyyy-MM-dd",
  DATETIME: "dd/MM/yyyy HH:mm",
};

// User types
export const USER_TYPES = {
  ADMIN: true,
  USER: false,
};

// Appointment status
export const APPOINTMENT_STATUS = {
  ACTIVE: true,
  CANCELLED: false,
};

// Inventory alerts
export const INVENTORY_ALERTS = {
  LOW_STOCK_THRESHOLD: 10,
  EXPIRY_WARNING_DAYS: 30,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// File types
export const FILE_TYPES = {
  IMAGE: ["image/jpeg", "image/png", "image/gif"],
  DOCUMENT: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    "Network connection error. Please check your internet connection.",
  AUTHENTICATION_ERROR: "Authentication failed. Please log in again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  PERMISSION_DENIED: "You don't have permission to perform this action.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again.",
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful!",
  REGISTER: "Registration successful!",
  PATIENT_CREATED: "Patient created successfully!",
  PATIENT_UPDATED: "Patient updated successfully!",
  PATIENT_DELETED: "Patient deleted successfully!",
  APPOINTMENT_CREATED: "Appointment created successfully!",
  APPOINTMENT_CANCELLED: "Appointment cancelled successfully!",
  INVENTORY_UPDATED: "Inventory updated successfully!",
  PASSWORD_RESET: "Password reset successfully!",
};

// Navigation
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  APPOINTMENTS: "/citas",
  PATIENTS: "/pacientes",
  INVENTORY: "/inventario",
  PATIENT_DETAILS: "/pacientes/:id",
  MEDICAL_HISTORY: "/historial-medico",
  PERSONAL_DATA: "/datos",
  PATIENT_HISTORY: "/historial",
  TEETH: "/diente",
  ODONTOGRAM: "/odontograma",
  PASSWORD_RECOVERY: "/recuperacion-contraseña",
  PASSWORD_RESET: "/restablecer-contrasena",
  CLIENT_FORM: "/client-form",
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  USER_DATA: "userData",
  SELECTED_CLIENT: "selectedClient",
  THEME: "theme",
  LANGUAGE: "language",
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/usuarios",
    PASSWORD_RECOVERY: "/solicitar-restablecimiento",
    PASSWORD_RESET: "/restablecer-contrasena",
  },
  PATIENTS: {
    LIST: "/pacientes",
    GET: (dni) => `/pacientes/${dni}`,
    CREATE: (dni) => `/pacientes/${dni}`,
    UPDATE: (dni) => `/pacientes/${dni}`,
    DELETE: (dni) => `/pacientes/${dni}`,
  },
  MEDICAL_HISTORY: {
    CREATE: (dni) => `/historiales/${dni}`,
    UPDATE: (dni) => `/historiales/${dni}`,
  },
  APPOINTMENTS: {
    LIST: "/turnos",
    CREATE: (dni) => `/turnos/${dni}`,
    DELETE: (id) => `/turnos/${id}`,
  },
  INVENTORY: {
    LIST: "/productos",
    CREATE: "/productos",
    UPDATE: (id) => `/productos/${id}`,
    DELETE: (id) => `/productos/${id}`,
  },
  TEETH: {
    LIST: "/dientes",
    CREATE: "/dientes",
    UPDATE: (id) => `/dientes/${id}`,
    GET_BY_NUMBER: (numero) => `/dientes?numero=${numero}`,
  },
  ODONTOGRAM: {
    LIST: "/odontogramas",
    CREATE: (id) => `/odontogramas/${id}`,
  },
  CALENDAR: {
    AVAILABLE_DAYS: "/dias-disponibles",
  },
};
