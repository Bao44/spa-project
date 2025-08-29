import "../globals.css";
import type React from "react";

import { AuthProvider } from "@/components/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/Side-Bar";
import { AdminHeader } from "@/components/admin/Header";
import { NotificationProvider } from "@/components/contexts/NotificationContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />

            {children}
          </div>
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}
