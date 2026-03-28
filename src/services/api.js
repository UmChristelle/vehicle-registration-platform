import axios from "axios";

const api = axios.create({
  baseURL: "https://student-management-system-backend.up.railway.app/api/vehicle-service",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getAllVehicles          = ()         => api.get("/vehicle");
export const getVehicleById         = (id)       => api.get(`/vehicle/${id}`);
export const createVehicle          = (data)     => api.post("/vehicle", data);
export const updateVehicle          = (id, data) => api.put(`/vehicle/${id}`, data);
export const deleteVehicle          = (id)       => api.delete(`/vehicle/${id}`);
export const getVehicleInfo         = (id)       => api.get(`/vehicle/${id}/info`);
export const getVehicleOwner        = (id)       => api.get(`/vehicle/${id}/owner`);
export const getVehicleRegistration = (id)       => api.get(`/vehicle/${id}/registration`);
export const getVehicleInsurance    = (id)       => api.get(`/vehicle/${id}/insurance`);

export default api;