"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { useAuth } from "@/components/contexts/AuthContext";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { AdminChart } from "@/components/admin/Chart";
import { TopServices } from "@/components/admin/Top-Services";
import { RecentBookings } from "@/components/admin/Recent-Booking";

interface Stats {
  totalCustomers: number;
  todaysAppointments: number;
  monthlyRevenue: number;
  completionRate: number;
  revenueByMonth: { month: string; revenue: number; bookings: number }[];
  topServices: {
    name: string;
    bookings: number;
    revenue: string;
    percentage: number;
  }[];
  appointmentStatus: number[];
  busyHour: string;
  newCustomers: number;
  repeatBookingRate: number;
}

export default function DashboardPage() {
  const { admin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalCustomers: 0,
    todaysAppointments: 0,
    monthlyRevenue: 0,
    completionRate: 0,
    revenueByMonth: [],
    topServices: [],
    appointmentStatus: [0, 0, 0, 0, 0],
    busyHour: "N/A",
    newCustomers: 0,
    repeatBookingRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("month");

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date().toISOString().split("T")[0];
        let startDate: string;
        if (dateRange === "week") {
          startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
        } else {
          startDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          )
            .toISOString()
            .split("T")[0];
        }
        const response = await fetch(
          `/api/admin/stats?startDate=${startDate}&endDate=${today}`
        );
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data: Stats = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [dateRange]);

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
        <div className="mt-4 ml-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-admin-foreground">
              Dashboard
            </h1>
            <p className="text-admin-card-foreground">
              Tổng quan hoạt động spa hôm nay
            </p>
          </div>
          <Select onValueChange={setDateRange} defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
            </SelectContent>
          </Select>
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
                {stats.monthlyRevenue.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
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
                {stats.completionRate}%
              </div>
              <p className="text-xs text-admin-muted-foreground">
                +2.1% từ tuần trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-4">
          <AdminChart
            revenueData={stats.revenueByMonth}
            appointmentStatus={stats.appointmentStatus}
          />
          <TopServices topServices={stats.topServices} />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-4 mb-4">
          <RecentBookings />
          <Card className="bg-admin-card border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
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
                    {stats.topServices[0]?.name || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Khung giờ bận nhất
                  </span>
                  <span className="font-medium text-admin-foreground">
                    {stats.busyHour}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Khách hàng mới
                  </span>
                  <span className="font-medium text-admin-foreground">
                    +{stats.newCustomers} tuần này
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-admin-card-foreground">
                    Tỷ lệ đặt lại
                  </span>
                  <span className="font-medium text-admin-foreground">
                    {stats.repeatBookingRate.toFixed(1)}%
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
