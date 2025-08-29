import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  duration: number;
  category: string;
  benefits: string[];
  image: string | null;
}

export async function POST(req: NextRequest) {
  try {
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
      `INSERT INTO services (name, description, price, originalPrice, duration, category, benefits, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        parseFloat(price),
        originalPrice ? parseFloat(originalPrice) : null,
        parseInt(duration),
        category,
        JSON.stringify(benefitsArray),
        image || null,
      ]
    );

    return NextResponse.json(
      { message: "Tạo dịch vụ thành công", id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi khi tạo dịch vụ:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const [rows] = await connection.execute(
      `SELECT id, name, description, price, originalPrice, duration, category, benefits, image
       FROM services`
    );

    const services: Service[] = (rows as any[]).map((service) => ({
      ...service,
      benefits: service.benefits ? JSON.parse(service.benefits) : [],
    }));

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
