import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicles, useDeleteVehicle } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";
import ConfirmModal from "../components/ui/ConfirmModal";
import { Car, PlusCircle, Trash2, Pencil, Eye, BarChart3, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading }   = useVehicles();
  const { user }              = useAuth();
  const navigate              = useNavigate();
  const deleteMutation        = useDeleteVehicle();
  const [deleteId, setDeleteId] = useState(null);

  const vehicles = Array.isArray(data) ? data : data?.data ?? data?.vehicles ?? [];
  const total    = vehicles.length;
  const active   = vehicles.filter(v => v.status === "ACTIVE"    || v.registrationStatus === "ACTIVE").length;
  const expired  = vehicles.filter(v => v.status === "EXPIRED"   || v.registrationStatus === "EXPIRED").length;
  const pending  = vehicles.filter(v => v.status === "PENDING"   || v.registrationStatus === "PENDING").length;

  const stats = [
    { label: "Total Vehicles", value: total,   icon: Car,          bg: "bg-blue-500/10",    border: "border-blue-500/20",   text: "text-blue-400"    },
    { label: "Active",         value: active,  icon: CheckCircle2, bg: "bg-emerald-500/10", border: "border-emerald-500/20",text: "text-emerald-400" },
    { label: "Expired",        value: expired, icon: AlertCircle,  bg: "bg-red-500/10",     border: "border-red-500/20",    text: "text-red-400"     },
    { label: "Pending",        value: pending, icon: Clock,        bg: "bg-yellow-500/10",  border: "border-yellow-500/20", text: "text-yellow-400"  },
  ];

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="p-6 md:p-8 max-w-300">
      {/* Hero */}
      <div className="flex flex-wrap items-center gap-4 mb-7 pb-6 border-b border-[#2a3045]">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <BarChart3 size={24}/>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Welcome back, <span className="text-slate-300 font-semibold">{user?.name}</span></p>
        </div>
        <button onClick={() => navigate("/vehicle/new")}
          className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer">
          <PlusCircle size={16}/> Register Vehicle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, bg, border, text }) => (
          <div key={label} className={`flex items-center gap-3 p-4 rounded-xl bg-[#181c26] border border-[#2a3045]`}>
            <div className={`w-11 h-11 rounded-lg ${bg} border ${border} flex items-center justify-center ${text} shrink-0`}>
              <Icon size={20}/>
            </div>
            <div>
              <p className="text-xl font-bold font-mono text-white leading-none">{isLoading ? "—" : value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">All Vehicles</h2>
        <span className="text-xs text-slate-500 font-mono">{vehicles.length} records</span>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center gap-3 py-16 bg-[#181c26] border border-[#2a3045] rounded-xl text-slate-500">
          <div className="spinner"/><p className="text-sm">Loading vehicles…</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 bg-[#181c26] border border-[#2a3045] rounded-xl text-slate-500">
          <p className="text-sm">No vehicles registered yet.</p>
          <button onClick={() => navigate("/vehicle/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer">
            <PlusCircle size={14}/> Register First Vehicle
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#2a3045] bg-[#181c26]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1f2433] border-b border-[#2a3045]">
                {["#","Manufacturer","Model","Year","Plate","Type","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-widest uppercase text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v, i) => {
                const id = v._id ?? v.id;
                return (
                  <tr key={id ?? i} className="border-b border-[#2a3045] hover:bg-[#1f2433] transition-colors last:border-0">
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{i+1}</td>
                    <td className="px-4 py-3 text-slate-200 font-medium">{v.manufacture ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-400">{v.model ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-400">{v.year ?? "—"}</td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs bg-[#252b3b] border border-[#2a3045] px-2 py-0.5 rounded text-blue-400 tracking-wider">
                        {v.plateNumber ?? "—"}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{v.vehicleType ?? "—"}</td>
                    <td className="px-4 py-3"><Badge status={v.status ?? v.registrationStatus}/></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => navigate(`/vehicle/${id}`)}
                          className="w-7 h-7 rounded-md bg-[#252b3b] border border-[#2a3045] text-slate-400 hover:text-blue-400 hover:border-blue-500/40 flex items-center justify-center transition-all cursor-pointer" title="View">
                          <Eye size={13}/>
                        </button>
                        <button onClick={() => navigate(`/vehicle/${id}/edit`)}
                          className="w-7 h-7 rounded-md bg-[#252b3b] border border-[#2a3045] text-slate-400 hover:text-yellow-400 hover:border-yellow-500/40 flex items-center justify-center transition-all cursor-pointer" title="Edit">
                          <Pencil size={13}/>
                        </button>
                        <button onClick={() => setDeleteId(id)}
                          className="w-7 h-7 rounded-md bg-[#252b3b] border border-[#2a3045] text-slate-400 hover:text-red-400 hover:border-red-500/40 flex items-center justify-center transition-all cursor-pointer" title="Delete">
                          <Trash2 size={13}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        title="Delete Vehicle"
        message="Are you sure you want to permanently delete this vehicle record? This action cannot be undone."
      />
    </div>
  );
}