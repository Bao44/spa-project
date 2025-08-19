import connection from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("sessionId")?.value;
    if (!sessionId) {
      const responseData = {
        message: "Chưa đăng nhập",
      };
      const response = NextResponse.json(responseData);
      return response;
    }

    // Kiểm tra session
    const [sessionRows]: any = await connection.query(
      "SELECT adminId FROM sessions WHERE id = ? AND expiresAt > NOW()",
      [sessionId]
    );
    if (sessionRows.length === 0) {
      const responseData = {
        message: "Session không hợp lệ",
      };
      const response = NextResponse.json(responseData);
      return response;
    }

    // Lấy thông tin admin
    const [adminRows]: any = await connection.query(
      "SELECT id, username, email FROM admin WHERE id = ?",
      [sessionRows[0].adminId]
    );

    if (adminRows.length === 0) {
      const responseData = {
        message: "Admin không tồn tại",
      };
      const response = NextResponse.json(responseData);
      return response;
    }

    return NextResponse.json(adminRows[0]);
  } catch (error: any) {
    console.error("Profile error:", error);
    const responseData = {
      message: "Lấy thông tin admin thất bại",
    };
    const response = NextResponse.json(responseData);
    return response;
  }
}
