import { useFormContext } from "react-hook-form";
import FormField from "../ui/FormField";
import { VEHICLE_TYPES, FUEL_TYPES, PURPOSES, VEHICLE_STATUSES } from "../../utils/validationSchemas";

const inputCls = (err) =>
  `w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all
  ${err ? "border-red-500 focus:ring-red-500/30" : "border-[#2a3045] focus:border-blue-500"}`;

const selectCls = (err) =>
  `w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer
  ${err ? "border-red-500 focus:ring-red-500/30" : "border-[#2a3045] focus:border-blue-500"}`;

export default function Step1VehicleInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="flex items-start gap-4 mb-6 pb-5 border-b border-[#2a3045]">
        <span className="font-mono text-3xl font-bold text-[#2a3045] leading-none shrink-0">01</span>
        <div>
          <h2 className="text-lg font-bold text-white">Vehicle Information</h2>
          <p className="text-sm text-slate-500 mt-0.5">Core details about the vehicle being registered.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <FormField label="Manufacturer" error={errors.manufacture?.message} required>
          <input className={inputCls(errors.manufacture)} placeholder="e.g. Toyota" {...register("manufacture")} />
        </FormField>

        <FormField label="Model" error={errors.model?.message} required>
          <input className={inputCls(errors.model)} placeholder="e.g. Corolla" {...register("model")} />
        </FormField>

        <FormField label="Year" error={errors.year?.message} required>
          <input type="number" className={inputCls(errors.year)} placeholder="e.g. 2022" {...register("year", { valueAsNumber: true })} />
        </FormField>

        <FormField label="Body Type" error={errors.bodyType?.message} required>
          <input className={inputCls(errors.bodyType)} placeholder="e.g. Sedan" {...register("bodyType")} />
        </FormField>

        <FormField label="Color" error={errors.color?.message} required>
          <input className={inputCls(errors.color)} placeholder="e.g. Pearl White" {...register("color")} />
        </FormField>

        <FormField label="Vehicle Type" error={errors.vehicleType?.message} required>
          <select className={selectCls(errors.vehicleType)} {...register("vehicleType")}>
            <option value="">Select type…</option>
            {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>

        <FormField label="Fuel Type" error={errors.fuelType?.message} required>
          <select className={selectCls(errors.fuelType)} {...register("fuelType")}>
            <option value="">Select fuel…</option>
            {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </FormField>

        <FormField label="Engine Capacity (cc)" error={errors.engineCapacity?.message} required>
          <input type="number" className={inputCls(errors.engineCapacity)} placeholder="e.g. 1800" {...register("engineCapacity", { valueAsNumber: true })} />
        </FormField>

        <FormField label="Seating Capacity" error={errors.seatingCapacity?.message} required>
          <input type="number" className={inputCls(errors.seatingCapacity)} placeholder="e.g. 5" {...register("seatingCapacity", { valueAsNumber: true })} />
        </FormField>

        <FormField label="Odometer Reading (km)" error={errors.odometerReading?.message} required>
          <input type="number" className={inputCls(errors.odometerReading)} placeholder="e.g. 45000" {...register("odometerReading", { valueAsNumber: true })} />
        </FormField>

        <FormField label="Purpose" error={errors.purpose?.message} required>
          <select className={selectCls(errors.purpose)} {...register("purpose")}>
            <option value="">Select purpose…</option>
            {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </FormField>

        <FormField label="Vehicle Status" error={errors.status?.message} required>
          <select className={selectCls(errors.status)} {...register("status")}>
            <option value="">Select status…</option>
            {VEHICLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>
      </div>
    </div>
  );
}