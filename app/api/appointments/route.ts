import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, serviceId, date, time, note } = body;

    if (!fullName || !email || !phone || !serviceId || !date || !time) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Kiểm tra khách hàng
    const [customers] = await connection.execute(
      "SELECT id FROM customers WHERE email = ? OR phone = ?",
      [email, phone]
    );
    let customerId = (customers as any[])[0]?.id;

    // Nếu không có, thêm mới
    if (!customerId) {
      const [result] = await connection.execute(
        "INSERT INTO customers (fullName, email, phone, history) VALUES (?, ?, ?, ?)",
        [fullName, email, phone, "[]"]
      );
      customerId = (result as any).insertId;
    }

    // Tạo appointment
    const [appointmentResult] = await connection.execute(
      "INSERT INTO appointments (customerId, serviceId, date, time, status, note, fullName, email, phone, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
      [
        customerId,
        serviceId,
        date,
        time,
        "pending",
        note,
        fullName,
        email,
        phone,
      ]
    );

    return NextResponse.json(
      {
        message: "Yêu cầu đặt lịch thành công, chờ admin xác nhận",
        appointmentId: (appointmentResult as any).insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    await connection.query("ROLLBACK");
    console.error("Lỗi khi đặt lịch:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const [rows] = await connection.execute(
      `SELECT a.id, a.fullName, a.email, a.phone, a.date, a.time, a.status, a.note,
              s.name AS serviceName, s.description, s.price, s.duration, s.category
       FROM appointments a
       JOIN services s ON a.serviceId = s.id`
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách appointment:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const appointmentId = params.id;
  try {
    const { adminId, status } = await req.json(); // adminId từ session, status = 'confirmed'
    if (!status || status !== "confirmed") {
      return NextResponse.json({ error: "Trạng thái không hợp lệ" }, { status: 400 });
    }

    // Cập nhật appointment
    await connection.execute(
      `UPDATE appointments SET status = ?, adminId = ?, updatedAt = NOW()
       WHERE id = ? AND status = 'pending'`,
      [status, adminId || null, appointmentId]
    );

    // Lấy thông tin sau khi cập nhật để trả về
    const [updatedRows] = await connection.execute(
      `SELECT a.*, s.name AS serviceName, s.price, s.duration
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       WHERE a.id = ?`,
      [appointmentId]
    );
    const updatedAppointment = (updatedRows as any[])[0];

    if (!updatedAppointment) {
      return NextResponse.json({ error: "Không tìm thấy appointment" }, { status: 404 });
    }

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi xác nhận appointment:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}