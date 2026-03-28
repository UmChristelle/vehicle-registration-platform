import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";
import { Car, Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 12;

export default function HomePage() {
  const { data, isLoading, isError, error } = useVehicles();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);

  const vehicles = Array.isArray(data) ? data : data?.data ?? data?.vehicles ?? [];

  const filtered = vehicles.filter(v => {
    const t = search.toLowerCase();
    return (
      v.manufacture?.toLowerCase().includes(t) ||
      v.model?.toLowerCase().includes(t) ||
      v.plateNumber?.toLowerCase().includes(t) ||
      v.color?.toLowerCase().includes(t)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleView = (id) => {
    if (!isAuthenticated) navigate("/login");
    else navigate(`/vehicle/${id}`);
  };

  return (
    <div className="p-6 md:p-8 max-w-300">
      {/* Hero */}
      <div className="flex items-center gap-4 mb-7 pb-6 border-b border-[#2a3045]">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <Car size={24}/>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Vehicle Registry</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Public registry of all registered vehicles in Rwanda •{" "}
            <span className="text-slate-300 font-semibold">{vehicles.length}</span> records
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"/>
        <input
          type="text"
          className="w-full max-w-md pl-9 pr-4 py-2.5 rounded-lg bg-[#181c26] border border-[#2a3045] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
          placeholder="Search by manufacturer, model, plate or color…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 py-16 text-slate-500">
          <div className="spinner"/>
          <p className="text-sm">Loading vehicle registry…</p>
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400 text-sm">
          Failed to load vehicles: {error?.message}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {paginated.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-slate-500 text-sm bg-[#181c26] border border-[#2a3045] rounded-xl">
              No vehicles found{search ? " matching your search" : ""}.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#2a3045] bg-[#181c26]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1f2433] border-b border-[#2a3045]">
                    {["#","Manufacturer","Model","Year","Color","Type","Plate","Status","Action"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-widest uppercase text-slate-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((v, i) => (
                    <tr key={v._id ?? v.id ?? i} className="border-b border-[#2a3045] hover:bg-[#1f2433] transition-colors">
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">{(page-1)*PAGE_SIZE+i+1}</td>
                      <td className="px-4 py-3 text-slate-300 font-medium">{v.manufacture ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-400">{v.model ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-400">{v.year ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-400">
                        <span className="inline-block w-2.5 h-2.5 rounded-full border border-white/10 mr-1.5 align-middle" style={{ background: v.color?.toLowerCase() }}/>
                        {v.color ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{v.vehicleType ?? "—"}</td>
                      <td className="px-4 py-3">
                        <code className="font-mono text-xs bg-[#252b3b] border border-[#2a3045] px-2 py-0.5 rounded text-blue-400 tracking-wider">
                          {v.plateNumber ?? "—"}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <Badge status={v.status ?? v.registrationStatus}/>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleView(v._id ?? v.id)}
                          className="w-8 h-8 rounded-lg bg-[#252b3b] border border-[#2a3045] text-slate-400 hover:text-blue-400 hover:border-blue-500/40 flex items-center justify-center transition-all cursor-pointer"
                          title={isAuthenticated ? "View details" : "Login to view"}>
                          <Eye size={14}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-5">
              <button disabled={page === 1} onClick={() => setPage(page-1)}
                className="w-8 h-8 rounded-lg bg-[#181c26] border border-[#2a3045] text-slate-400 hover:text-white flex items-center justify-center disabled:opacity-40 cursor-pointer">
                <ChevronLeft size={16}/>
              </button>
              <span className="text-xs font-mono text-slate-400">Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(page+1)}
                className="w-8 h-8 rounded-lg bg-[#181c26] border border-[#2a3045] text-slate-400 hover:text-white flex items-center justify-center disabled:opacity-40 cursor-pointer">
                <ChevronRight size={16}/>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}