"use client"

import { Bell, Check, Clock, Trash2, User, Calendar, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { useNotifications } from "@/components/contexts/NotificationContext"

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "booking":
      return <Calendar className="h-4 w-4 text-blue-500" />
    case "service":
      return <Settings className="h-4 w-4 text-green-500" />
    case "blog":
      return <User className="h-4 w-4 text-purple-500" />
    default:
      return <Bell className="h-4 w-4 text-gray-500" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "booking":
      return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    case "service":
      return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    case "blog":
      return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
    default:
      return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
  }
}

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 min-w-[20px]">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3">
          <DropdownMenuLabel className="p-0">Thông báo</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-auto p-1">
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Không có thông báo nào</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    !notification.read ? getNotificationColor(notification.type) : "bg-background hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, {
                                addSuffix: true,
                                locale: vi,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            Xem tất cả thông báo
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
