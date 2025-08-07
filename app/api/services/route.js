import db from "@/lib/db";

// GET - Retrieve services with flexible search options
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minDuration = searchParams.get("minDuration");
    const maxDuration = searchParams.get("maxDuration");
    const search = searchParams.get("search"); // General search term

    let query = "SELECT * FROM services";
    let params = [];
    const conditions = [];

    if (name) {
      conditions.push("name LIKE ?");
      params.push(`%${name}%`);
    }

    if (search) {
      conditions.push("(name LIKE ? OR description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
      conditions.push("price >= ?");
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      conditions.push("price <= ?");
      params.push(parseFloat(maxPrice));
    }

    if (minDuration) {
      conditions.push("duration_minutes >= ?");
      params.push(parseInt(minDuration));
    }

    if (maxDuration) {
      conditions.push("duration_minutes <= ?");
      params.push(parseInt(maxDuration));
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Add ordering
    query += " ORDER BY name ASC";

    const [rows] = await db.query(query, params);

    // If searching by ID, return single object
    if (id) {
      return new Response(JSON.stringify(rows[0] || null), { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Return array for all other searches
      return new Response(JSON.stringify(rows), { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error("GET /api/services error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// POST - Create a new service
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, image, duration_minutes } = body;

    // Validation
    if (!name || !price || !duration_minutes) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: name, price, and duration_minutes are required" 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate price and duration are numbers
    if (isNaN(parseFloat(price)) || isNaN(parseInt(duration_minutes))) {
      return new Response(
        JSON.stringify({ 
          error: "Price must be a valid number and duration_minutes must be a valid integer" 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if service with same name already exists
    const [existingService] = await db.query(
      "SELECT id FROM services WHERE name = ?",
      [name]
    );

    if (existingService.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: "A service with this name already exists" 
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Insert new service
    const query = `
      INSERT INTO services (name, description, price, image, duration_minutes)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      name,
      description || null,
      parseFloat(price),
      image || null,
      parseInt(duration_minutes)
    ]);

    // Fetch the created service
    const [newService] = await db.query(
      "SELECT * FROM services WHERE id = ?",
      [result.insertId]
    );

    return new Response(JSON.stringify(newService[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("POST /api/services error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// PUT - Update an existing service
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, description, price, image, duration_minutes } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Service ID is required for updates" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if service exists
    const [existingService] = await db.query(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    if (existingService.length === 0) {
      return new Response(
        JSON.stringify({ error: "Service not found" }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Build update query dynamically
    const updates = [];
    const params = [];

    if (name !== undefined) {
      updates.push("name = ?");
      params.push(name);
    }

    if (description !== undefined) {
      updates.push("description = ?");
      params.push(description);
    }

    if (price !== undefined) {
      if (isNaN(parseFloat(price))) {
        return new Response(
          JSON.stringify({ error: "Price must be a valid number" }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      updates.push("price = ?");
      params.push(parseFloat(price));
    }

    if (image !== undefined) {
      updates.push("image = ?");
      params.push(image);
    }

    if (duration_minutes !== undefined) {
      if (isNaN(parseInt(duration_minutes))) {
        return new Response(
          JSON.stringify({ error: "Duration minutes must be a valid integer" }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      updates.push("duration_minutes = ?");
      params.push(parseInt(duration_minutes));
    }

    if (updates.length === 0) {
      return new Response(
        JSON.stringify({ error: "No fields to update" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Add updated_at timestamp
    updates.push("updated_at = CURRENT_TIMESTAMP");
    params.push(id);

    const query = `UPDATE services SET ${updates.join(", ")} WHERE id = ?`;

    await db.query(query, params);

    // Fetch and return updated service
    const [updatedService] = await db.query(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    return new Response(JSON.stringify(updatedService[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("PUT /api/services error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// DELETE - Delete a service
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Service ID is required" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if service exists
    const [existingService] = await db.query(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    if (existingService.length === 0) {
      return new Response(
        JSON.stringify({ error: "Service not found" }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if service is used in appointments
    const [appointments] = await db.query(
      "SELECT COUNT(*) as count FROM appointments WHERE service_id = ?",
      [id]
    );

    if (appointments[0].count > 0) {
      return new Response(
        JSON.stringify({ 
          error: "Cannot delete service. It has associated appointments." 
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Delete the service
    await db.query("DELETE FROM services WHERE id = ?", [id]);

    return new Response(
      JSON.stringify({ 
        message: "Service deleted successfully",
        deletedService: existingService[0]
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error("DELETE /api/services error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
