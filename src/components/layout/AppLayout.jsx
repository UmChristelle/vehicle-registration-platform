import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      <Sidebar />
      <main className="flex-1 md:ml-62.5 min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#181c26",
            color: "#e8eaf0",
            border: "1px solid #2a3045",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontFamily: "DM Sans, sans-serif",
          },
        }}
      />
    </div>
  );
}