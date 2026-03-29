import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateVehicle } from "../hooks/useVehicles";
import Step1VehicleInfo from "../components/forms/Step1VehicleInfo";
import Step2OwnerInfo from "../components/forms/Step2OwnerInfo";
import Step3RegInsurance from "../components/forms/Step3RegInsurance";
import ErrorList from "../components/ui/ErrorList";
import { fullVehicleSchema } from "../utils/validationSchemas";
import { CheckCircle2, ChevronLeft, ChevronRight, Send } from "lucide-react";

const STEP_LABELS = ["Vehicle Info", "Owner Info", "Reg & Insurance"];
const STEP_COMPONENTS = [Step1VehicleInfo, Step2OwnerInfo, Step3RegInsurance];

const STEP_FIELDS = [
  ["manufacture","model","year","vehicleType","fuelType","bodyType","color","engineCapacity","seatingCapacity","odometerReading","purpose","status"],
  ["ownerName","ownerType","nationalId","mobileNumber","email","address","companyRegNumber","passportNumber"],
  ["plateNumber","plateType","registrationDate","expiryDate","registrationStatus","customsRef","proofOfOwnership","roadworthyCert","state","policyNumber","companyName","insuranceType","insuranceExpiryDate","insuranceStatus"],
];

const DEFAULT_VALUES = {
  manufacture:"", model:"", year:undefined, vehicleType:"", fuelType:"", bodyType:"",
  color:"", engineCapacity:undefined, seatingCapacity:undefined, odometerReading:undefined,
  purpose:"", status:"",
  ownerName:"", ownerType:"", nationalId:"", mobileNumber:"", email:"", address:"",
  companyRegNumber:"", passportNumber:"",
  plateNumber:"", plateType:"", registrationDate:"", expiryDate:"", registrationStatus:"",
  customsRef:"", proofOfOwnership:"", roadworthyCert:"", state:"",
  policyNumber:"", companyName:"", insuranceType:"", insuranceExpiryDate:"", insuranceStatus:"",
};

export default function RegisterVehiclePage() {
  const [step, setStep]           = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate                  = useNavigate();
  const createMutation            = useCreateVehicle();

  const methods = useForm({
    resolver: zodResolver(fullVehicleSchema),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const { handleSubmit, trigger, reset } = methods;

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = async (data) => {
    const payload = {
      manufacture:         data.manufacture.trim(),
      model:               data.model.trim(),
      year:                Number(data.year),
      vehicleType:         data.vehicleType,
      bodyType:            data.bodyType.trim(),
      color:               data.color.trim(),
      fuelType:            data.fuelType,
      engineCapacity:      Number(data.engineCapacity),
      odometerReading:     Number(data.odometerReading),
      seatingCapacity:     Number(data.seatingCapacity),
      vehiclePurpose:      data.purpose,
      vehicleStatus:       data.status,
      ownerName:           data.ownerName.trim(),
      ownerType:           data.ownerType,
      nationalId:          data.nationalId.trim(),
      address:             data.address.trim(),
      mobile:              data.mobileNumber.trim(),
      email:               data.email.trim(),
      ...(data.passportNumber?.trim()   && { passportNumber:   data.passportNumber.trim()   }),
      ...(data.companyRegNumber?.trim() && { companyRegNumber: data.companyRegNumber.trim() }),
      plateNumber:         data.plateNumber.trim(),
      plateType:           data.plateType,
      registrationStatus:  data.registrationStatus,
      registrationDate:    new Date(data.registrationDate).toISOString(),
      expiryDate:          new Date(data.expiryDate).toISOString(),
      state:               data.state.trim(),
      customsRef:          data.customsRef.trim(),
      roadworthyCert:      data.roadworthyCert.trim(),
      proofOfOwnership:    data.proofOfOwnership.trim(),
      policyNumber:        data.policyNumber.trim(),
      companyName:         data.companyName.trim(),
      insuranceType:       data.insuranceType.trim(),
      insuranceStatus:     data.insuranceStatus,
      insuranceExpiryDate: new Date(data.insuranceExpiryDate).toISOString(),
    };

    try {
      await createMutation.mutateAsync(payload);
      setSubmitted(true);
    } catch {}
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-8 max-w-200">
        <div className="flex flex-col items-center text-center gap-4 py-16 bg-[#181c26] border border-[#2a3045] rounded-2xl">
          <div className="text-emerald-400"><CheckCircle2 size={52}/></div>
          <h2 className="text-2xl font-bold text-white">Vehicle Registered!</h2>
          <p className="text-slate-400 max-w-sm text-sm">Successfully added to the Rwanda registry.</p>
          <div className="flex gap-3 mt-2">
            <button onClick={() => navigate("/dashboard")}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer">
              Go to Dashboard
            </button>
            <button onClick={() => { setSubmitted(false); setStep(0); reset(DEFAULT_VALUES); }}
              className="px-5 py-2.5 rounded-lg bg-[#1f2433] border border-[#2a3045] text-slate-300 text-sm font-semibold hover:bg-[#252b3b] cursor-pointer">
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div className="p-6 md:p-8 max-w-225">
      <div className="mb-7 pb-6 border-b border-[#2a3045]">
        <h1 className="text-2xl font-bold text-white">Register New Vehicle</h1>
        <p className="text-sm text-slate-500 mt-1">Complete all three steps to register a vehicle.</p>
      </div>

      <div className="flex items-center bg-[#181c26] border border-[#2a3045] rounded-xl px-6 py-4 mb-6">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono border transition-all
                ${i < step   ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                : i === step ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                :               "bg-[#1f2433] border-[#2a3045] text-slate-600"}`}>
                {i < step ? <CheckCircle2 size={14}/> : i + 1}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap
                ${i < step ? "text-emerald-400" : i === step ? "text-white" : "text-slate-600"}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${i < step ? "bg-emerald-500/30" : "bg-[#2a3045]"}`}/>
            )}
          </div>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="bg-[#181c26] border border-[#2a3045] rounded-2xl p-6 md:p-8">
            <StepComponent/>
            {step === 2 && <ErrorList error={createMutation.error}/>}

            <div className="flex items-center mt-8 pt-6 border-t border-[#2a3045]">
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1f2433] border border-[#2a3045] text-slate-300 text-sm font-semibold hover:bg-[#252b3b] cursor-pointer">
                  <ChevronLeft size={16}/> Back
                </button>
              )}
              <div className="ml-auto">
                {step < 2 ? (
                  <button type="button" onClick={goNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer">
                    Next <ChevronRight size={16}/>
                  </button>
                ) : (
                  <button type="submit" disabled={createMutation.isPending}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50 cursor-pointer">
                    {createMutation.isPending
                      ? <><span className="spinner-sm"/> Submitting…</>
                      : <><Send size={15}/> Submit Registration</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}