import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { first_name, last_name, email, password, phone, dob, gender } =
      await request.json();

    // Validation
    if (!first_name || !last_name || !email || !password || !dob || gender === undefined) {
      return new Response(
        JSON.stringify({ 
          error: "Vui lòng điền đầy đủ thông tin bắt buộc" 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email không hợp lệ" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Mật khẩu phải có ít nhất 6 ký tự" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? OR (phone IS NOT NULL AND phone = ?)",
      [email, phone || null]
    );

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ error: "Email hoặc số điện thoại đã được sử dụng" }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Format date for MySQL
    const formattedDob = new Date(dob).toISOString().slice(0, 19).replace('T', ' ');

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO users (first_name, last_name, email, password, phone, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword, phone || null, formattedDob, parseInt(gender)]
    );

    return new Response(JSON.stringify({ 
      message: "Đăng ký thành công! Bạn có thể đăng nhập ngay.",
      userId: result.insertId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    
    // Handle specific MySQL errors
    if (error.code === 'ER_DUP_ENTRY') {
      return new Response(
        JSON.stringify({ error: "Email hoặc số điện thoại đã được sử dụng" }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(JSON.stringify({ error: "Lỗi máy chủ. Vui lòng thử lại sau." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
