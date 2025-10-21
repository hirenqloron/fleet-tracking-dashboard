import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vehicleAPI } from "../../services/api";

export const fetchVehicles = createAsyncThunk("vehicles/fetchAll", async () => {
  const response = await vehicleAPI.getAllVehicles();
  return response.data.data;
});

export const fetchVehiclesByStatus = createAsyncThunk(
  "vehicles/fetchByStatus",
  async (status) => {
    const response = await vehicleAPI.getVehiclesByStatus(status);
    return response.data.data;
  }
);

export const fetchVehicleById = createAsyncThunk(
  "vehicles/fetchById",
  async (id) => {
    const response = await vehicleAPI.getVehicleById(id);
    return response.data.data;
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [],
    selectedVehicle: null,
    selectedStatus: "all",
    loading: false,
    error: null,
    lastUpdated: null,
    isWebSocketConnected: false,
    modalLoading: false,
  },
  reducers: {
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
      state.modalLoading = false;
    },
    updateVehiclesFromWebSocket: (state, action) => {
      state.list = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setWebSocketConnected: (state, action) => {
      state.isWebSocketConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVehiclesByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehiclesByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchVehiclesByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVehicleById.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.selectedVehicle = action.payload;
        state.modalLoading = false;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.modalLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedStatus,
  setSelectedVehicle,
  clearSelectedVehicle,
  updateVehiclesFromWebSocket,
  setWebSocketConnected,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;

export const selectAllVehicles = (state) => state.vehicles.list;
export const selectSelectedVehicle = (state) => state.vehicles.selectedVehicle;
export const selectVehiclesLoading = (state) => state.vehicles.loading;
export const selectModalLoading = (state) => state.vehicles.modalLoading;
export const selectLastUpdated = (state) => state.vehicles.lastUpdated;
export const selectWebSocketConnected = (state) =>
  state.vehicles.isWebSocketConnected;
export const selectSelectedStatus = (state) => state.vehicles.selectedStatus;
