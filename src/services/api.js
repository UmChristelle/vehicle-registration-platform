import axios from "axios";
 
const API_BASE_URL = "https://cm-vehicle-registration.onrender.com";
 
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 
// ── Vehicles ──────────────────────────────────────────────
export const getAllVehicles = () => api.get("/vehicle");
 
export const getVehicleById = (id) => api.get(`/vehicle/${id}`);
 
export const getVehicleInfo = (id) => api.get(`/vehicle/${id}/info`);
export const getVehicleOwner = (id) => api.get(`/vehicle/${id}/owner`);
export const getVehicleRegistration = (id) => api.get(`/vehicle/${id}/registration`);
export const getVehicleInsurance = (id) => api.get(`/vehicle/${id}/insurance`);
 
export const createVehicle = (data) => api.post("/vehicle", data);
export const updateVehicle = (id, data) => api.put(`/vehicle/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicle/${id}`);
 
export default api;