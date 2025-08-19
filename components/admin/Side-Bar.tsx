"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Calendar,
  Bell,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Dịch vụ",
    href: "/admin/services",
    icon: Settings,
  },
  {
    title: "Lịch hẹn",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Thông báo",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Khách hàng",
    href: "/admin/customers",
    icon: Users,
  },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-admin-sidebar border-r border-admin-sidebar-border transition-all duration-300",
        collapsed ? "w-18" : "w-54"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-admin-sidebar-border">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-admin-sidebar-foreground">
            <Link href="/admin">Elysian Admin</Link>
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-admin-sidebar-foreground hover:bg-gray-400 cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive
                    ? "bg-gray-200 text-black hover:bg-gray-400 cursor-pointer"
                    : "hover:bg-gray-300 cursor-pointer",
                  collapsed && "px-2"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
