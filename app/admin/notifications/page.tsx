"use client"

import { useState } from "react"
import { Plus, Search, Filter, Bell, Mail, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationForm } from "@/components/admin/notifications/Form"
import { NotificationList } from "@/components/admin/notifications/List"
import { NotificationTemplates } from "@/components/admin/notifications/Templates"

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNotification, setEditingNotification] = useState(null)

  const handleAddNotification = () => {
    setEditingNotification(null)
    setIsFormOpen(true)
  }

  const handleEditNotification = (notification: any) => {
    setEditingNotification(notification)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingNotification(null)
  }

  return (
    <div className="space-y-6 ml-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-admin-foreground">Hệ thống thông báo</h1>
          <p className="text-admin-card-foreground">Quản lý và gửi thông báo đến khách hàng</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddNotification}
              className="bg-black text-white hover:bg-black/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo thông báo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-admin-foreground">
                {editingNotification ? "Chỉnh sửa thông báo" : "Tạo thông báo mới"}
              </DialogTitle>
            </DialogHeader>
            <NotificationForm notification={editingNotification} onClose={handleFormClose} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">Đã gửi hôm nay</CardTitle>
            <Send className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">47</div>
            <p className="text-xs text-admin-muted-foreground">+12 so với hôm qua</p>
          </CardContent>
        </Card>

        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">Email</CardTitle>
            <Mail className="h-4 w-4 text-admin-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">32</div>
            <p className="text-xs text-admin-muted-foreground">68% tổng số</p>
          </CardContent>
        </Card>

        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">SMS</CardTitle>
            <MessageSquare className="h-4 w-4 text-admin-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">15</div>
            <p className="text-xs text-admin-muted-foreground">32% tổng số</p>
          </CardContent>
        </Card>

        <Card className="bg-admin-card border-admin-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-admin-card-foreground">Tỷ lệ mở</CardTitle>
            <Bell className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">78%</div>
            <p className="text-xs text-admin-muted-foreground">+5% từ tuần trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="bg-admin-muted">
          <TabsTrigger value="notifications" className="text-admin-foreground">
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-admin-foreground">
            Mẫu thông báo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-admin-card border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-foreground">Bộ lọc</CardTitle>
              <CardDescription className="text-admin-card-foreground">Tìm kiếm và lọc thông báo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm thông báo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-admin-background border-admin-border text-admin-foreground"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-admin-background border-admin-border text-admin-foreground">
                    <SelectValue placeholder="Loại" />
                  </SelectTrigger>
                  <SelectContent className="border-admin-border z-[10]">
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-admin-background border-admin-border text-admin-foreground">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="border-admin-border z-[10]">
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="sent">Đã gửi</SelectItem>
                    <SelectItem value="pending">Chờ gửi</SelectItem>
                    <SelectItem value="failed">Thất bại</SelectItem>
                    <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <NotificationList
            searchTerm={searchTerm}
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            onEditNotification={handleEditNotification}
          />
        </TabsContent>

        <TabsContent value="templates">
          <NotificationTemplates />
        </TabsContent>
      </Tabs>
    </div>
  )
}
