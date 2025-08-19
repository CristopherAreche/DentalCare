import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "./features/clientSlice";
import { usersReducer } from "./features/usersSlice";
import calendarReducer from "./features/calendarSlice";
import { inventoryReducer } from "./features/inventorySlice";
import { appointmentsReducer } from "./features/appointmentsSlice";
import jwt_decode from "jwt-decode";
import { STORAGE_KEYS } from "../utils/constants";

// Get initial state from localStorage
const getInitialState = () => {
  let initialClientsState = clientReducer.initialState;
  let initialUsersState = usersReducer.initialState;

  try {
    // Get selected client from localStorage
    const selectedClient = localStorage.getItem(STORAGE_KEYS.SELECTED_CLIENT);
    if (selectedClient) {
      initialClientsState = JSON.parse(selectedClient);
    }

    // Get user token from localStorage
    const userToken =
      localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ||
      sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (userToken) {
      try {
        const decoded = jwt_decode(userToken);
        initialUsersState = decoded.id;
      } catch (error) {
        // Clear invalid token
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        console.error("Invalid token found, cleared from storage:", error);
      }
    }
  } catch (error) {
    console.error("Error initializing state from storage:", error);
  }

  return { initialClientsState, initialUsersState };
};

const { initialClientsState, initialUsersState } = getInitialState();

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    users: usersReducer,
    calendar: calendarReducer,
    inventory: inventoryReducer,
    appointments: appointmentsReducer,
  },
  preloadedState: {
    clients: {
      selectedClient: initialClientsState,
    },
    users: {
      users: initialUsersState,
    },
  },
});
