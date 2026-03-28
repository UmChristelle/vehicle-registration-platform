import { AlertCircle } from "lucide-react";

export default function ErrorList({ error }) {
  if (!error) return null;
  const apiErrors = error?.response?.data?.errors;
  const message   = error?.response?.data?.message || error.message;
  return (
    <div className="flex gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm mt-4" role="alert">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <div>
        {Array.isArray(apiErrors) && apiErrors.length > 0 ? (
          <>
            <p className="font-semibold mb-2">Please fix the following errors:</p>
            <ul className="list-disc ml-4 space-y-1">
              {apiErrors.map((e, i) => (
                <li key={i}>{typeof e === "string" ? e : e.message || JSON.stringify(e)}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}