"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Eye, MoreHorizontal, Phone, Mail, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getAllBookings, updateBookingStatus } from "@/lib/booking-service"
import { useNotifications } from "@/components/contexts/NotificationContext"
import { BookingConfirmationDialog } from "./Confirmation"

interface BookingTableProps {
  searchTerm: string
  statusFilter: string
  dateFilter: string
  onEditBooking: (booking: any) => void
}

export function BookingTable({ searchTerm, statusFilter, dateFilter, onEditBooking }: BookingTableProps) {
  const [bookings, setBookings] = useState<any[]>([])
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const { addNotification } = useNotifications()

  useEffect(() => {
    const loadBookings = () => {
      const storedBookings = getAllBookings()
      const formattedStoredBookings = storedBookings.map((booking) => ({
        id: booking.id,
        customerName: booking.customer.name,
        email: booking.customer.email,
        phone: booking.customer.phone,
        service: booking.serviceName,
        date: booking.date,
        time: booking.time,
        status: booking.status,
        duration: 60,
        price: 800000,
        notes: booking.customer.notes,
      }))

      const mockBookings = [
        {
          id: "mock-1",
          customerName: "Nguyễn Thị Mai",
          email: "mai.nguyen@email.com",
          phone: "0901234567",
          service: "Swedish Relaxation Massage",
          date: "2024-12-20",
          time: "14:00",
          status: "confirmed",
          duration: 60,
          price: 800000,
          notes: "Muốn massage nhẹ nhàng",
        },
        {
          id: "mock-2",
          customerName: "Trần Văn Nam",
          email: "nam.tran@email.com",
          phone: "0912345678",
          service: "Deep Tissue Massage",
          date: "2024-12-21",
          time: "10:00",
          status: "pending",
          duration: 75,
          price: 1200000,
          notes: "",
        },
      ]

      setBookings([...formattedStoredBookings, ...mockBookings])
    }

    loadBookings()

    const handleNewBooking = () => {
      loadBookings()
    }

    window.addEventListener("newBooking", handleNewBooking)
    return () => window.removeEventListener("newBooking", handleNewBooking)
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    const bookingDate = new Date(booking.date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = bookingDate.toDateString() === today.toDateString()
    } else if (dateFilter === "tomorrow") {
      matchesDate = bookingDate.toDateString() === tomorrow.toDateString()
    } else if (dateFilter === "week") {
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      matchesDate = bookingDate >= weekStart && bookingDate <= weekEnd
    } else if (dateFilter === "month") {
      matchesDate = bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() === today.getFullYear()
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id))
  }

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))
    updateBookingStatus(id, newStatus as any)
  }

  const handleConfirmBooking = (booking: any) => {
    setSelectedBooking(booking)
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmationComplete = (bookingId: string, status: string, message?: string) => {
    handleUpdateStatus(bookingId, status)

    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
      const statusText = status === "confirmed" ? "đã được xác nhận" : "đã bị từ chối"
      addNotification({
        type: "booking",
        title: "Cập nhật lịch hẹn",
        message: `Lịch hẹn của ${booking.customerName} ${statusText}`,
        data: { bookingId, status, customerName: booking.customerName },
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-admin-accent text-admin-accent-foreground">Đã xác nhận</Badge>
      case "pending":
        return <Badge className="bg-admin-secondary text-admin-secondary-foreground">Chờ xác nhận</Badge>
      case "in-progress":
        return <Badge className="bg-admin-primary text-admin-primary-foreground">Đang thực hiện</Badge>
      case "completed":
        return <Badge className="bg-green-500 text-white">Hoàn thành</Badge>
      case "cancelled":
        return <Badge className="bg-admin-destructive text-admin-destructive-foreground">Đã hủy</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  return (
    <>
      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground">Danh sách lịch hẹn ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-admin-border">
            <Table>
              <TableHeader>
                <TableRow className="border-admin-border">
                  <TableHead className="text-admin-card-foreground">Khách hàng</TableHead>
                  <TableHead className="text-admin-card-foreground">Dịch vụ</TableHead>
                  <TableHead className="text-admin-card-foreground">Ngày & Giờ</TableHead>
                  <TableHead className="text-admin-card-foreground">Trạng thái</TableHead>
                  <TableHead className="text-admin-card-foreground">Giá</TableHead>
                  <TableHead className="text-admin-card-foreground">Liên hệ</TableHead>
                  <TableHead className="text-admin-card-foreground text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="border-admin-border">
                    <TableCell>
                      <div>
                        <p className="font-medium text-admin-foreground">{booking.customerName}</p>
                        <p className="text-sm text-admin-muted-foreground">{booking.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-admin-foreground">{booking.service}</p>
                        <p className="text-sm text-admin-muted-foreground">{booking.duration} phút</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-admin-foreground">{formatDate(booking.date)}</p>
                        <p className="text-sm text-admin-muted-foreground">{formatTime(booking.time)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="font-medium text-admin-foreground">
                      {booking.price.toLocaleString()}₫
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-admin-foreground p-1">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-admin-foreground p-1">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {booking.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleConfirmBooking(booking)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Xác nhận
                            </Button>
                          </>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-admin-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-admin-popover border-admin-border">
                            <DropdownMenuItem className="text-admin-popover-foreground hover:bg-admin-muted">
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditBooking(booking)}
                              className="text-admin-popover-foreground hover:bg-admin-muted"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            {booking.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleConfirmBooking(booking)}
                                  className="text-admin-popover-foreground hover:bg-admin-muted"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Xác nhận/Từ chối
                                </DropdownMenuItem>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(booking.id, "in-progress")}
                                className="text-admin-popover-foreground hover:bg-admin-muted"
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Bắt đầu
                              </DropdownMenuItem>
                            )}
                            {booking.status === "in-progress" && (
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(booking.id, "completed")}
                                className="text-admin-popover-foreground hover:bg-admin-muted"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Hoàn thành
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-admin-destructive hover:bg-admin-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <BookingConfirmationDialog
        booking={selectedBooking}
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false)
          setSelectedBooking(null)
        }}
        onConfirm={handleConfirmationComplete}
      />
    </>
  )
}
