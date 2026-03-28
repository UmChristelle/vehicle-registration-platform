import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Car, LayoutDashboard, PlusCircle, LogIn, LogOut, ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); setOpen(false); };

  const navItems = [
    { to: "/",          label: "Vehicle Registry",   icon: Car },
    ...(isAuthenticated ? [
      { to: "/dashboard",   label: "Dashboard",       icon: LayoutDashboard },
      { to: "/vehicle/new", label: "Register Vehicle", icon: PlusCircle },
    ] : []),
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-200 p-2 bg-[#181c26] border border-[#2a3045] rounded-lg text-slate-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20}/> : <Menu size={20}/>}
      </button>

      {/* Overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-99" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-62.5 bg-[#12151c] border-r border-[#2a3045] flex flex-col z-100 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        {/* Brand */}
        <div className="flex items-center gap-3 p-5 border-b border-[#2a3045]">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck size={18}/>
          </div>
          <div>
            <p className="font-bold text-sm text-white leading-tight">VRM Platform</p>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest">RWANDA REGISTRY</p>
          </div>
        </div>

        {/* User chip */}
        {isAuthenticated && (
          <div className="mx-3 mt-3 flex items-center gap-2.5 p-2.5 rounded-lg bg-[#181c26] border border-[#2a3045]">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold font-mono shrink-0">
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.role}</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4">
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-slate-600 px-2 mb-2">Navigation</p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all duration-150
                ${isActive
                  ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                  : "text-slate-400 hover:bg-[#1f2433] hover:text-slate-200"}`
              }>
              <Icon size={17}/> {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[#2a3045]">
          {isAuthenticated ? (
            <button onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-colors cursor-pointer">
              <LogOut size={16}/> Sign Out
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-semibold hover:bg-blue-500/20 transition-colors">
              <LogIn size={16}/> Sign In
            </NavLink>
          )}
        </div>
      </aside>
    </>
  );
}