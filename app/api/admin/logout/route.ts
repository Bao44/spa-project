// app/api/admin/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("sessionId")?.value;
  if (sessionId) {
    await pool.query("DELETE FROM sessions WHERE id = ?", [sessionId]);
  }
  const response = NextResponse.json({ message: "Đăng xuất thành công" });
  response.cookies.set("sessionId", "", { expires: new Date(0), path: "/" });
  return response;
}
