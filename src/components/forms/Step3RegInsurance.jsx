import { useFormContext } from "react-hook-form";
import FormField from "../ui/FormField";
import { PLATE_TYPES, REG_STATUSES, INSURANCE_STATUSES } from "../../utils/validationSchemas";

const inputCls = (err) =>
  `w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all
  ${err ? "border-red-500 focus:ring-red-500/30" : "border-[#2a3045] focus:border-blue-500"}`;

const selectCls = (err) =>
  `w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer
  ${err ? "border-red-500 focus:ring-red-500/30" : "border-[#2a3045] focus:border-blue-500"}`;

function SectionTitle({ children }) {
  return (
    <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-slate-500 border-b border-[#2a3045] pb-2 mb-5 mt-6">
      {children}
    </p>
  );
}

export default function Step3RegInsurance() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="flex items-start gap-4 mb-6 pb-5 border-b border-[#2a3045]">
        <span className="font-mono text-3xl font-bold text-[#2a3045] leading-none shrink-0">03</span>
        <div>
          <h2 className="text-lg font-bold text-white">Registration & Insurance</h2>
          <p className="text-sm text-slate-500 mt-0.5">Plate, registration dates and insurance details.</p>
        </div>
      </div>

      <SectionTitle>Registration Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        <FormField label="Plate Number" error={errors.plateNumber?.message} required>
          <input
            className={inputCls(errors.plateNumber)}
            placeholder="e.g. RAB 123 A"
            {...register("plateNumber")}
          />
        </FormField>

        <FormField label="Plate Type" error={errors.plateType?.message} required>
          <select className={selectCls(errors.plateType)} {...register("plateType")}>
            <option value="">Select plate type…</option>
            {PLATE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>

        <FormField label="Registration Date" error={errors.registrationDate?.message} required>
          <input
            type="datetime-local"
            className={inputCls(errors.registrationDate)}
            {...register("registrationDate")}
          />
        </FormField>

        <FormField label="Expiry Date" error={errors.expiryDate?.message} required>
          <input
            type="datetime-local"
            className={inputCls(errors.expiryDate)}
            {...register("expiryDate")}
          />
        </FormField>

        <FormField label="Registration Status" error={errors.registrationStatus?.message} required>
          <select className={selectCls(errors.registrationStatus)} {...register("registrationStatus")}>
            <option value="">Select status…</option>
            {REG_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label="Customs Reference" error={errors.customsRef?.message} required>
          <input
            className={inputCls(errors.customsRef)}
            placeholder="e.g. CUS-2024-001"
            {...register("customsRef")}
          />
        </FormField>

        <FormField label="Proof of Ownership" error={errors.proofOfOwnership?.message} required>
          <input
            className={inputCls(errors.proofOfOwnership)}
            placeholder="e.g. DOC-2024-001"
            {...register("proofOfOwnership")}
          />
        </FormField>

        <FormField label="Roadworthy Certificate" error={errors.roadworthyCert?.message} required>
          <input
            className={inputCls(errors.roadworthyCert)}
            placeholder="e.g. RWC-2024-001"
            {...register("roadworthyCert")}
          />
        </FormField>

        <FormField label="State" error={errors.state?.message} required>
          <input
            className={inputCls(errors.state)}
            placeholder="e.g. Kigali"
            {...register("state")}
          />
        </FormField>

      </div>

      <SectionTitle>Insurance Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        <FormField label="Policy Number" error={errors.policyNumber?.message} required>
          <input
            className={inputCls(errors.policyNumber)}
            placeholder="e.g. POL-2024-001"
            {...register("policyNumber")}
          />
        </FormField>

        <FormField label="Insurance Company (Insurer)" error={errors.companyName?.message} required>
          <input
            className={inputCls(errors.companyName)}
            placeholder="e.g. SORAS, RADIANT, SONARWA"
            {...register("companyName")}
          />
        </FormField>

        <FormField label="Insurance Type" error={errors.insuranceType?.message} required>
          <input
            className={inputCls(errors.insuranceType)}
            placeholder="e.g. Comprehensive"
            {...register("insuranceType")}
          />
        </FormField>

        <FormField label="Insurance Expiry Date (must be future)" error={errors.insuranceExpiryDate?.message} required>
          <input
            type="datetime-local"
            className={inputCls(errors.insuranceExpiryDate)}
            {...register("insuranceExpiryDate")}
          />
        </FormField>

        <FormField label="Insurance Status" error={errors.insuranceStatus?.message} required>
          <select className={selectCls(errors.insuranceStatus)} {...register("insuranceStatus")}>
            <option value="">Select status…</option>
            {INSURANCE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

      </div>
    </div>
  );
}