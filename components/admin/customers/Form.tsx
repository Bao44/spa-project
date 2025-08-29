"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  history: any[];
}

interface CustomerHistoryFormProps {
  customer: Customer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerHistoryForm({
  customer,
  open,
  onOpenChange,
}: CustomerHistoryFormProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Đã xác nhận</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Chờ xác nhận</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500 text-white">Đang thực hiện</Badge>;
      case "completed":
        return <Badge className="bg-amber-700 text-white">Hoàn thành</Badge>;
      case "canceled":
        return <Badge className="bg-red-500 text-white">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Lịch sử cuộc hẹn của {customer.fullName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          {customer.history.length > 0 ? (
            <ul className="space-y-2">
              {customer.history.map((booking: any, index: number) => (
                <li key={index} className="border-b py-2">
                  <div>
                    <strong>Dịch vụ:</strong> {booking.service}
                  </div>
                  <div>
                    <strong>Ngày:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Thời gian:</strong> {booking.time}
                  </div>
                  <div>
                    <strong>Trạng thái:</strong>{" "}
                    {getStatusBadge(booking.status)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              Không có lịch sử cuộc hẹn.
            </p>
          )}
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
