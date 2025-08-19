"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

export interface Notification {
  id: string;
  type: "booking" | "service" | "blog" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
}

type BookingStatus = "confirmed" | "cancelled" | "completed";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "Lịch hẹn mới",
      message:
        "Nguyễn Thị Mai đã đặt lịch massage thư giãn lúc 14:00 ngày 20/12",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      data: { bookingId: "booking-1", customerName: "Nguyễn Thị Mai" },
    },
    {
      id: "2",
      type: "booking",
      title: "Yêu cầu thay đổi lịch",
      message: "Trần Văn Nam muốn đổi lịch từ 10:00 sang 15:00",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      data: { bookingId: "booking-2", customerName: "Trần Văn Nam" },
    },
    {
      id: "3",
      type: "system",
      title: "Hệ thống",
      message: "Backup dữ liệu đã hoàn thành thành công",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      data: null,
    },
  ]);

  useEffect(() => {
    const handleNewBooking = (event: CustomEvent) => {
      const booking = event.detail;
      addNotification({
        type: "booking",
        title: "Lịch hẹn mới",
        message: `${booking.customer.name} đã đặt lịch ${
          booking.serviceName
        } lúc ${booking.time} ngày ${booking.date.toLocaleDateString("vi-VN")}`,
        data: {
          bookingId: booking.id,
          customerName: booking.customer.name,
          booking,
        },
      });
    };

    const handleBookingStatusUpdate = (
      event: CustomEvent<{ bookingId: string; status: BookingStatus }>
    ) => {
      const { bookingId, status } = event.detail;
      const statusText =
        {
          confirmed: "đã được xác nhận",
          cancelled: "đã bị hủy",
          completed: "đã hoàn thành",
        }[status] || "đã được cập nhật";

      addNotification({
        type: "booking",
        title: "Cập nhật lịch hẹn",
        message: `Lịch hẹn #${bookingId} ${statusText}`,
        data: { bookingId, status },
      });
    };

    window.addEventListener("newBooking", handleNewBooking as EventListener);
    window.addEventListener(
      "bookingStatusUpdated",
      handleBookingStatusUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "newBooking",
        handleNewBooking as EventListener
      );
      window.removeEventListener(
        "bookingStatusUpdated",
        handleBookingStatusUpdate as EventListener
      );
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
