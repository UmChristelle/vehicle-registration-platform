import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, loading }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modal-animate bg-[#181c26] border border-[#2a3045] rounded-xl p-7 w-full max-w-md relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 cursor-pointer">
          <X size={18} />
        </button>
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#1f2433] border border-[#2a3045] text-slate-300 text-sm font-semibold hover:bg-[#252b3b] cursor-pointer disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold cursor-pointer disabled:opacity-50 flex items-center gap-2">
            {loading ? <><span className="spinner-sm"/>Deleting…</> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}