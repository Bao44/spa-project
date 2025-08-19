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

export default function DashboardPage() {
  const { admin, loading } = useAuth();

  return (
    <div className="min-h-screen">
      {!admin ? (
        <div className="text-center mt-10">Chưa đăng nhập</div>
      ) : (
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
                  1,234
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
                  23
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
                  45,231,000₫
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
                  94.5%
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
                    <span className="font-medium text-admin-foreground">
                      68%
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
      )}
    </div>
  );
}
