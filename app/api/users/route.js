import db from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let query = "SELECT * FROM users";
    if (id) {
      query += " WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return new Response(JSON.stringify(rows[0] || {}), { status: 200 });
    } else {
      const [rows] = await db.query(query);
      return new Response(JSON.stringify(rows), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
