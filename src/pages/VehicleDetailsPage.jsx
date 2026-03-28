import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVehicleInfo, useVehicleOwner, useVehicleRegistration, useVehicleInsurance } from "../hooks/useVehicles";
import Badge from "../components/ui/Badge";
import { Car, User, FileText, ShieldCheck, ArrowLeft, Pencil } from "lucide-react";
import { format } from "date-fns";

const TABS = [
  { key: "info",         label: "Vehicle Info",  icon: Car         },
  { key: "owner",        label: "Owner",         icon: User        },
  { key: "registration", label: "Registration",  icon: FileText    },
  { key: "insurance",    label: "Insurance",     icon: ShieldCheck },
];

function Detail({ label, value }) {
  return (
    <div className="p-4 border-b border-r border-[#2a3045] last:border-r-0">
      <p className="text-[10px] font-mono tracking-widest uppercase text-slate-600 mb-1.5">{label}</p>
      <div className="text-sm text-white font-medium">{value ?? "—"}</div>
    </div>
  );
}

function fmt(val) {
  if (!val) return "—";
  try { return format(new Date(val), "PPP"); } catch { return val; }
}

function TabLoader() {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-slate-500">
      <div className="spinner"/><p className="text-sm">Loading…</p>
    </div>
  );
}

function TabError() {
  return (
    <div className="py-12 text-center text-red-400 text-sm">
      Failed to load this section.
    </div>
  );
}

function InfoTab({ id }) {
  const { data, isLoading, isError } = useVehicleInfo(id);
  if (isLoading) return <TabLoader/>;
  if (isError)   return <TabError/>;
  const v = data?.data ?? data ?? {};
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Detail label="Manufacturer"    value={v.manufacture}/>
      <Detail label="Model"           value={v.model}/>
      <Detail label="Year"            value={v.year}/>
      <Detail label="Body Type"       value={v.bodyType}/>
      <Detail label="Color"           value={v.color}/>
      <Detail label="Vehicle Type"    value={v.vehicleType}/>
      <Detail label="Fuel Type"       value={v.fuelType}/>
      <Detail label="Engine Capacity" value={v.engineCapacity ? `${v.engineCapacity} cc` : "—"}/>
      <Detail label="Seating"         value={v.seatingCapacity}/>
      <Detail label="Odometer"        value={v.odometerReading ? `${v.odometerReading?.toLocaleString()} km` : "—"}/>
      <Detail label="Purpose"         value={v.purpose}/>
      <Detail label="Status"          value={<Badge status={v.status}/>}/>
    </div>
  );
}

function OwnerTab({ id }) {
  const { data, isLoading, isError } = useVehicleOwner(id);
  if (isLoading) return <TabLoader/>;
  if (isError)   return <TabError/>;
  const o = data?.data ?? data ?? {};
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Detail label="Owner Name"      value={o.ownerName}/>
      <Detail label="Owner Type"      value={o.ownerType}/>
      <Detail label="National ID"     value={o.nationalId}/>
      <Detail label="Mobile"          value={o.mobileNumber}/>
      <Detail label="Email"           value={o.email}/>
      <Detail label="Address"         value={o.address}/>
      <Detail label="Company Reg No." value={o.companyRegNumber}/>
      <Detail label="Passport No."    value={o.passportNumber}/>
    </div>
  );
}

function RegistrationTab({ id }) {
  const { data, isLoading, isError } = useVehicleRegistration(id);
  if (isLoading) return <TabLoader/>;
  if (isError)   return <TabError/>;
  const r = data?.data ?? data ?? {};
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Detail label="Plate Number"    value={<code className="font-mono text-xs bg-[#252b3b] border border-[#2a3045] px-1.5 py-0.5 rounded text-blue-400">{r.plateNumber}</code>}/>
      <Detail label="Plate Type"      value={r.plateType}/>
      <Detail label="Reg Date"        value={fmt(r.registrationDate)}/>
      <Detail label="Expiry Date"     value={fmt(r.expiryDate)}/>
      <Detail label="Status"          value={<Badge status={r.registrationStatus}/>}/>
      <Detail label="Customs Ref"     value={r.customsRef}/>
      <Detail label="Proof Ownership" value={r.proofOfOwnership}/>
      <Detail label="Roadworthy Cert" value={r.roadworthyCert}/>
      <Detail label="State"           value={r.state}/>
    </div>
  );
}

function InsuranceTab({ id }) {
  const { data, isLoading, isError } = useVehicleInsurance(id);
  if (isLoading) return <TabLoader/>;
  if (isError)   return <TabError/>;
  const ins = data?.data ?? data ?? {};
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Detail label="Policy Number"   value={ins.policyNumber}/>
      <Detail label="Company"         value={ins.companyName}/>
      <Detail label="Insurance Type"  value={ins.insuranceType}/>
      <Detail label="Expiry Date"     value={fmt(ins.insuranceExpiryDate)}/>
      <Detail label="Status"          value={<Badge status={ins.insuranceStatus}/>}/>
    </div>
  );
}

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  const renderTab = () => {
    switch (activeTab) {
      case "info":         return <InfoTab id={id}/>;
      case "owner":        return <OwnerTab id={id}/>;
      case "registration": return <RegistrationTab id={id}/>;
      case "insurance":    return <InsuranceTab id={id}/>;
      default: return null;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-275">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-7 pb-6 border-b border-[#2a3045]">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-lg bg-[#181c26] border border-[#2a3045] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer">
          <ArrowLeft size={17}/>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Vehicle Details</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {id}</p>
        </div>
        <button onClick={() => navigate(`/vehicle/${id}/edit`)}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1f2433] border border-[#2a3045] text-slate-300 text-sm font-semibold hover:bg-[#252b3b] cursor-pointer">
          <Pencil size={14}/> Edit Vehicle
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#2a3045] mb-0 overflow-x-auto">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap
              ${activeTab === key
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-300"}`}>
            <Icon size={15}/>{label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#181c26] border border-t-0 border-[#2a3045] rounded-b-xl overflow-hidden">
        {renderTab()}
      </div>
    </div>
  );
}