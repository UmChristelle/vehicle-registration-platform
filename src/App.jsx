import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterVehiclePage from "./pages/RegisterVehiclePage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import EditVehiclePage from "./pages/EditVehiclePage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/"     element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard"   element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/vehicle/new" element={<ProtectedRoute><RegisterVehiclePage /></ProtectedRoute>} />
              <Route path="/vehicle/:id" element={<ProtectedRoute><VehicleDetailsPage /></ProtectedRoute>} />
              <Route path="/vehicle/:id/edit" element={<ProtectedRoute><EditVehiclePage /></ProtectedRoute>} />
              <Route path="*" element={
                <div className="p-8 text-center text-slate-500">
                  <h2 className="text-xl font-bold text-white mb-2">404 — Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
