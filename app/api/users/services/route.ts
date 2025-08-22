import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const [rows] = await connection.execute(
      `SELECT id, name, description, price, originalPrice, duration, category, benefits, image
       FROM services`
    );
    const services = (rows as any[]).map((service) => ({
      ...service,
      benefits: service.benefits ? JSON.parse(service.benefits) : [],
    }));

    // Nhóm theo category
    const groupedServices = services.reduce((acc, service) => {
      const category = service.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json(Object.entries(groupedServices), { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
