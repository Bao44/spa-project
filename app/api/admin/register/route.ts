import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import connection from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();
    // Kiểm tra xem admin đã tồn tại chưa
    const [rows]: any = await connection.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      await connection.end();
      return NextResponse.json(
        { error: "Tài khoản admin đã tồn tại" },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    // Insert tài khoản admin
    const [result]: any = await connection.query(
      "INSERT INTO admin (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    // Tạo session ID
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Hết hạn sau 24h

    // Lưu session vào DB
    await connection.query(
      "INSERT INTO sessions (id, adminId, expiresAt) VALUES (?, ?, ?)",
      [sessionId, result.insertId, expiresAt]
    );

    await connection.end();

    // Tạo response và set cookie
    const response = NextResponse.json({ message: "Đăng ký admin thành công" });
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
    console.error("Register error:", error);
    return NextResponse.json({ error: "Đăng ký thất bại" }, { status: 500 });
  }
}
