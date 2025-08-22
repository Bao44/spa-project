import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const appointmentId = parseInt(params.id);
    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const [rows] = await connection.execute(
      `SELECT a.*, s.name AS serviceName, s.description AS serviceDescription, s.price, s.originalPrice, s.duration, s.category, s.benefits, s.image
       FROM appointments a
       LEFT JOIN services s ON a.serviceId = s.id
       WHERE a.id = ?`,
      [appointmentId]
    );

    const appointment = (rows as any[])[0];
    if (!appointment) {
      return NextResponse.json(
        { error: "Không tìm thấy lịch hẹn" },
        { status: 404 }
      );
    }

    appointment.benefits = appointment.benefits
      ? JSON.parse(appointment.benefits)
      : [];

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin lịch hẹn:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const appointmentId = parseInt(params.id);
    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    // Validation status
    const validStatuses = [
      "pending",
      "confirmed",
      "completed",
      "canceled",
      "in-progress",
    ];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Trạng thái không hợp lệ, phải là một trong: ${validStatuses.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Update status
    const [result] = await connection.execute(
      `UPDATE appointments SET status = ? WHERE id = ?`,
      [status, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy lịch hẹn" },
        { status: 404 }
      );
    }

    // Lấy dữ liệu sau update
    const [updatedRows] = await connection.execute(
      `SELECT a.*, s.name AS serviceName, s.price, s.duration
       FROM appointments a
       JOIN services s ON a.serviceId = s.id
       WHERE a.id = ?`,
      [params.id]
    );

    return NextResponse.json((updatedRows as any[])[0], { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật lịch hẹn:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const appointmentId = parseInt(params.id);
    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const [result] = await connection.execute(
      "DELETE FROM appointments WHERE id = ?",
      [appointmentId]
    );
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy appointment" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Xóa thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
