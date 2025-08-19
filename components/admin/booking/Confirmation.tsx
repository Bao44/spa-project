"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { updateBookingStatus } from "@/lib/booking-service"

interface BookingConfirmationDialogProps {
  booking: any
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookingId: string, status: string, message?: string) => void
}

export function BookingConfirmationDialog({ booking, isOpen, onClose, onConfirm }: BookingConfirmationDialogProps) {
  const [action, setAction] = useState<"confirm" | "reject" | null>(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!action || !booking) return

    setIsSubmitting(true)
    try {
      const status = action === "confirm" ? "confirmed" : "cancelled"
      updateBookingStatus(booking.id, status)
      onConfirm(booking.id, status, message)

      // Reset form
      setAction(null)
      setMessage("")
      onClose()
    } catch (error) {
      console.error("Error updating booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!booking) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Xác nhận lịch hẹn</DialogTitle>
          <DialogDescription>Vui lòng xem xét thông tin lịch hẹn và chọn hành động phù hợp.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Booking Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{booking.customerName}</h4>
                <p className="text-sm text-muted-foreground">{booking.email}</p>
              </div>
              <Badge variant="outline">{booking.phone}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Dịch vụ:</p>
                <p className="font-medium">{booking.service}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Thời gian:</p>
                <p className="font-medium">{booking.duration} phút</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ngày:</p>
                <p className="font-medium">{formatDate(booking.date)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Giờ:</p>
                <p className="font-medium">{booking.time}</p>
              </div>
            </div>

            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tổng cộng:</span>
                <span className="text-lg font-bold text-primary">{booking.price.toLocaleString()}₫</span>
              </div>
            </div>

            {booking.notes && (
              <div className="pt-2 border-t">
                <p className="text-muted-foreground text-sm">Ghi chú:</p>
                <p className="text-sm">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Action Selection */}
          {!action && (
            <div className="space-y-3">
              <Label>Chọn hành động:</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 border-green-200 hover:bg-green-50 hover:border-green-300 bg-transparent"
                  onClick={() => setAction("confirm")}
                >
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-green-700 font-medium">Xác nhận</span>
                  <span className="text-xs text-green-600">Chấp nhận lịch hẹn</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
                  onClick={() => setAction("reject")}
                >
                  <XCircle className="h-6 w-6 text-red-600" />
                  <span className="text-red-700 font-medium">Từ chối</span>
                  <span className="text-xs text-red-600">Không chấp nhận</span>
                </Button>
              </div>
            </div>
          )}

          {/* Message Input */}
          {action && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {action === "confirm" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <Label>{action === "confirm" ? "Tin nhắn xác nhận" : "Lý do từ chối"} (tùy chọn)</Label>
              </div>
              <Textarea
                placeholder={
                  action === "confirm"
                    ? "Cảm ơn bạn đã đặt lịch. Chúng tôi xác nhận lịch hẹn của bạn..."
                    : "Rất tiếc, chúng tôi không thể sắp xếp lịch hẹn này vì..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>Tin nhắn sẽ được gửi qua SMS và Email</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {action && (
            <Button variant="outline" onClick={() => setAction(null)} disabled={isSubmitting}>
              Quay lại
            </Button>
          )}
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </Button>
          {action && (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={action === "confirm" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isSubmitting ? "Đang xử lý..." : action === "confirm" ? "Xác nhận lịch hẹn" : "Từ chối lịch hẹn"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
