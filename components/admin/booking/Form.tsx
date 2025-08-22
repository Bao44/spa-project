"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

interface BookingFormProps {
  booking?: any;
  onClose: () => void;
}

export function BookingForm({ booking, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: booking?.fullName || "",
    email: booking?.email || "",
    phone: booking?.phone || "",
    service: booking?.serviceId || "",
    date: booking?.date || "",
    time: booking?.time || "",
    duration: booking?.duration || "",
    price: booking?.price || "",
    status: booking?.status || "pending",
    notes: booking?.notes || "",
    therapist: booking?.therapist || "",
  });
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services từ API
  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (!response.ok) throw new Error("Lỗi khi lấy dịch vụ");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      toast.error("Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        serviceId: formData.service,
        date: formData.date,
        time: formData.time,
        note: formData.notes,
        status: formData.status,
      };
      const method = booking ? "PUT" : "POST";
      const url = booking ? `/api/appointments/${booking.id}` : "/api/appointments";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Lỗi khi lưu lịch hẹn");
      toast.success(booking ? "Cập nhật thành công" : "Tạo lịch hẹn thành công");
      onClose();
    } catch (error) {
      toast.error("Lỗi khi lưu lịch hẹn");
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card className="bg-admin-background border-admin-border ml-[-8px]">
          <CardHeader className="ml-[-8px]">
            <CardTitle className="text-admin-foreground">Thông tin khách hàng</CardTitle>
            <CardDescription className="text-admin-card-foreground">Chi tiết liên hệ khách hàng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ml-[-8px]">
            <div>
              <Label htmlFor="customerName" className="text-admin-foreground">
                Tên khách hàng
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="Nhập tên khách hàng"
                className="bg-admin-input border-admin-border text-admin-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-admin-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@example.com"
                className="bg-admin-input border-admin-border text-admin-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-admin-foreground">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="0123456789"
                className="bg-admin-input border-admin-border text-admin-foreground"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-admin-background border-admin-border mr-[-8px]">
          <CardHeader className="ml-[-10px]">
            <CardTitle className="text-admin-foreground">Chi tiết lịch hẹn</CardTitle>
            <CardDescription className="text-admin-card-foreground">Thông tin dịch vụ và thời gian</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ml-[-10px]">
            <div>
              <Label htmlFor="service">Dịch vụ</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="date" className="text-admin-foreground">
                  Ngày
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="bg-admin-input border-admin-border text-admin-foreground"
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-admin-foreground">
                  Giờ
                </Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                  <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                    <SelectValue placeholder="Chọn giờ" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-admin-background border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground">Thông tin bổ sung</CardTitle>
          <CardDescription className="text-admin-card-foreground">Trạng thái và ghi chú</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-admin-foreground">
                Trạng thái
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  <SelectItem value="pending">Chờ xác nhận</SelectItem>
                  <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                  <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="therapist" className="text-admin-foreground">
                Nhân viên phụ trách
              </Label>
              <Select value={formData.therapist} onValueChange={(value) => handleInputChange("therapist", value)}>
                <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  <SelectItem value="Nguyễn Thị Lan">Nguyễn Thị Lan</SelectItem>
                  <SelectItem value="Trần Văn Nam">Trần Văn Nam</SelectItem>
                  <SelectItem value="Lê Thị Hoa">Lê Thị Hoa</SelectItem>
                  <SelectItem value="Phạm Minh Tuấn">Phạm Minh Tuấn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="notes" className="text-admin-foreground">
              Ghi chú
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Ghi chú thêm về lịch hẹn..."
              rows={3}
              className="bg-admin-input border-admin-border text-admin-foreground"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="hover:bg-gray-200 cursor-pointer"
        >
          Hủy
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-black/80 cursor-pointer">
          {booking ? "Cập nhật" : "Tạo lịch hẹn"}
        </Button>
      </div>
    </form>
  );
}