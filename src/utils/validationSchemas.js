import { z } from "zod";

const currentYear = new Date().getFullYear();
const today = new Date();
today.setHours(0, 0, 0, 0);

export const VEHICLE_TYPES    = ["ELECTRIC","SUV","TRUCK","MOTORCYCLE","BUS","VAN","PICKUP","OTHER"];
export const FUEL_TYPES       = ["PETROL","DIESEL","ELECTRIC","HYBRID","GAS","OTHER"];
export const PURPOSES         = ["PERSONAL","COMMERCIAL","TAXI","GOVERNMENT"];
export const VEHICLE_STATUSES = ["NEW","USED","REBUILT"];
export const OWNER_TYPES      = ["INDIVIDUAL","COMPANY","NGO","GOVERNMENT"];
export const PLATE_TYPES      = ["PRIVATE","COMMERCIAL","GOVERNMENT","DIPLOMATIC","PERSONALIZED"];
export const REG_STATUSES     = ["ACTIVE","SUSPENDED","EXPIRED","PENDING"];
export const INSURANCE_STATUSES = ["ACTIVE","SUSPENDED","EXPIRED"];

export const vehicleInfoSchema = z.object({
  manufacture:     z.string().min(1,"Manufacturer is required").refine(v=>v.trim().length>0,"Cannot be empty"),
  model:           z.string().min(1,"Model is required").refine(v=>v.trim().length>0,"Cannot be empty"),
  year:            z.number({invalid_type_error:"Year must be a number"}).int().min(1886,"Min year is 1886").max(currentYear+1,`Max year is ${currentYear+1}`),
  vehicleType:     z.enum(VEHICLE_TYPES,  {errorMap:()=>({message:"Select a valid vehicle type"})}),
  fuelType:        z.enum(FUEL_TYPES,     {errorMap:()=>({message:"Select a valid fuel type"})}),
  bodyType:        z.string().min(1,"Body type is required").refine(v=>v.trim().length>0,"Cannot be empty"),
  color:           z.string().min(1,"Color is required").refine(v=>v.trim().length>0,"Cannot be empty"),
  engineCapacity:  z.number({invalid_type_error:"Must be a number"}).int().min(1,"Must be greater than 0"),
  seatingCapacity: z.number({invalid_type_error:"Must be a number"}).int().min(1,"At least 1 seat"),
  odometerReading: z.number({invalid_type_error:"Must be a number"}).int().min(0,"Cannot be negative"),
  purpose:         z.enum(PURPOSES,         {errorMap:()=>({message:"Select a valid purpose"})}),
  status:          z.enum(VEHICLE_STATUSES, {errorMap:()=>({message:"Select a valid status"})}),
});

export const ownerInfoSchema = z.object({
  ownerName:        z.string().min(1,"Owner name is required"),
  ownerType:        z.enum(OWNER_TYPES,{errorMap:()=>({message:"Select a valid owner type"})}),
  nationalId:       z.string().regex(/^\d{16}$/,"National ID must be exactly 16 digits"),
  mobileNumber:     z.string().regex(/^\d{10}$/,"Mobile number must be exactly 10 digits"),
  email:            z.string().email("Must be a valid email address"),
  address:          z.string().min(1,"Address is required"),
  companyRegNumber: z.string().optional(),
  passportNumber:   z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.ownerType === "COMPANY" && (!data.companyRegNumber || data.companyRegNumber.trim() === "")) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required for COMPANY owner type", path: ["companyRegNumber"] });
  }
});

export const regInsuranceSchema = z.object({
  plateNumber:        z.string().regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i,"Invalid Rwandan plate (e.g. RAB 123 A)"),
  plateType:          z.enum(PLATE_TYPES,       {errorMap:()=>({message:"Select a plate type"})}),
  registrationDate:   z.string().min(1,"Registration date is required"),
  expiryDate:         z.string().min(1,"Expiry date is required").refine(v=>new Date(v)>today,"Expiry date cannot be in the past"),
  registrationStatus: z.enum(REG_STATUSES,      {errorMap:()=>({message:"Select a status"})}),
  customsRef:         z.string().min(1,"Customs reference is required"),
  proofOfOwnership:   z.string().min(1,"Proof of ownership is required"),
  roadworthyCert:     z.string().min(1,"Roadworthy certificate is required"),
  state:              z.string().min(1,"State is required"),
  policyNumber:       z.string().min(1,"Policy number is required"),
  companyName:        z.string().min(1,"Insurance company is required"),
  insuranceType:      z.string().min(1,"Insurance type is required"),
  insuranceExpiryDate:z.string().min(1,"Insurance expiry date is required").refine(v=>new Date(v)>today,"Cannot be in the past"),
  insuranceStatus:    z.enum(INSURANCE_STATUSES,{errorMap:()=>({message:"Select an insurance status"})}),
});

export const fullVehicleSchema = vehicleInfoSchema
  .merge(ownerInfoSchema)
  .merge(regInsuranceSchema);