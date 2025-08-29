"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho booking
interface Booking {
  id: number;
  time: string;
  customer: string;
  service: string;
  status: string;
  duration: string;
  price: string;
}

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetch("/api/appointments");
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();

        // Chuyển đổi dữ liệu từ API sang định dạng phù hợp
        const formattedBookings = data.map((item: any) => ({
          id: item.id,
          time: item.time,
          customer: item.fullName,
          service: item.serviceName,
          status: item.status,
          duration: `${item.duration} phút`,
          price: `${item.price}₫`,
        }));
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-admin-accent text-admin-accent-foreground">
            Đã xác nhận
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-admin-primary text-admin-primary-foreground">
            Đang thực hiện
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-admin-secondary text-admin-secondary-foreground">
            Chờ xác nhận
          </Badge>
        );
      case "completed":
        return <Badge className="bg-green-500 text-white">Hoàn thành</Badge>;
      case "canceled":
        return <Badge className="bg-red-500 text-white">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-admin-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Lịch hẹn gần đây
        </CardTitle>
        <CardDescription className="text-admin-card-foreground">
          Các cuộc hẹn trong ngày hôm nay
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-admin-foreground">Đang tải...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-admin-foreground">
            Không có lịch hẹn nào
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg bg-admin-background border border-admin-border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-admin-primary text-admin-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-admin-foreground">
                      {booking.customer}
                    </p>
                    <p className="text-sm text-admin-card-foreground">
                      {booking.service}
                    </p>
                    <p className="text-xs text-admin-muted-foreground">
                      {booking.duration} • {booking.price}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium text-admin-foreground">
                    {booking.time}
                  </p>
                  {getStatusBadge(booking.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
