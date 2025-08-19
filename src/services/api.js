import axios from "axios";
import { handleError, AppError, ErrorCodes } from "../utils/errorHandler";

// Create axios instance with default configuration
const api = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear stored tokens
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints configuration
const endpoints = {
  auth: {
    login: "/login",
    register: "/usuarios",
    passwordRecovery: "/solicitar-restablecimiento",
    passwordReset: "/restablecer-contrasena",
  },
  patients: {
    list: "/pacientes",
    get: (dni) => `/pacientes/${dni}`,
    create: (dni) => `/pacientes/${dni}`,
    update: (dni) => `/pacientes/${dni}`,
    delete: (dni) => `/pacientes/${dni}`,
  },
  medicalHistory: {
    create: (dni) => `/historiales/${dni}`,
    update: (dni) => `/historiales/${dni}`,
  },
  appointments: {
    list: "/turnos",
    create: (dni) => `/turnos/${dni}`,
    delete: (id) => `/turnos/${id}`,
  },
  inventory: {
    list: "/productos",
    create: "/productos",
    update: (id) => `/productos/${id}`,
    delete: (id) => `/productos/${id}`,
  },
  teeth: {
    list: "/dientes",
    create: "/dientes",
    update: (id) => `/dientes/${id}`,
    getByNumber: (numero) => `/dientes?numero=${numero}`,
  },
  odontogram: {
    list: "/odontogramas",
    create: (id) => `/odontogramas/${id}`,
  },
  calendar: {
    availableDays: "/dias-disponibles",
  },
};

// API service methods
export const apiService = {
  // Authentication
  auth: {
    login: async (credentials) => {
      try {
        const response = await api.post(endpoints.auth.login, credentials);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Login failed",
          ErrorCodes.AUTHENTICATION_ERROR,
          error
        );
      }
    },

    register: async (userData) => {
      try {
        const response = await api.post(endpoints.auth.register, userData);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Registration failed",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    passwordRecovery: async (dni, email) => {
      try {
        const response = await api.post(
          endpoints.auth.passwordRecovery + `/${dni}`,
          { email }
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Password recovery failed",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    passwordReset: async (token, password) => {
      try {
        const response = await api.post(endpoints.auth.passwordReset, {
          token,
          password,
        });
        return response.data;
      } catch (error) {
        throw new AppError(
          "Password reset failed",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },
  },

  // Patients
  patients: {
    getAll: async () => {
      try {
        const response = await api.get(endpoints.patients.list);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch patients",
          ErrorCodes.NETWORK_ERROR,
          error
        );
      }
    },

    getById: async (dni) => {
      try {
        const response = await api.get(endpoints.patients.get(dni));
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch patient",
          ErrorCodes.NOT_FOUND,
          error
        );
      }
    },

    create: async (patientData) => {
      try {
        const response = await api.post(
          endpoints.patients.create(patientData.dni),
          patientData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to create patient",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    update: async (patientData) => {
      try {
        const response = await api.put(
          endpoints.patients.update(patientData.dni),
          patientData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to update patient",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    delete: async (dni) => {
      try {
        const response = await api.delete(endpoints.patients.delete(dni));
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to delete patient",
          ErrorCodes.PERMISSION_DENIED,
          error
        );
      }
    },
  },

  // Medical History
  medicalHistory: {
    create: async (dni, historyData) => {
      try {
        const response = await api.post(
          endpoints.medicalHistory.create(dni),
          historyData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to create medical history",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    update: async (dni, historyData) => {
      try {
        const response = await api.put(
          endpoints.medicalHistory.update(dni),
          historyData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to update medical history",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },
  },

  // Appointments
  appointments: {
    getAll: async () => {
      try {
        const response = await api.get(endpoints.appointments.list);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch appointments",
          ErrorCodes.NETWORK_ERROR,
          error
        );
      }
    },

    create: async (appointmentData) => {
      try {
        const response = await api.post(
          endpoints.appointments.create(appointmentData.dni),
          appointmentData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to create appointment",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    delete: async (id) => {
      try {
        const response = await api.delete(endpoints.appointments.delete(id));
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to delete appointment",
          ErrorCodes.PERMISSION_DENIED,
          error
        );
      }
    },
  },

  // Inventory
  inventory: {
    getAll: async () => {
      try {
        const response = await api.get(endpoints.inventory.list);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch inventory",
          ErrorCodes.NETWORK_ERROR,
          error
        );
      }
    },

    create: async (productData) => {
      try {
        const response = await api.post(
          endpoints.inventory.create,
          productData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to create product",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    update: async (id, productData) => {
      try {
        const response = await api.put(
          endpoints.inventory.update(id),
          productData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to update product",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    delete: async (id) => {
      try {
        const response = await api.delete(endpoints.inventory.delete(id));
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to delete product",
          ErrorCodes.PERMISSION_DENIED,
          error
        );
      }
    },
  },

  // Teeth
  teeth: {
    getByNumber: async (numero) => {
      try {
        const response = await api.get(endpoints.teeth.getByNumber(numero));
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch tooth",
          ErrorCodes.NOT_FOUND,
          error
        );
      }
    },

    create: async (toothData) => {
      try {
        const response = await api.post(endpoints.teeth.create, toothData);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to create tooth",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },

    update: async (id, toothData) => {
      try {
        const response = await api.put(endpoints.teeth.update(id), toothData);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to update tooth",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },
  },

  // Odontogram
  odontogram: {
    getAll: async () => {
      try {
        const response = await api.get(endpoints.odontogram.list);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch odontogram",
          ErrorCodes.NETWORK_ERROR,
          error
        );
      }
    },

    create: async (id, odontogramData) => {
      try {
        const response = await api.post(
          endpoints.odontogram.create(id),
          odontogramData
        );
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to create odontogram",
          ErrorCodes.VALIDATION_ERROR,
          error
        );
      }
    },
  },

  // Calendar
  calendar: {
    getAvailableDays: async () => {
      try {
        const response = await api.get(endpoints.calendar.availableDays);
        return response.data;
      } catch (error) {
        throw new AppError(
          "Failed to fetch available days",
          ErrorCodes.NETWORK_ERROR,
          error
        );
      }
    },
  },
};

export default api;
