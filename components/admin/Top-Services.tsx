"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award } from "lucide-react"

const topServices = [
  { name: "Massage thư giãn", bookings: 145, percentage: 85, revenue: "18,500,000₫" },
  { name: "Chăm sóc da mặt", bookings: 98, percentage: 65, revenue: "12,800,000₫" },
  { name: "Gói spa toàn thân", bookings: 76, percentage: 55, revenue: "15,200,000₫" },
  { name: "Massage đá nóng", bookings: 54, percentage: 40, revenue: "8,900,000₫" },
  { name: "Tắm trắng", bookings: 32, percentage: 25, revenue: "5,600,000₫" },
]

export function TopServices() {
  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-admin-foreground flex items-center gap-2">
          <Award className="h-5 w-5" />
          Dịch vụ phổ biến
        </CardTitle>
        <CardDescription className="text-admin-card-foreground">
          Top 5 dịch vụ được đặt nhiều nhất tháng này
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topServices.map((service, index) => (
            <div key={service.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-admin-primary text-admin-primary-foreground text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium text-admin-foreground">{service.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-admin-foreground">{service.bookings} lượt</p>
                  <p className="text-xs text-admin-muted-foreground">{service.revenue}</p>
                </div>
              </div>
              <Progress
                value={service.percentage}
                className="h-2"
                style={{
                  backgroundColor: "hsl(var(--admin-muted))",
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
