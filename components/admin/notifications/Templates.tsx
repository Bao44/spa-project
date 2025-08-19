"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Copy, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const templatesData = [
  {
    id: 1,
    name: "Xác nhận lịch hẹn",
    type: "booking-confirmation",
    category: "email",
    subject: "Xác nhận lịch hẹn tại Elysian Spa",
    content: `Xin chào {name},

Cảm ơn bạn đã đặt lịch hẹn tại Elysian Spa. Chúng tôi xác nhận lịch hẹn của bạn như sau:

- Dịch vụ: {service}
- Ngày: {date}
- Giờ: {time}
- Địa điểm: Elysian Spa

Vui lòng đến đúng giờ để có trải nghiệm tốt nhất.

Trân trọng,
Elysian Spa Team`,
    usage: 45,
    lastUsed: "2024-12-15",
  },
  {
    id: 2,
    name: "Nhắc nhở lịch hẹn",
    type: "booking-reminder",
    category: "sms",
    subject: "",
    content: `Xin chào {name}! Nhắc nhở lịch hẹn {service} vào {time} ngày {date} tại Elysian Spa. Vui lòng đến đúng giờ. Hotline: 0123456789`,
    usage: 32,
    lastUsed: "2024-12-16",
  },
  {
    id: 3,
    name: "Khuyến mãi đặc biệt",
    type: "promotion",
    category: "email",
    subject: "🎉 Ưu đãi đặc biệt dành cho bạn!",
    content: `Xin chào {name},

Elysian Spa dành tặng bạn ưu đãi đặc biệt:

✨ GIẢM 30% cho tất cả dịch vụ massage
✨ TẶNG 1 buổi chăm sóc da miễn phí khi đặt gói VIP
✨ Áp dụng từ nay đến hết tháng

Đặt lịch ngay: 0123456789
Hoặc truy cập website: elysian-spa.com

Số lượng có hạn!

Trân trọng,
Elysian Spa Team`,
    usage: 28,
    lastUsed: "2024-12-14",
  },
  {
    id: 4,
    name: "Chúc mừng sinh nhật",
    type: "birthday",
    category: "email",
    subject: "🎂 Chúc mừng sinh nhật {name}!",
    content: `Chúc mừng sinh nhật {name}!

Nhân dịp sinh nhật của bạn, Elysian Spa xin gửi tặng:
🎁 Voucher giảm 50% cho dịch vụ yêu thích
🎁 1 buổi massage thư giãn miễn phí
🎁 Quà tặng đặc biệt khi đến spa

Voucher có hiệu lực trong 30 ngày.

Chúc bạn tuổi mới nhiều sức khỏe và hạnh phúc!

Trân trọng,
Elysian Spa Team`,
    usage: 12,
    lastUsed: "2024-12-10",
  },
]

export function NotificationTemplates() {
  const [templates, setTemplates] = useState(templatesData)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "email",
    subject: "",
    content: "",
  })

  const handleAddTemplate = () => {
    setEditingTemplate(null)
    setFormData({ name: "", type: "", category: "email", subject: "", content: "" })
    setIsFormOpen(true)
  }

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      type: template.type,
      category: template.category,
      subject: template.subject,
      content: template.content,
    })
    setIsFormOpen(true)
  }

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter((template) => template.id !== id))
  }

  const handleDuplicateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: Math.max(...templates.map((t) => t.id)) + 1,
      name: `${template.name} (Copy)`,
      usage: 0,
      lastUsed: new Date().toISOString().split("T")[0],
    }
    setTemplates([...templates, newTemplate])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTemplate) {
      setTemplates(
        templates.map((template) => (template.id === editingTemplate ? { ...template, ...formData } : template)),
      )
    } else {
      const newTemplate = {
        ...formData,
        id: Math.max(...templates.map((t) => t.id)) + 1,
        usage: 0,
        lastUsed: new Date().toISOString().split("T")[0],
      }
      setTemplates([...templates, newTemplate])
    }
    setIsFormOpen(false)
  }

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      email: "bg-admin-primary text-admin-primary-foreground",
      sms: "bg-admin-accent text-admin-accent-foreground",
      push: "bg-admin-secondary text-admin-secondary-foreground",
    }

    const categoryNames = {
      email: "Email",
      sms: "SMS",
      push: "Push",
    }

    return (
      <Badge className={categoryColors[category as keyof typeof categoryColors] || "bg-gray-500 text-white"}>
        {categoryNames[category as keyof typeof categoryNames] || category}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-admin-foreground">Mẫu thông báo</h2>
          <p className="text-admin-card-foreground">Quản lý các mẫu thông báo có sẵn</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddTemplate}
              className="bg-admin-primary text-admin-primary-foreground hover:bg-admin-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo mẫu mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-admin-card border-admin-border">
            <DialogHeader>
              <DialogTitle className="text-admin-foreground">
                {editingTemplate ? "Chỉnh sửa mẫu" : "Tạo mẫu mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-admin-foreground">
                    Tên mẫu
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-admin-input border-admin-border text-admin-foreground"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-admin-foreground">
                    Loại
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-admin-input border-admin-border text-admin-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-admin-popover border-admin-border">
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.category === "email" && (
                <div>
                  <Label htmlFor="subject" className="text-admin-foreground">
                    Tiêu đề
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-admin-input border-admin-border text-admin-foreground"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="content" className="text-admin-foreground">
                  Nội dung
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="bg-admin-input border-admin-border text-admin-foreground"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="border-admin-border text-admin-foreground hover:bg-admin-muted bg-transparent"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-admin-primary text-admin-primary-foreground hover:bg-admin-primary/90"
                >
                  {editingTemplate ? "Cập nhật" : "Tạo mẫu"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="bg-admin-card border-admin-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-admin-foreground">{template.name}</CardTitle>
                  <CardDescription className="text-admin-card-foreground">
                    Sử dụng {template.usage} lần • Lần cuối: {template.lastUsed}
                  </CardDescription>
                </div>
                {getCategoryBadge(template.category)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {template.subject && (
                  <div>
                    <p className="text-sm font-medium text-admin-foreground">Tiêu đề:</p>
                    <p className="text-sm text-admin-muted-foreground line-clamp-1">{template.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-admin-foreground">Nội dung:</p>
                  <p className="text-sm text-admin-muted-foreground line-clamp-3">{template.content}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTemplate(template)}
                      className="text-admin-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDuplicateTemplate(template)}
                      className="text-admin-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-admin-foreground">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="text-admin-destructive hover:bg-admin-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
