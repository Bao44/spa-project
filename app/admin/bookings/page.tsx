"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Calendar, Table, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingForm } from "@/components/admin/booking/Form";
import { BookingTable } from "@/components/admin/booking/Table";
import { BookingCalendar } from "@/components/admin/booking/Calendar";

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [activeView, setActiveView] = useState("table");
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Fetch bookings and calculate stats
  const fetchBookingsAndStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch("/api/appointments");
      if (!response.ok) throw new Error("Lỗi khi lấy danh sách");
      const data = await response.json();

      // Tính toán thống kê
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const statsData = {
        today: data.filter((b: any) => {
          const bookingDate = new Date(b.date.split("T")[0]);

          bookingDate.setDate(bookingDate.getDate() + 1);
          return bookingDate.toDateString() === today.toDateString();
        }).length,
        pending: data.filter((b: any) => b.status === "pending").length,
        confirmed: data.filter((b: any) => b.status === "confirmed").length,
        completed: data.filter((b: any) => b.status === "completed").length,
      };

      setStats(statsData);
    } catch (error) {
      console.error("Lỗi khi tính thống kê:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchBookingsAndStats();
  }, []);

  const handleAddBooking = () => {
    setEditingBooking(null);
    setIsFormOpen(true);
  };

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingBooking(null);
    fetchBookingsAndStats(); // Cập nhật lại thống kê sau khi thêm/sửa
  };

  return (
    <div className="space-y-6 ml-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-admin-foreground">
            Quản lý lịch hẹn
          </h1>
          <p className="text-admin-card-foreground">
            Xem và quản lý tất cả lịch hẹn của khách hàng
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddBooking}
              className="bg-black text-white hover:bg-black/80 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm lịch hẹn
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-admin-foreground">
                {editingBooking ? "Chỉnh sửa lịch hẹn" : "Thêm lịch hẹn mới"}
              </DialogTitle>
            </DialogHeader>
            <BookingForm booking={editingBooking} onClose={handleFormClose} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">
              Hôm nay
            </CardTitle>
            <Calendar className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <div>Đang tải...</div>
            ) : (
              <>
                <div className="text-2xl font-bold text-admin-foreground">
                  {stats.today}
                </div>
                <p className="text-xs text-admin-muted-foreground">
                  +3 so với hôm qua
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">
              Chờ xác nhận
            </CardTitle>
            <Clock className="h-4 w-4 text-admin-secondary" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <div>Đang tải...</div>
            ) : (
              <>
                <div className="text-2xl font-bold text-admin-foreground">
                  {stats.pending}
                </div>
                <p className="text-xs text-admin-muted-foreground">Cần xử lý</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">
              Đã xác nhận
            </CardTitle>
            <Calendar className="h-4 w-4 text-admin-accent" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <div>Đang tải...</div>
            ) : (
              <>
                <div className="text-2xl font-bold text-admin-foreground">
                  {stats.confirmed}
                </div>
                <p className="text-xs text-admin-muted-foreground">
                  Sẵn sàng phục vụ
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">
              Hoàn thành
            </CardTitle>
            <Calendar className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <div>Đang tải...</div>
            ) : (
              <>
                <div className="text-2xl font-bold text-admin-foreground">
                  {stats.completed}
                </div>
                <p className="text-xs text-admin-muted-foreground">Tuần này</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground">Bộ lọc</CardTitle>
          <CardDescription className="text-admin-card-foreground">
            Tìm kiếm và lọc lịch hẹn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo tên khách hàng, dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-admin-background border-admin-border text-admin-foreground"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-admin-background border-admin-border text-admin-foreground">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="border-admin-border z-[10]">
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-admin-background border-admin-border text-admin-foreground">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent className="border-admin-border z-[10]">
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="tomorrow">Ngày mai</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="all">Tất cả</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle and Content */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-admin-muted">
            <TabsTrigger
              value="table"
              className="text-admin-foreground flex items-center gap-2"
            >
              <Table className="h-4 w-4" />
              Bảng
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="text-admin-foreground flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Lịch
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="table">
          <BookingTable
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onEditBooking={handleEditBooking}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <BookingCalendar onEditBooking={handleEditBooking} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
