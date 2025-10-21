import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './slices/vehicleSlice';
import statisticsReducer from './slices/statisticsSlice';
import websocketMiddleware from './middleware/websocketMiddleware';

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

export default store;