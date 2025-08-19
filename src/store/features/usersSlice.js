import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api";
import { handleError, handleSuccess } from "../../utils/errorHandler";
import { STORAGE_KEYS } from "../../utils/constants";
import jwt_decode from "jwt-decode";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (_, { getState }) => {
    const state = getState().users;
    const typeData =
      localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ||
      sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (typeData) {
      try {
        const decoded = jwt_decode(typeData);
        return { ...state, type: decoded.admin, users: decoded.id };
      } catch (error) {
        // Clear invalid token
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        return state;
      }
    }

    return state;
  }
);

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (formData) => {
    try {
      const response = await apiService.auth.login(formData);
      return response.token;
    } catch (error) {
      throw error;
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (formData) => {
    try {
      const response = await apiService.auth.register(formData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  users: null,
  login: {},
  loading: false,
  regLoading: false,
  error: null,
  type: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.regLoading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.regLoading = false;
        state.users = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.regLoading = false;
        state.error = action.error.message || "Registration failed";
        handleError(action.error, "Registration Error");
      });
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        const responseData = action.payload;

        // Store token in localStorage for better security
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, responseData);

        try {
          const decoded = jwt_decode(responseData);
          state.type = decoded.admin;
          state.users = decoded.id;
          handleSuccess("Login successful!");
        } catch (error) {
          state.error = "Invalid token received";
          handleError(error, "Login Error");
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
        handleError(action.error, "Login Error");
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const { type, users } = action.payload;
        state.type = type;
        state.users = users;
      });
  },
});
export const { actions: usersActions, reducer: usersReducer } = usersSlice;
