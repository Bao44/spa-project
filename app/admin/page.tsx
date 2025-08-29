"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/components/contexts/AuthContext";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { AdminChart } from "@/components/admin/Chart";
import { TopServices } from "@/components/admin/Top-Services";
import { RecentBookings } from "@/components/admin/Recent-Booking";
import { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu cho thống kê
interface Stats {
  totalCustomers: number;
  todaysAppointments: number;
  monthlyRevenue: number;
  completionRate: number;
}

export default function DashboardPage() {
  const { admin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalCustomers: 0,
    todaysAppointments: 0,
    monthlyRevenue: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch tổng khách hàng (giả định endpoint /api/customers)
        const customersResponse = await fetch("/api/admin/customer");
        const customersData = await customersResponse.json();
        const totalCustomers = customersData.length || 0;

        // Fetch lịch hẹn hôm nay
        const today = new Date().toISOString().split("T")[0]; // 2025-08-24
        const appointmentsResponse = await fetch(
          `/api/appointments?date=${today}`
        );
        const appointmentsData = await appointmentsResponse.json();
        const todaysAppointments = appointmentsData.length || 0;

        // Fetch doanh thu tháng và tỷ lệ hoàn thành
        const monthStart = new Date(2025, 7, 1).toISOString().split("T")[0]; // Bắt đầu tháng 8
        const monthEnd = new Date(2025, 8, 0).toISOString().split("T")[0]; // Kết thúc tháng 8
        const allAppointmentsResponse = await fetch(
          `/api/appointments?startDate=${monthStart}&endDate=${monthEnd}`
        );
        const allAppointmentsData = await allAppointmentsResponse.json();
        const monthlyRevenue =
          allAppointmentsData.reduce(
            (sum: number, item: any) => sum + parseFloat(item.price),
            0
          ) || 0;
        const completedAppointments =
          allAppointmentsData.filter((item: any) => item.status === "completed")
            .length || 0;
        const completionRate =
          allAppointmentsData.length > 0
            ? (completedAppointments / allAppointmentsData.length) * 100
            : 0;

        setStats({
          totalCustomers,
          todaysAppointments,
          monthlyRevenue,
          completionRate,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (authLoading || loading) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  if (!admin) {
    return <div className="text-center mt-10">Chưa đăng nhập</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <Breadcrumbs />

        <div className="mt-4 ml-4">
          <h1 className="text-3xl font-bold text-admin-foreground">
            Dashboard
          </h1>
          <p className="text-admin-card-foreground">
            Tổng quan hoạt động spa hôm nay
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-4">
          <Card className="bg-admin-card border-admin-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-card-foreground">
                Tổng khách hàng
              </CardTitle>
              <Users className="h-4 w-4 text-admin-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-foreground">
                {stats.totalCustomers}
              </div>
              <p className="text-xs text-admin-muted-foreground">
                +12% từ tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-card border-admin-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-card-foreground">
                Lịch hẹn hôm nay
              </CardTitle>
              <Calendar className="h-4 w-4 text-admin-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-foreground">
                {stats.todaysAppointments}
              </div>
              <p className="text-xs text-admin-muted-foreground">
                +3 so với hôm qua
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-card border-admin-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-card-foreground">
                Doanh thu tháng
              </CardTitle>
              <DollarSign className="h-4 w-4 text-admin-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-foreground">
                {stats.monthlyRevenue.toLocaleString()}₫
              </div>
              <p className="text-xs text-admin-muted-foreground">
                +8% từ tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-card border-admin-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-admin-card-foreground">
                Tỷ lệ hoàn thành
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-admin-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-admin-foreground">
                {stats.completionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-admin-muted-foreground">
                +2.1% từ tuần trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-4">
          <AdminChart />
          <TopServices />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-4 mb-4">
          <RecentBookings />

          <Card className="bg-admin-card border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Thống kê nhanh
              </CardTitle>
              <CardDescription className="text-admin-card-foreground">
                Tình hình hoạt động trong tuần
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Dịch vụ phổ biến nhất
                  </span>
                  <span className="font-medium text-admin-foreground">
                    Massage thư giãn
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Khung giờ bận nhất
                  </span>
                  <span className="font-medium text-admin-foreground">
                    14:00 - 16:00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Đánh giá trung bình
                  </span>
                  <span className="font-medium text-admin-foreground">
                    4.8/5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Khách hàng mới
                  </span>
                  <span className="font-medium text-admin-foreground">
                    +15 tuần này
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Tỷ lệ đặt lại
                  </span>
                  <span className="font-medium text-admin-foreground">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Thời gian chờ TB
                  </span>
                  <span className="font-medium text-admin-foreground">
                    12 phút
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
