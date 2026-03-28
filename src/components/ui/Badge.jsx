const styles = {
  ACTIVE:    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  NEW:       "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  PENDING:   "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  SUSPENDED: "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  EXPIRED:   "bg-red-500/10 text-red-400 border border-red-500/30",
  USED:      "bg-slate-500/10 text-slate-400 border border-slate-500/30",
  REBUILT:   "bg-purple-500/10 text-purple-400 border border-purple-500/30",
};

export default function Badge({ status }) {
  const cls = styles[status] ?? "bg-slate-500/10 text-slate-400 border border-slate-500/30";
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase font-mono ${cls}`}>
      {status ?? "—"}
    </span>
  );
}