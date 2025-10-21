import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vehicleAPI } from "../../services/api";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetch",
  async () => {
    const response = await vehicleAPI.getStatistics();
    return response.data.data;
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    data: {
      total: 0,
      average_speed: 0,
      delivered: 0,
      en_route: 0,
      idle: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    updateStatisticsFromWebSocket: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateStatisticsFromWebSocket } = statisticsSlice.actions;
export default statisticsSlice.reducer;

export const selectStatistics = (state) => state.statistics.data;
export const selectStatisticsLoading = (state) => state.statistics.loading;
