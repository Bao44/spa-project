"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingFormProps {
  booking?: any
  onClose: () => void
}

export function BookingForm({ booking, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: booking?.customerName || "",
    email: booking?.email || "",
    phone: booking?.phone || "",
    service: booking?.service || "",
    date: booking?.date || "",
    time: booking?.time || "",
    duration: booking?.duration || "",
    price: booking?.price || "",
    status: booking?.status || "pending",
    notes: booking?.notes || "",
    therapist: booking?.therapist || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Booking data:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Customer Information */}
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

        {/* Booking Details */}
        <Card className="bg-admin-background border-admin-border mr-[-8px]">
          <CardHeader className="ml-[-10px]">
            <CardTitle className="text-admin-foreground">Chi tiết lịch hẹn</CardTitle>
            <CardDescription className="text-admin-card-foreground">Thông tin dịch vụ và thời gian</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ml-[-10px]">
            <div>
              <Label htmlFor="service" >
                Dịch vụ
              </Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  <SelectItem value="Massage thư giãn toàn thân">Massage thư giãn toàn thân</SelectItem>
                  <SelectItem value="Chăm sóc da mặt cao cấp">Chăm sóc da mặt cao cấp</SelectItem>
                  <SelectItem value="Gói spa toàn thân VIP">Gói spa toàn thân VIP</SelectItem>
                  <SelectItem value="Massage đá nóng">Massage đá nóng</SelectItem>
                  <SelectItem value="Tắm trắng toàn thân">Tắm trắng toàn thân</SelectItem>
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
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-admin-foreground">
                  Thời gian (phút)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="90"
                  className="bg-admin-input border-admin-border text-admin-foreground"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-admin-foreground">
                  Giá (VNĐ)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="800000"
                  className="bg-admin-input border-admin-border text-admin-foreground"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
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

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className=" hover:bg-gray-200 cursor-pointer"
        >
          Hủy
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-black/80 cursor-pointer">
          {booking ? "Cập nhật" : "Tạo lịch hẹn"}
        </Button>
      </div>
    </form>
  )
}
