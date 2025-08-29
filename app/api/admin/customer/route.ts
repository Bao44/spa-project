import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const [rows] = await connection.execute(
      `SELECT id, fullName, email, phone, history FROM customers`
    );

    const customers = (rows as any[]).map((customer) => ({
      ...customer,
      history: customer.history ? JSON.parse(customer.history) : [],
    }));

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

    // Kiểm tra email hoặc phone đã tồn tại
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
