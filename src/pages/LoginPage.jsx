import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate(from, { replace: true });
    else setError(result.error);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse 60% 50% at 20% 40%, rgba(59,130,246,0.06) 0%, transparent 60%), #0d0f14" }}>
      <div className="w-full max-w-105 bg-[#181c26] border border-[#2a3045] rounded-2xl p-8 shadow-2xl">

        <div className="w-13 h-13 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
          <ShieldCheck size={28}/>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Sign In</h1>
        <p className="text-sm text-slate-500 font-mono tracking-wide mb-6">VEHICLE REGISTRATION & MANAGEMENT</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm mb-5" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <Mail size={12}/> Email Address
            </label>
            <input type="email"
              className="w-full px-3 py-2.5 rounded-lg bg-[#1f2433] border border-[#2a3045] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="test@gmail.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              autoComplete="email" required
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <Lock size={12}/> Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className="w-full px-3 py-2.5 pr-10 rounded-lg bg-[#1f2433] border border-[#2a3045] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Password!234"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password" required
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer">
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <button type="submit"
            disabled={loading || !form.email || !form.password}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 cursor-pointer">
            {loading ? <><span className="spinner-sm"/> Signing in…</> : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          Demo: <code className="bg-[#1f2433] border border-[#2a3045] rounded px-1.5 py-0.5 text-blue-400 font-mono text-[11px]">test@gmail.com</code>{" "}
          / <code className="bg-[#1f2433] border border-[#2a3045] rounded px-1.5 py-0.5 text-blue-400 font-mono text-[11px]">Password!234</code>
        </p>
      </div>
    </div>
  );
}