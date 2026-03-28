import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const SESSION_KEY = "vrm_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { localStorage.removeItem(SESSION_KEY); }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === "test@gmail.com" && password === "Password!234") {
      const userData = { email, name: "Admin User", role: "Administrator" };
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials. Please try again." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}