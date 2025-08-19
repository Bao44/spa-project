"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

const recentBookings = [
  {
    id: 1,
    time: "09:00",
    customer: "Nguyễn Thị Lan",
    service: "Massage thư giãn",
    status: "confirmed",
    duration: "90 phút",
    price: "800,000₫",
  },
  {
    id: 2,
    time: "10:30",
    customer: "Trần Văn Nam",
    service: "Chăm sóc da mặt",
    status: "in-progress",
    duration: "60 phút",
    price: "650,000₫",
  },
  {
    id: 3,
    time: "14:00",
    customer: "Lê Thị Hoa",
    service: "Gói spa toàn thân",
    status: "pending",
    duration: "120 phút",
    price: "1,200,000₫",
  },
  {
    id: 4,
    time: "15:30",
    customer: "Phạm Minh Tuấn",
    service: "Massage đá nóng",
    status: "confirmed",
    duration: "75 phút",
    price: "900,000₫",
  },
]

export function RecentBookings() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-admin-accent text-admin-accent-foreground">Đã xác nhận</Badge>
      case "in-progress":
        return <Badge className="bg-admin-primary text-admin-primary-foreground">Đang thực hiện</Badge>
      case "pending":
        return <Badge className="bg-admin-secondary text-admin-secondary-foreground">Chờ xác nhận</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-admin-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Lịch hẹn gần đây
        </CardTitle>
        <CardDescription className="text-admin-card-foreground">Các cuộc hẹn trong ngày hôm nay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-lg bg-admin-background border border-admin-border"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-admin-primary text-admin-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-admin-foreground">{booking.customer}</p>
                  <p className="text-sm text-admin-card-foreground">{booking.service}</p>
                  <p className="text-xs text-admin-muted-foreground">
                    {booking.duration} • {booking.price}
                  </p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium text-admin-foreground">{booking.time}</p>
                {getStatusBadge(booking.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
