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

interface ServiceFormProps {
  service?: any
  onClose: () => void
}

export function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    category: service?.category || "",
    price: service?.price || "",
    originalPrice: service?.originalPrice || "",
    duration: service?.duration || "",
    benefits: service?.benefits?.join(", ") || "",
    status: service?.status === "active" || false,
    image: service?.image || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Service data:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-admin-background border-admin-border">
          <CardHeader>
            <CardTitle className="text-admin-foreground">Thông tin cơ bản</CardTitle>
            <CardDescription className="text-admin-card-foreground">Thông tin chính về dịch vụ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-admin-foreground">
                Tên dịch vụ
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nhập tên dịch vụ"
                className="bg-admin-input border-admin-border text-admin-foreground"
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-admin-foreground">
                Danh mục
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground ">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                  <SelectItem value="massage">Massage</SelectItem>
                  <SelectItem value="skincare">Chăm sóc da</SelectItem>
                  <SelectItem value="body">Chăm sóc cơ thể</SelectItem>
                  <SelectItem value="facial">Chăm sóc mặt</SelectItem>
                  <SelectItem value="package">Gói dịch vụ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-admin-foreground">
                Mô tả
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Mô tả chi tiết về dịch vụ"
                rows={4}
                className="bg-admin-input border-admin-border text-admin-foreground"
                required
              />
            </div>

            <div>
              <Label htmlFor="benefits" className="text-admin-foreground">
                Lợi ích (phân cách bằng dấu phẩy)
              </Label>
              <Textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => handleInputChange("benefits", e.target.value)}
                placeholder="Thư giãn, giảm stress, cải thiện tuần hoàn"
                rows={3}
                className="bg-admin-input border-admin-border text-admin-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing and Details */}
        <Card className="bg-admin-background border-admin-border">
          <CardHeader>
            <CardTitle className="text-admin-foreground">Giá cả & Chi tiết</CardTitle>
            <CardDescription className="text-admin-card-foreground">Thông tin về giá và thời gian</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price" className="text-admin-foreground">
                Giá hiện tại (VNĐ)
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

            <div>
              <Label htmlFor="originalPrice" className="text-admin-foreground">
                Giá gốc (VNĐ) - Tùy chọn
              </Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                placeholder="1000000"
                className="bg-admin-input border-admin-border text-admin-foreground"
              />
            </div>

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
              <Label htmlFor="image" className="text-admin-foreground">
                URL hình ảnh
              </Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-admin-input border-admin-border text-admin-foreground"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => handleInputChange("status", checked)}
              />
              <Label htmlFor="status" className="text-admin-foreground">
                Kích hoạt dịch vụ
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent cursor-pointer"
        >
          Hủy
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-gray-800 cursor-pointer">
          {service ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>
    </form>
  )
}
