import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import connection from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Kiểm tra admin trong DB
    const [rows]: any = await connection.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );
    const admin = rows[0];

    if (!admin) {
      return NextResponse.json(
        { error: "Email không tồn tại" },
        { status: 401 }
      );
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Tạo session ID
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Hết hạn sau 24h

    // Lưu session vào DB
    await connection.query(
      "INSERT INTO sessions (id, adminId, expiresAt) VALUES (?, ?, ?)",
      [sessionId, admin.id, expiresAt]
    );

    // Tạo response và set cookie
    const responseData = {
      message: "Đăng nhập thành công",
      admin: { id: admin.id, username: admin.username, email: admin.email },
    };
    const response = NextResponse.json(responseData);
    response.cookies.set({
      name: "sessionId",
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Đăng nhập thất bại" }, { status: 500 });
  }
}
