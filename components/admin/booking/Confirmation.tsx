"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface BookingConfirmationDialogProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingId: string, status: string, message?: string) => void;
}

export function BookingConfirmationDialog({
  booking,
  isOpen,
  onClose,
  onConfirm,
}: BookingConfirmationDialogProps) {
  const [message, setMessage] = useState("");

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    };
    return date.toLocaleString("vi-VN", options) + " " + timeString;
  };

  const handleConfirm = async (status: string) => {
    if (status === "confirmed") {
      try {
        const formattedDateTime = formatDateTime(booking.date, booking.time);
        const emailPayload = {
          to: booking.email,
          subject: "Xác nhận lịch hẹn tại Spa",
          text: `Chào ${booking.fullName},

Lịch hẹn của bạn tại Spa đã được xác nhận:

- Dịch vụ: ${booking.serviceName}
- Thời gian: ${formattedDateTime}
- Ghi chú: ${message || "Không có ghi chú"}

Trân trọng,
Đội ngũ Spa`,
          html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Chào <strong>${booking.fullName}</strong>,</p>
      <p>Lịch hẹn của bạn tại <strong>Spa</strong> đã được xác nhận với thông tin như sau:</p>
      <ul style="padding-left: 0; list-style: none;">
        <li><strong>Dịch vụ:</strong> ${booking.serviceName}</li>
        <li><strong>Thời gian:</strong> ${formattedDateTime}</li>
        <li><strong>Ghi chú:</strong> ${message || "Không có ghi chú"}</li>
      </ul>
      <p>Hẹn gặp bạn tại Spa. Nếu cần hỗ trợ, vui lòng liên hệ lại.</p>
      <p>Trân trọng,<br/><strong>Đội ngũ Spa</strong></p>
    </div>
  `,
        };

        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        });

        if (!response.ok) throw new Error("Failed to send email");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
    onConfirm(booking.id, status, message);
    onClose();
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận lịch hẹn</DialogTitle>
        </DialogHeader>
        <div>
          <p>Khách hàng: {booking.fullName}</p>
          <p>Dịch vụ: {booking.serviceName}</p>
          <p>Ngày & Giờ: {formatDateTime(booking.date, booking.time)}</p>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập ghi chú (nếu từ chối)"
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleConfirm("confirmed")}
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Xác nhận
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleConfirm("canceled")}
          >
            <XCircle className="h-4 w-4 mr-2" /> Từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
