import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Kiểm tra user
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Email hoặc mật khẩu không hợp lệ" }),
        { status: 401 }
      );
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "Email hoặc mật khẩu không hợp lệ" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Đăng nhập thành công",
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
