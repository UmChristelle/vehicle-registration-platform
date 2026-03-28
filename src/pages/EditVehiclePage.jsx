import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVehicle, useUpdateVehicle } from "../hooks/useVehicles";
import { fullVehicleSchema } from "../utils/validationSchemas";
import Step1VehicleInfo from "../components/forms/Step1VehicleInfo";
import Step2OwnerInfo from "../components/forms/Step2OwnerInfo";
import Step3RegInsurance from "../components/forms/Step3RegInsurance";
import ErrorList from "../components/ui/ErrorList";
import { Save, ArrowLeft } from "lucide-react";

export default function EditVehiclePage() {
  const { id }              = useParams();
  const navigate            = useNavigate();
  const { data, isLoading } = useVehicle(id);
  const updateMutation      = useUpdateVehicle(id);

  const methods = useForm({
    resolver: zodResolver(fullVehicleSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      const v = data?.data ?? data;
      methods.reset({
        manufacture: v.manufacture ?? "", model: v.model ?? "", year: v.year,
        vehicleType: v.vehicleType ?? "", fuelType: v.fuelType ?? "", bodyType: v.bodyType ?? "",
        color: v.color ?? "", engineCapacity: v.engineCapacity, seatingCapacity: v.seatingCapacity,
        odometerReading: v.odometerReading ?? 0, purpose: v.purpose ?? "", status: v.status ?? "",
        ownerName: v.ownerName ?? "", ownerType: v.ownerType ?? "", nationalId: v.nationalId ?? "",
        mobileNumber: v.mobileNumber ?? "", email: v.email ?? "", address: v.address ?? "",
        companyRegNumber: v.companyRegNumber ?? "", passportNumber: v.passportNumber ?? "",
        plateNumber: v.plateNumber ?? "", plateType: v.plateType ?? "",
        registrationDate: v.registrationDate?.slice(0,16) ?? "",
        expiryDate: v.expiryDate?.slice(0,16) ?? "",
        registrationStatus: v.registrationStatus ?? "", customsRef: v.customsRef ?? "",
        proofOfOwnership: v.proofOfOwnership ?? "", roadworthyCert: v.roadworthyCert ?? "",
        state: v.state ?? "", policyNumber: v.policyNumber ?? "", companyName: v.companyName ?? "",
        insuranceType: v.insuranceType ?? "",
        insuranceExpiryDate: v.insuranceExpiryDate?.slice(0,16) ?? "",
        insuranceStatus: v.insuranceStatus ?? "",
      });
    }
  }, [data, methods]);

  const onSubmit = async (formData) => {
    try {
      await updateMutation.mutateAsync(formData);
      navigate(`/vehicle/${id}`);
    } catch { /* handled in hook */ }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 py-16 text-slate-500">
          <div className="spinner"/><p className="text-sm">Loading vehicle data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-225">
      <div className="flex items-center gap-3 mb-7 pb-6 border-b border-[#2a3045]">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-lg bg-[#181c26] border border-[#2a3045] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer">
          <ArrowLeft size={17}/>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Vehicle</h1>
          <p className="text-sm text-slate-500 mt-0.5">Update the vehicle record below.</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div className="bg-[#181c26] border border-[#2a3045] rounded-2xl p-6 md:p-8">
            <Step1VehicleInfo/>
          </div>
          <div className="bg-[#181c26] border border-[#2a3045] rounded-2xl p-6 md:p-8">
            <Step2OwnerInfo/>
          </div>
          <div className="bg-[#181c26] border border-[#2a3045] rounded-2xl p-6 md:p-8">
            <Step3RegInsurance/>
            <ErrorList error={updateMutation.error}/>
            <div className="flex items-center mt-8 pt-6 border-t border-[#2a3045]">
              <button type="button" onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1f2433] border border-[#2a3045] text-slate-300 text-sm font-semibold hover:bg-[#252b3b] cursor-pointer">
                <ArrowLeft size={15}/> Cancel
              </button>
              <button type="submit" disabled={updateMutation.isPending}
                className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50 cursor-pointer">
                {updateMutation.isPending
                  ? <><span className="spinner-sm"/> Saving…</>
                  : <><Save size={15}/> Save Changes</>}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}