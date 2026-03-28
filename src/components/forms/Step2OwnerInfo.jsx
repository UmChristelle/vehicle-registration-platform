import { useFormContext, useWatch } from "react-hook-form";
import FormField from "../ui/FormField";
import { OWNER_TYPES } from "../../utils/validationSchemas";

const inputCls = (err) =>
  `w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all
  ${err ? "border-red-500 focus:ring-red-500/30" : "border-[#2a3045] focus:border-blue-500"}`;

const selectCls = (err) =>
  `w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer
  ${err ? "border-red-500 focus:ring-red-500/30" : "border-[#2a3045] focus:border-blue-500"}`;

export default function Step2OwnerInfo() {
  const { register, formState: { errors }, control } = useFormContext();
  const ownerType = useWatch({ control, name: "ownerType" });

  return (
    <div>
      <div className="flex items-start gap-4 mb-6 pb-5 border-b border-[#2a3045]">
        <span className="font-mono text-3xl font-bold text-[#2a3045] leading-none shrink-0">02</span>
        <div>
          <h2 className="text-lg font-bold text-white">Owner Information</h2>
          <p className="text-sm text-slate-500 mt-0.5">Details about the registered vehicle owner.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <FormField label="Owner Name" error={errors.ownerName?.message} required>
          <input className={inputCls(errors.ownerName)} placeholder="Full legal name" {...register("ownerName")} />
        </FormField>

        <FormField label="Owner Type" error={errors.ownerType?.message} required>
          <select className={selectCls(errors.ownerType)} {...register("ownerType")}>
            <option value="">Select type…</option>
            {OWNER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>

        <FormField label="National ID (16 digits)" error={errors.nationalId?.message} required>
          <input className={inputCls(errors.nationalId)} placeholder="1199xxxxxxxxxx" maxLength={16} {...register("nationalId")} />
        </FormField>

        <FormField label="Mobile Number (10 digits)" error={errors.mobileNumber?.message} required>
          <input className={inputCls(errors.mobileNumber)} placeholder="07xxxxxxxx" maxLength={10} {...register("mobileNumber")} />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message} required>
          <input type="email" className={inputCls(errors.email)} placeholder="owner@example.com" {...register("email")} />
        </FormField>

        <FormField label="Physical Address" error={errors.address?.message} required>
          <input className={inputCls(errors.address)} placeholder="KG 123 St, Kigali" {...register("address")} />
        </FormField>

        {ownerType === "COMPANY" && (
          <FormField label="Company Registration Number" error={errors.companyRegNumber?.message} required>
            <input className={inputCls(errors.companyRegNumber)} placeholder="Company reg. number" {...register("companyRegNumber")} />
          </FormField>
        )}

        <FormField label="Passport Number (optional)" error={errors.passportNumber?.message}>
          <input className={inputCls(errors.passportNumber)} placeholder="Leave blank if none" {...register("passportNumber")} />
        </FormField>
      </div>
    </div>
  );
}