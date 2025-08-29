"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const pathMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/services": "Quản lý dịch vụ",
  "/admin/bookings": "Quản lý lịch hẹn",
  "/admin/customers": "Khách hàng",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const title =
      pathMap[path] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === pathSegments.length - 1;

    return {
      title,
      path,
      isLast,
    };
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-admin-muted-foreground mb-6">
      <Link
        href="/admin"
        className="flex items-center hover:text-admin-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {breadcrumb.isLast ? (
            <span className="font-medium text-admin-foreground">
              {breadcrumb.title}
            </span>
          ) : (
            <Link
              href={breadcrumb.path}
              className="hover:text-admin-foreground transition-colors"
            >
              {breadcrumb.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
