import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVehicles, getVehicleById, getVehicleInfo, getVehicleOwner,
  getVehicleRegistration, getVehicleInsurance,
  createVehicle, updateVehicle, deleteVehicle,
} from "../services/api";
import toast from "react-hot-toast";

export const vehicleKeys = {
  all:          ["vehicles"],
  detail:       (id) => ["vehicle", id],
  info:         (id) => ["vehicle", id, "info"],
  owner:        (id) => ["vehicle", id, "owner"],
  registration: (id) => ["vehicle", id, "registration"],
  insurance:    (id) => ["vehicle", id, "insurance"],
};

export function useVehicles() {
  return useQuery({
    queryKey: vehicleKeys.all,
    queryFn: () => getAllVehicles().then(r => r.data),
    staleTime: 1000 * 60 * 2,
  });
}

export function useVehicle(id) {
  return useQuery({
    queryKey: vehicleKeys.detail(id),
    queryFn: () => getVehicleById(id).then(r => r.data),
    enabled: !!id,
  });
}

export function useVehicleInfo(id) {
  return useQuery({
    queryKey: vehicleKeys.info(id),
    queryFn: () => getVehicleInfo(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useVehicleOwner(id) {
  return useQuery({
    queryKey: vehicleKeys.owner(id),
    queryFn: () => getVehicleOwner(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useVehicleRegistration(id) {
  return useQuery({
    queryKey: vehicleKeys.registration(id),
    queryFn: () => getVehicleRegistration(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useVehicleInsurance(id) {
  return useQuery({
    queryKey: vehicleKeys.insurance(id),
    queryFn: () => getVehicleInsurance(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => { qc.invalidateQueries({ queryKey: vehicleKeys.all }); toast.success("Vehicle registered!"); },
    onError: (err) => { toast.error(err?.response?.data?.message || "Failed to register vehicle"); },
  });
}

export function useUpdateVehicle(id) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateVehicle(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleKeys.detail(id) });
      qc.invalidateQueries({ queryKey: vehicleKeys.all });
      toast.success("Vehicle updated!");
    },
    onError: (err) => { toast.error(err?.response?.data?.message || "Failed to update vehicle"); },
  });
}

export function useDeleteVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => { qc.invalidateQueries({ queryKey: vehicleKeys.all }); toast.success("Vehicle deleted!"); },
    onError: (err) => { toast.error(err?.response?.data?.message || "Failed to delete vehicle"); },
  });
}