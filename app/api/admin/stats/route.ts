import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

interface Stats {
  totalCustomers: number;
  todaysAppointments: number;
  monthlyRevenue: number;
  completionRate: number;
  revenueByMonth: { month: string; revenue: number; bookings: number }[];
  topServices: { name: string; bookings: number; revenue: string; percentage: number }[];
  appointmentStatus: number[];
  busyHour: string;
  newCustomers: number;
  repeatBookingRate: number;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate") || "2025-01-01";
    const endDate = searchParams.get("endDate") || new Date().toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    // Tổng khách hàng
    const [customerRows] = await connection.execute("SELECT COUNT(*) as count FROM customers");
    const totalCustomers = (customerRows as any[])[0].count;

    // Lịch hẹn hôm nay
    const [todayAppointments] = await connection.execute(
      `SELECT COUNT(*) as count FROM appointments WHERE date = ?`,
      [today]
    );
    const todaysAppointments = (todayAppointments as any[])[0].count;

    // Doanh thu tháng và tỷ lệ hoàn thành
    const [monthlyData] = await connection.execute(
      `SELECT SUM(s.price) as total, COUNT(*) as totalAppointments,
              SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) as completed
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       WHERE a.date BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    const monthlyRevenue = parseFloat((monthlyData as any[])[0].total) || 0;
    const completionRate =
      (monthlyData as any[])[0].totalAppointments > 0
        ? ((monthlyData as any[])[0].completed / (monthlyData as any[])[0].totalAppointments) * 100
        : 0;

    // Doanh thu theo tháng (6 tháng gần nhất)
    const [revenueByMonth] = await connection.execute(
      `SELECT DATE_FORMAT(a.date, '%Y-%m') as month, SUM(s.price) as revenue, COUNT(a.id) as bookings
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       WHERE a.date >= DATE_SUB(?, INTERVAL 6 MONTH)
       GROUP BY month
       ORDER BY month`,
      [endDate]
    );

    // Dịch vụ phổ biến
    const [topServices] = await connection.execute(
      `SELECT s.name, COUNT(a.id) as bookings, SUM(s.price) as revenue
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       WHERE a.date BETWEEN ? AND ?
       GROUP BY s.id, s.name
       ORDER BY bookings DESC
       LIMIT 5`,
      [startDate, endDate]
    );

    // Trạng thái lịch hẹn
    const [appointmentStatus] = await connection.execute(
      `SELECT status, COUNT(*) as count
       FROM appointments
       WHERE date BETWEEN ? AND ?
       GROUP BY status`,
      [startDate, endDate]
    );
    const statusData: { [key: string]: number } = {
      pending: 0,
      confirmed: 0,
      "in-progress": 0,
      completed: 0,
      canceled: 0,
    };
    (appointmentStatus as any[]).forEach(row => {
      statusData[row.status] = row.count;
    });

    // Khung giờ bận nhất
    const [busyHour] = await connection.execute(
      `SELECT time, COUNT(*) as count
       FROM appointments
       WHERE date BETWEEN ? AND ?
       GROUP BY time
       ORDER BY count DESC
       LIMIT 1`,
      [startDate, endDate]
    );

    // Tỷ lệ đặt lại
    const [repeatBookings] = await connection.execute(
      `SELECT COUNT(DISTINCT customerId) as repeatCustomers
       FROM appointments
       WHERE date BETWEEN ? AND ?
       GROUP BY customerId
       HAVING COUNT(*) > 1`,
      [startDate, endDate]
    );

    const response: Stats = {
      totalCustomers,
      todaysAppointments,
      monthlyRevenue,
      completionRate: parseFloat(completionRate.toFixed(1)),
      revenueByMonth: (revenueByMonth as any[]).map(row => ({
        month: row.month,
        revenue: parseFloat(row.revenue),
        bookings: row.bookings,
      })),
      topServices: (topServices as any[]).map(row => ({
        name: row.name,
        bookings: row.bookings,
        revenue: parseFloat(row.revenue).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        percentage: (monthlyData as any[])[0].totalAppointments > 0 ? (row.bookings / (monthlyData as any[])[0].totalAppointments) * 100 : 0,
      })),
      appointmentStatus: Object.values(statusData),
      busyHour: (busyHour as any[])[0]?.time
        ? `${(busyHour as any[])[0].time} - ${parseInt((busyHour as any[])[0].time.split(":")[0]) + 2}:00`
        : "N/A",
      newCustomers: 0,
      repeatBookingRate: (monthlyData as any[])[0].totalAppointments > 0
        ? ((repeatBookings as any[])[0]?.repeatCustomers / (monthlyData as any[])[0].totalAppointments) * 100
        : 0,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}