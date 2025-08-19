"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { set } from "date-fns";

type Admin = {
  id: number;
  username: string;
  email: string;
} | null;

type AuthContextType = {
  admin: Admin;
  setAdmin: (admin: Admin) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  admin: null,
  setAdmin: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("/api/admin/profile", {
          withCredentials: true,
        });
        if (response.data.message === "Chưa đăng nhập") {
          setAdmin(null);
        } else {
          setAdmin(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
