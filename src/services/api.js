import axios from "axios";

const BASE_URL = "https://case-study-26cf.onrender.com/api";

export const vehicleAPI = {
  getAllVehicles: () => axios.get(`${BASE_URL}/vehicles`),
  getVehicleById: (id) => axios.get(`${BASE_URL}/vehicles/${id}`),
  getVehiclesByStatus: (status) =>
    axios.get(`${BASE_URL}/vehicles/status/${status}`),
  getStatistics: () => axios.get(`${BASE_URL}/statistics`),
};
