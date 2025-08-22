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

  const handleConfirm = (status: string) => {
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
          <p>
            Ngày & Giờ: {booking.date} {booking.time}
          </p>
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
            onClick={() => handleConfirm("cancelled")}
          >
            <XCircle className="h-4 w-4 mr-2" /> Từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
