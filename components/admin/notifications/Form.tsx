"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NotificationFormProps {
  notification?: any
  onClose: () => void
}

export function NotificationForm({ notification, onClose }: NotificationFormProps) {
  const [formData, setFormData] = useState({
    title: notification?.title || "",
    content: notification?.content || "",
    type: notification?.type || "email",
    recipient: notification?.recipient || "",
    recipientType: notification?.recipientType || "individual",
    scheduledAt: notification?.scheduledAt || "",
    template: notification?.template || "none",
    priority: notification?.priority || "normal",
    autoSend: notification?.autoSend || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Notification data:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-admin-muted">
          <TabsTrigger value="content" className="text-admin-foreground">
            Nội dung
          </TabsTrigger>
          <TabsTrigger value="recipients" className="text-admin-foreground">
            Người nhận
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-admin-foreground">
            Cài đặt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card className="bg-admin-background border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-foreground">Nội dung thông báo</CardTitle>
              <CardDescription className="text-admin-card-foreground">Tiêu đề và nội dung thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-admin-foreground">
                  Tiêu đề
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Nhập tiêu đề thông báo"
                  className="bg-admin-input border-admin-border text-admin-foreground"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-admin-foreground">
                  Nội dung
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Nhập nội dung thông báo"
                  rows={6}
                  className="bg-admin-input border-admin-border text-admin-foreground"
                  required
                />
                <p className="text-xs text-admin-muted-foreground mt-1">
                  Có thể sử dụng các biến: {"{name}"}, {"{service}"}, {"{date}"}, {"{time}"}
                </p>
              </div>

              <div>
                <Label htmlFor="template" className="text-admin-foreground">
                  Mẫu thông báo
                </Label>
                <Select value={formData.template} onValueChange={(value) => handleInputChange("template", value)}>
                  <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                    <SelectValue placeholder="Chọn mẫu có sẵn" />
                  </SelectTrigger>
                  <SelectContent className="bg-admin-popover border-admin-border">
                    <SelectItem value="none">Không sử dụng mẫu</SelectItem>
                    <SelectItem value="booking-confirmation">Xác nhận lịch hẹn</SelectItem>
                    <SelectItem value="booking-reminder">Nhắc nhở lịch hẹn</SelectItem>
                    <SelectItem value="promotion">Khuyến mãi</SelectItem>
                    <SelectItem value="birthday">Chúc mừng sinh nhật</SelectItem>
                    <SelectItem value="feedback">Yêu cầu đánh giá</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-6">
          <Card className="bg-admin-background border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-foreground">Người nhận</CardTitle>
              <CardDescription className="text-admin-card-foreground">Chọn đối tượng nhận thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipientType" className="text-admin-foreground">
                  Loại người nhận
                </Label>
                <Select
                  value={formData.recipientType}
                  onValueChange={(value) => handleInputChange("recipientType", value)}
                >
                  <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                    <SelectValue placeholder="Chọn loại người nhận" />
                  </SelectTrigger>
                  <SelectContent className="bg-admin-popover border-admin-border">
                    <SelectItem value="individual">Cá nhân</SelectItem>
                    <SelectItem value="group">Nhóm khách hàng</SelectItem>
                    <SelectItem value="all">Tất cả khách hàng</SelectItem>
                    <SelectItem value="vip">Khách hàng VIP</SelectItem>
                    <SelectItem value="new">Khách hàng mới</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.recipientType === "individual" && (
                <div>
                  <Label htmlFor="recipient" className="text-admin-foreground">
                    Email/Số điện thoại
                  </Label>
                  <Input
                    id="recipient"
                    value={formData.recipient}
                    onChange={(e) => handleInputChange("recipient", e.target.value)}
                    placeholder="email@example.com hoặc 0123456789"
                    className="bg-admin-input border-admin-border text-admin-foreground"
                    required
                  />
                </div>
              )}

              {formData.recipientType === "group" && (
                <div>
                  <Label htmlFor="recipient" className="text-admin-foreground">
                    Tên nhóm
                  </Label>
                  <Select value={formData.recipient} onValueChange={(value) => handleInputChange("recipient", value)}>
                    <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                      <SelectValue placeholder="Chọn nhóm khách hàng" />
                    </SelectTrigger>
                    <SelectContent className="bg-admin-popover border-admin-border">
                      <SelectItem value="massage-customers">Khách hàng massage</SelectItem>
                      <SelectItem value="skincare-customers">Khách hàng chăm sóc da</SelectItem>
                      <SelectItem value="monthly-customers">Khách hàng hàng tháng</SelectItem>
                      <SelectItem value="inactive-customers">Khách hàng không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-admin-background border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-foreground">Loại thông báo</CardTitle>
                <CardDescription className="text-admin-card-foreground">Chọn phương thức gửi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type" className="text-admin-foreground">
                    Phương thức
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent className="bg-admin-popover border-admin-border">
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority" className="text-admin-foreground">
                    Độ ưu tiên
                  </Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                      <SelectValue placeholder="Chọn độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent className="bg-admin-popover border-admin-border">
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="normal">Bình thường</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-admin-background border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-foreground">Lên lịch</CardTitle>
                <CardDescription className="text-admin-card-foreground">Thời gian gửi thông báo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="scheduledAt" className="text-admin-foreground">
                    Thời gian gửi
                  </Label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => handleInputChange("scheduledAt", e.target.value)}
                    className="bg-admin-input border-admin-border text-admin-foreground"
                  />
                  <p className="text-xs text-admin-muted-foreground mt-1">Để trống để gửi ngay lập tức</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoSend"
                    checked={formData.autoSend}
                    onCheckedChange={(checked) => handleInputChange("autoSend", checked)}
                  />
                  <Label htmlFor="autoSend" className="text-admin-foreground">
                    Gửi tự động
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-admin-border">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent"
        >
          Hủy
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent"
        >
          Lưu nháp
        </Button>
        <Button type="submit" className="bg-admin-primary text-admin-primary-foreground hover:bg-admin-primary/90">
          {formData.scheduledAt ? "Lên lịch gửi" : "Gửi ngay"}
        </Button>
      </div>
    </form>
  )
}
