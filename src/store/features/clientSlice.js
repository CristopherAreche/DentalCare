import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api";
import { handleError, handleSuccess } from "../../utils/errorHandler";
import { STORAGE_KEYS } from "../../utils/constants";

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  try {
    const response = await apiService.patients.getAll();
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchClient = createAsyncThunk("client/fetch", async (dni) => {
  try {
    const response = await apiService.patients.getById(dni);
    return response;
  } catch (error) {
    throw error;
  }
});

export const createClient = createAsyncThunk(
  "client/createClient",
  async (client) => {
    try {
      const response = await apiService.patients.create(client);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (client) => {
    try {
      const response = await apiService.patients.update(client);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (dni, { dispatch }) => {
    try {
      const response = await apiService.patients.delete(dni);
      dispatch(fetchClients());
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const putHistorial = createAsyncThunk(
  "client/putHistorial",
  async (payload, { dispatch }) => {
    try {
      const { newPatientUpdates, pacienteDni, clientDni } = payload;
      const id = clientDni;
      const response = await apiService.medicalHistory.update(
        pacienteDni,
        newPatientUpdates
      );
      await dispatch(fetchClient(id));
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  clients: [],
  selectedClient: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setselectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.clients = action.payload;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
      localStorage.setItem(
        STORAGE_KEYS.SELECTED_CLIENT,
        JSON.stringify(action.payload)
      );
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      handleSuccess("Patient deleted successfully!");
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      handleError(action.error, "Delete Patient Error");
    });
    builder.addCase(putHistorial.fulfilled, (state, action) => {
      handleSuccess("Medical history updated successfully!");
    });
    builder.addCase(putHistorial.rejected, (state, action) => {
      handleError(action.error, "Update Medical History Error");
    });
  },
});

export const clientSelector = (state) => state?.clients?.selectedClient;
export const clientsSelector = (state) => state?.clients?.clients;

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
