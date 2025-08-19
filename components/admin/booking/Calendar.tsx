"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bookingsData } from "@/lib/bookings-data"

interface BookingCalendarProps {
  onEditBooking: (booking: any) => void
}

export function BookingCalendar({ onEditBooking }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getBookingsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return bookingsData.filter((booking) => booking.date === dateString)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-admin-accent"
      case "pending":
        return "bg-admin-secondary"
      case "in-progress":
        return "bg-admin-primary"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-admin-destructive"
      default:
        return "bg-gray-500"
    }
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })

  const days = []

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-32 border border-admin-border bg-admin-muted/20"></div>)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const bookings = getBookingsForDate(date)
    const isToday = date.toDateString() === new Date().toDateString()

    days.push(
      <div
        key={day}
        className={`h-32 border border-admin-border bg-admin-background p-2 ${
          isToday ? "ring-2 ring-admin-primary" : ""
        }`}
      >
        <div className={`text-sm font-medium mb-2 ${isToday ? "text-admin-primary" : "text-admin-foreground"}`}>
          {day}
        </div>
        <div className="space-y-1 overflow-y-auto max-h-20">
          {bookings.slice(0, 3).map((booking) => (
            <div
              key={booking.id}
              onClick={() => onEditBooking(booking)}
              className={`text-xs p-1 rounded cursor-pointer text-white ${getStatusColor(booking.status)} hover:opacity-80`}
            >
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{booking.time}</span>
              </div>
              <div className="truncate">{booking.customerName}</div>
            </div>
          ))}
          {bookings.length > 3 && (
            <div className="text-xs text-admin-muted-foreground">+{bookings.length - 3} khác</div>
          )}
        </div>
      </div>,
    )
  }

  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-admin-foreground capitalize">{monthName}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent"
            >
              Hôm nay
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-0 mb-4">
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-admin-card-foreground border border-admin-border bg-admin-muted"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">{days}</div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-admin-secondary"></div>
            <span className="text-admin-foreground">Chờ xác nhận</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-admin-accent"></div>
            <span className="text-admin-foreground">Đã xác nhận</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-admin-primary"></div>
            <span className="text-admin-foreground">Đang thực hiện</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-admin-foreground">Hoàn thành</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
