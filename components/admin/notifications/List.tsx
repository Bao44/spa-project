"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, MoreHorizontal, Mail, MessageSquare, Bell, Send, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { notificationsData } from "@/lib/notifications-data"

interface NotificationListProps {
  searchTerm: string
  typeFilter: string
  statusFilter: string
  onEditNotification: (notification: any) => void
}

export function NotificationList({ searchTerm, typeFilter, statusFilter, onEditNotification }: NotificationListProps) {
  const [notifications, setNotifications] = useState(notificationsData)

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleResendNotification = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: "pending", sentAt: null } : notification
      ),
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "push":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const typeColors = {
      email: "bg-admin-primary text-admin-primary-foreground",
      sms: "bg-admin-accent text-admin-accent-foreground",
      push: "bg-admin-secondary text-admin-secondary-foreground",
    }

    const typeNames = {
      email: "Email",
      sms: "SMS",
      push: "Push",
    }

    return (
      <Badge className={typeColors[type as keyof typeof typeColors] || "bg-gray-500 text-white"}>
        <span className="flex items-center gap-1">
          {getTypeIcon(type)}
          {typeNames[type as keyof typeof typeNames] || type}
        </span>
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-admin-accent text-admin-accent-foreground">Đã gửi</Badge>
      case "pending":
        return <Badge className="bg-admin-secondary text-admin-secondary-foreground">Chờ gửi</Badge>
      case "failed":
        return <Badge className="bg-admin-destructive text-admin-destructive-foreground">Thất bại</Badge>
      case "scheduled":
        return <Badge className="bg-admin-primary text-admin-primary-foreground">Đã lên lịch</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-admin-foreground">Danh sách thông báo ({filteredNotifications.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-admin-border">
          <Table>
            <TableHeader>
              <TableRow className="border-admin-border">
                <TableHead className="text-admin-card-foreground">Tiêu đề</TableHead>
                <TableHead className="text-admin-card-foreground">Người nhận</TableHead>
                <TableHead className="text-admin-card-foreground">Loại</TableHead>
                <TableHead className="text-admin-card-foreground">Trạng thái</TableHead>
                <TableHead className="text-admin-card-foreground">Thời gian</TableHead>
                <TableHead className="text-admin-card-foreground text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id} className="border-admin-border">
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium text-admin-foreground line-clamp-1">{notification.title}</p>
                      <p className="text-sm w-xl text-admin-muted-foreground line-clamp-2">{notification.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-admin-foreground">{notification.recipient}</p>
                      <p className="text-sm text-admin-muted-foreground">{notification.recipientType}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>
                    <div>
                      {notification.sentAt && (
                        <p className="text-sm text-admin-foreground">{formatDate(notification.sentAt)}</p>
                      )}
                      {notification.scheduledAt && (
                        <p className="text-sm text-admin-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(notification.scheduledAt)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-admin-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-admin-border z-[10]">
                        <DropdownMenuItem className="text-admin-popover-foreground hover:bg-admin-muted">
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditNotification(notification)}
                          className="text-admin-popover-foreground hover:bg-admin-muted"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        {(notification.status === "failed" || notification.status === "pending") && (
                          <DropdownMenuItem
                            onClick={() => handleResendNotification(notification.id)}
                            className="text-admin-popover-foreground hover:bg-admin-muted"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Gửi lại
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-admin-destructive hover:bg-admin-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
