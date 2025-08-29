import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    const [rows] = await connection.execute(
      `SELECT id, name, description, price, originalPrice, duration, category, benefits, image
       FROM services WHERE id = ?`,
      [id]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy dịch vụ" },
        { status: 404 }
      );
    }

    const service = (rows as any[])[0];
    service.benefits = service.benefits ? JSON.parse(service.benefits) : [];

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin dịch vụ:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; 
    const id = parseInt(params.id);
    const body = await req.json();
    const {
      name,
      description,
      price,
      originalPrice,
      duration,
      category,
      benefits,
      image,
    } = body;

    if (!name || !price || !duration || !category) {
      return NextResponse.json(
        { error: "Thiếu các trường bắt buộc" },
        { status: 400 }
      );
    }

    const benefitsArray = benefits
      ? Array.isArray(benefits)
        ? benefits
        : benefits.split(",").map((item: string) => item.trim())
      : [];

    const [result] = await connection.execute(
      `UPDATE services
       SET name = ?, description = ?, price = ?, originalPrice = ?, duration = ?, category = ?, benefits = ?, image = ?
       WHERE id = ?`,
      [
        name,
        description || null,
        parseFloat(price),
        originalPrice ? parseFloat(originalPrice) : null,
        parseInt(duration),
        category,
        JSON.stringify(benefitsArray),
        image || null,
        id,
      ]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy dịch vụ" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Cập nhật dịch vụ thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật dịch vụ:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; 
    const id = parseInt(params.id); 
    const [result] = await connection.execute(
      `DELETE FROM services WHERE id = ?`,
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy dịch vụ" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Xóa dịch vụ thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi xóa dịch vụ:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
