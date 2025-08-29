import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  history: any[];
}

export async function GET(req: NextRequest) {
  try {
    // Lấy danh sách khách hàng
    const [customerRows] = await connection.execute(
      `SELECT id, fullName, email, phone, history FROM customers`
    );

    const customers: Customer[] = (customerRows as any[]).map((customer) => ({
      ...customer,
      history: customer.history ? JSON.parse(customer.history) : [],
    }));

    // Lấy lịch sử từ appointments và cập nhật
    const [appointmentRows] = await connection.execute(
      `SELECT a.customerId, a.date, a.time, a.status, s.name AS service
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       ORDER BY a.date DESC`
    );

    const appointments = appointmentRows as any[];
    customers.forEach((customer) => {
      customer.history = appointments
        .filter((appt) => appt.customerId === customer.id)
        .map((appt) => ({
          date: appt.date,
          time: appt.time,
          service: appt.service,
          status: appt.status,
        }));
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, history = "[]" } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc (fullName, email, phone)" },
        { status: 400 }
      );
    }

    const [existing] = await connection.execute(
      "SELECT id FROM customers WHERE email = ? OR phone = ?",
      [email, phone]
    );
    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: "Email hoặc số điện thoại đã tồn tại" },
        { status: 400 }
      );
    }

    const historyArray = Array.isArray(history)
      ? JSON.stringify(history)
      : history;

    const [result] = await connection.execute(
      `INSERT INTO customers (fullName, email, phone, history) VALUES (?, ?, ?, ?)`,
      [fullName, email, phone, historyArray]
    );

    return NextResponse.json(
      { message: "Tạo khách hàng thành công", id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi khi tạo khách hàng:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
