"use client";

import { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Phone,
  Mail,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { BookingConfirmationDialog } from "./Confirmation";

interface BookingTableProps {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
  onEditBooking: (booking: any) => void;
}

export function BookingTable({
  searchTerm,
  statusFilter,
  dateFilter,
  onEditBooking,
}: BookingTableProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/appointments");
      if (!response.ok) throw new Error("Lỗi khi lấy danh sách");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast.error("Không thể tải danh sách appointment");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      (booking.fullName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (booking.serviceName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (booking.phone || "").includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    // Parse booking.date thành đối tượng Date, đảm bảo chỉ lấy ngày
    const bookingDate = new Date(booking.date.split("T")[0]);

    bookingDate.setDate(bookingDate.getDate() + 1);

    // Tính ngày hiện tại và ngày mai, đặt giờ về 0 để so sánh chính xác
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

    let matchesDate = true;

    if (dateFilter === "today") {
      matchesDate = bookingDate.toDateString() === today.toDateString();
    } else if (dateFilter === "tomorrow") {
      matchesDate = bookingDate.toDateString() === tomorrow.toDateString();
    } else if (dateFilter === "week") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999); // Kết thúc tuần là 23:59:59.999
      matchesDate = bookingDate >= weekStart && bookingDate <= weekEnd;
    } else if (dateFilter === "month") {
      matchesDate =
        bookingDate.getMonth() === today.getMonth() &&
        bookingDate.getFullYear() === today.getFullYear();
    } else if (dateFilter === "all") {
      matchesDate = true;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleConfirmBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsConfirmDialogOpen(true);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cập nhật trạng thái thất bại");
      }
      const updatedBooking = await response.json();
      setBookings(bookings.map((b) => (b.id === id ? updatedBooking : b)));
      toast.success(`Cập nhật trạng thái thành công`);
      await fetchBookings(); // Refetch để cập nhật UI
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi cập nhật trạng thái");
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa lịch hẹn này?")) {
      try {
        const response = await fetch(`/api/appointments/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Xóa thất bại");
        }
        setBookings(bookings.filter((b) => b.id !== id));
        toast.success("Xóa lịch hẹn thành công");
        await fetchBookings(); // Refetch để cập nhật UI
      } catch (error: any) {
        toast.error(error.message || "Lỗi khi xóa lịch hẹn");
      }
    }
  };

  const handleConfirmationComplete = async (
    bookingId: string,
    status: string,
    message?: string
  ) => {
    try {
      const response = await fetch(`/api/appointments/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Xác nhận thất bại");
      }
      const updatedBooking = await response.json();
      setBookings(
        bookings.map((b) => (b.id === bookingId ? updatedBooking : b))
      );
      toast.success(
        `Lịch hẹn ${status === "confirmed" ? "đã xác nhận" : "đã bị từ chối"}`
      );
      await fetchBookings(); // Refetch để cập nhật UI
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi xác nhận");
    }
    setIsConfirmDialogOpen(false);
    setSelectedBooking(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Đã xác nhận</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Chờ xác nhận</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500 text-white">Đang thực hiện</Badge>;
      case "completed":
        return <Badge className="bg-amber-700 text-white">Hoàn thành</Badge>;
      case "canceled":
        return <Badge className="bg-red-500 text-white">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <>
      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground">
            Danh sách lịch hẹn ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Đang tải dữ liệu...</div>
          ) : filteredBookings.length === 0 ? (
            <div>Không có lịch hẹn nào phù hợp với bộ lọc.</div>
          ) : (
            <div className="rounded-md border border-admin-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-admin-border">
                    <TableHead className="text-admin-card-foreground">
                      Khách hàng
                    </TableHead>
                    <TableHead className="text-admin-card-foreground">
                      Dịch vụ
                    </TableHead>
                    <TableHead className="text-admin-card-foreground">
                      Ngày & Giờ
                    </TableHead>
                    <TableHead className="text-admin-card-foreground">
                      Trạng thái
                    </TableHead>
                    <TableHead className="text-admin-card-foreground">
                      Giá
                    </TableHead>
                    <TableHead className="text-admin-card-foreground">
                      Liên hệ
                    </TableHead>
                    <TableHead className="text-admin-card-foreground text-right">
                      Thao tác
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="border-admin-border">
                      <TableCell>
                        <div>
                          <p className="font-medium text-admin-foreground">
                            {booking.fullName}
                          </p>
                          <p className="text-sm text-admin-muted-foreground">
                            {booking.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-admin-foreground">
                            {booking.serviceName}
                          </p>
                          <p className="text-sm text-admin-muted-foreground">
                            {booking.duration} phút
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-admin-foreground">
                            {formatDate(booking.date)}
                          </p>
                          <p className="text-sm text-admin-muted-foreground">
                            {formatTime(booking.time)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="font-medium text-admin-foreground">
                        {booking.price.toLocaleString()}₫
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-admin-foreground p-1"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-admin-foreground p-1"
                          >
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
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-admin-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="">
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
                                <DropdownMenuItem
                                  onClick={() => handleConfirmBooking(booking)}
                                  className="text-admin-popover-foreground hover:bg-admin-muted"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Xác nhận/Từ chối
                                </DropdownMenuItem>
                              )}
                              {booking.status === "confirmed" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      booking.id,
                                      "in-progress"
                                    )
                                  }
                                  className="text-admin-popover-foreground hover:bg-admin-muted"
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  Bắt đầu
                                </DropdownMenuItem>
                              )}
                              {booking.status === "in-progress" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(booking.id, "completed")
                                  }
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
          )}
        </CardContent>
      </Card>

      {selectedBooking && (
        <BookingConfirmationDialog
          booking={selectedBooking}
          isOpen={isConfirmDialogOpen}
          onClose={() => {
            setIsConfirmDialogOpen(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleConfirmationComplete}
        />
      )}
    </>
  );
}
