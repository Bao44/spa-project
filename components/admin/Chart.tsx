"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const revenueData = [
  { month: "T1", revenue: 35000000, bookings: 180 },
  { month: "T2", revenue: 42000000, bookings: 220 },
  { month: "T3", revenue: 38000000, bookings: 195 },
  { month: "T4", revenue: 45000000, bookings: 240 },
  { month: "T5", revenue: 52000000, bookings: 280 },
  { month: "T6", revenue: 48000000, bookings: 260 },
]

const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "hsl(var(--admin-primary))",
  },
  bookings: {
    label: "Lịch hẹn",
    color: "hsl(var(--admin-accent))",
  },
}

export function AdminChart() {
  return (
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
              <Bar dataKey="revenue" fill="hsl(var(--admin-primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
