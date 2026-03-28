export default function FormField({ label, error, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`text-xs font-semibold uppercase tracking-wider ${error ? "text-red-400" : "text-slate-400"}`}>
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1" role="alert">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}