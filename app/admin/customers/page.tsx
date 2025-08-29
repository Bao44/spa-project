"use client";

import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerTable } from "@/components/admin/customers/Table";

export default function CustomersPage() {
  return (
    <div className="space-y-6 px-4">
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Thông tin khách hàng
          </h1>
          <p className="text-muted-foreground">
            Quản lý thông tin khách hàng và xem lịch sử đặt chỗ
          </p>
        </div>
      </div>

      <Card className="bg-white">
        <CardContent>
          <CustomerTable />
        </CardContent>
      </Card>
    </div>
  );
}
