import { z } from "zod";
 
const currentYear = new Date().getFullYear();
 
// ── Enums ────────────────────────────────────────────────────────────────────
export const VEHICLE_TYPES = ["ELECTRIC", "SUV", "TRUCK", "MOTORCYCLE", "BUS", "VAN", "PICKUP", "OTHER"];
export const FUEL_TYPES = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "GAS", "OTHER"];
export const PURPOSES = ["PERSONAL", "COMMERCIAL", "TAXI", "GOVERNMENT"];
export const VEHICLE_STATUSES = ["NEW", "USED", "REBUILT"];
export const OWNER_TYPES = ["INDIVIDUAL", "COMPANY", "NGO", "GOVERNMENT"];
export const PLATE_TYPES = ["PRIVATE", "COMMERCIAL", "GOVERNMENT", "DIPLOMATIC", "PERSONALIZED"];
export const REG_STATUSES = ["ACTIVE", "SUSPENDED", "EXPIRED", "PENDING"];
export const INSURANCE_STATUSES = ["ACTIVE", "SUSPENDED", "EXPIRED"];
 
// ── Step 1: Vehicle Info ──────────────────────────────────────────────────────
export const vehicleInfoSchema = z.object({
  manufacture: z.string().min(1, "Manufacturer is required").refine((v) => v.trim().length > 0, "Cannot be empty spaces"),
  model: z.string().min(1, "Model is required").refine((v) => v.trim().length > 0, "Cannot be empty spaces"),
  year: z
    .number({ invalid_type_error: "Year must be a number" })
    .int("Year must be an integer")
    .min(1886, "Year must be 1886 or later")
    .max(currentYear + 1, `Year cannot exceed ${currentYear + 1}`),
  vehicleType: z.enum(VEHICLE_TYPES, { errorMap: () => ({ message: "Select a valid vehicle type" }) }),
  fuelType: z.enum(FUEL_TYPES, { errorMap: () => ({ message: "Select a valid fuel type" }) }),
  bodyType: z.string().min(1, "Body type is required").refine((v) => v.trim().length > 0, "Cannot be empty spaces"),
  color: z.string().min(1, "Color is required").refine((v) => v.trim().length > 0, "Cannot be empty spaces"),
  engineCapacity: z
    .number({ invalid_type_error: "Engine capacity must be a number" })
    .int("Must be an integer")
    .min(1, "Engine capacity must be greater than 0"),
  seatingCapacity: z
    .number({ invalid_type_error: "Seating capacity must be a number" })
    .int("Must be an integer")
    .min(1, "Seating capacity must be at least 1"),
  odometerReading: z
    .number({ invalid_type_error: "Odometer reading must be a number" })
    .int("Must be an integer")
    .min(0, "Odometer reading cannot be negative"),
  purpose: z.enum(PURPOSES, { errorMap: () => ({ message: "Select a valid purpose" }) }),
  status: z.enum(VEHICLE_STATUSES, { errorMap: () => ({ message: "Select a valid status" }) }),
});
 
// ── Step 2: Owner Info ────────────────────────────────────────────────────────
export const ownerInfoSchema = z
  .object({
    ownerName: z.string().min(1, "Owner name is required"),
    ownerType: z.enum(OWNER_TYPES, { errorMap: () => ({ message: "Select a valid owner type" }) }),
    nationalId: z.string().regex(/^\d{16}$/, "National ID must be exactly 16 digits"),
    mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email: z.string().email("Must be a valid email address"),
    address: z.string().min(1, "Address is required"),
    companyRegNumber: z.string().optional(),
    passportNumber: z
      .string()
      .optional()
      .refine((v) => v === undefined || v === "" || v.length > 0, "Passport number cannot be an empty string"),
  })
  .superRefine((data, ctx) => {
    if (data.ownerType === "COMPANY" && (!data.companyRegNumber || data.companyRegNumber.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company registration number is required for COMPANY owner type",
        path: ["companyRegNumber"],
      });
    }
  });
 
// ── Step 3: Registration & Insurance ─────────────────────────────────────────
const today = new Date();
today.setHours(0, 0, 0, 0);
 
export const regInsuranceSchema = z.object({
  plateNumber: z
    .string()
    .regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i, "Invalid Rwandan plate number (e.g. RAB 123 A, GR 456, CD 789)"),
  plateType: z.enum(PLATE_TYPES, { errorMap: () => ({ message: "Select a valid plate type" }) }),
  registrationDate: z.string().min(1, "Registration date is required"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .refine((v) => new Date(v) > today, "Expiry date cannot be in the past"),
  registrationStatus: z.enum(REG_STATUSES, { errorMap: () => ({ message: "Select a valid registration status" }) }),
  customsRef: z.string().min(1, "Customs reference is required"),
  proofOfOwnership: z.string().min(1, "Proof of ownership is required"),
  roadworthyCert: z.string().min(1, "Roadworthy certificate is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  companyName: z.string().min(1, "Insurance company name is required"),
  insuranceType: z.string().min(1, "Insurance type is required"),
  insuranceExpiryDate: z
    .string()
    .min(1, "Insurance expiry date is required")
    .refine((v) => new Date(v) > today, "Insurance expiry date cannot be in the past"),
  insuranceStatus: z.enum(INSURANCE_STATUSES, { errorMap: () => ({ message: "Select a valid insurance status" }) }),
  state: z.string().min(1, "State is required"),
});
 
// ── Combined full schema ──────────────────────────────────────────────────────
export const fullVehicleSchema = vehicleInfoSchema.merge(ownerInfoSchema).merge(regInsuranceSchema);