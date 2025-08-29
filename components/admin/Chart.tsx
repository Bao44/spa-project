"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface ChartProps {
  revenueData: { month: string; revenue: number; bookings: number }[];
  appointmentStatus: number[];
}

const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "hsl(var(--admin-primary))",
  },
  bookings: {
    label: "Lịch hẹn",
    color: "hsl(var(--admin-accent))",
  },
  appointmentStatus: {
    label: "Trạng thái lịch hẹn",
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
  },
};

const statusLabels = [
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang thực hiện",
  "Hoàn thành",
  "Đã hủy",
];

export function AdminChart({ revenueData, appointmentStatus }: ChartProps) {
  const statusData = statusLabels.map((label, index) => ({
    name: label,
    value: appointmentStatus[index] || 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Biểu đồ doanh thu
          </CardTitle>
          <CardDescription className="text-admin-card-foreground">
            Doanh thu và số lượng lịch hẹn 6 tháng gần đây
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "hsl(var(--admin-card-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--admin-border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--admin-card-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--admin-border))" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--admin-primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="bookings"
                  fill="hsl(var(--admin-accent))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trạng thái lịch hẹn
          </CardTitle>
          <CardDescription className="text-admin-card-foreground">
            Phân bố trạng thái lịch hẹn trong tháng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartConfig.appointmentStatus.colors[index]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
