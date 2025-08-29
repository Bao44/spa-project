import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const [rows] = await connection.execute(
      `SELECT a.id, a.fullName, a.email, a.phone, a.date, a.time, a.status, a.note,
              s.name AS serviceName, s.price, s.duration
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       WHERE a.status = 'pending'
       ORDER BY a.createdAt DESC`
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lịch hẹn mới:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}