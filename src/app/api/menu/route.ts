
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET: Fetch all menu items
export async function GET() {
  try {
    const items = await sql`
      SELECT id, name, price, description
      FROM menu_items
      ORDER BY id DESC
    `;

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET menu error:", error);

    return NextResponse.json(
      { error: "Failed to load menu items." },
      { status: 500 }
    );
  }
}

// POST: Add a new menu item
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    const price = Number(body.price);

    if (!name || !description || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { error: "Please provide a valid name, price, and description." },
        { status: 400 }
      );
    }

    if (name.length > 150) {
      return NextResponse.json(
        { error: "Food name must be 150 characters or fewer." },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO menu_items (name, price, description)
      VALUES (${name}, ${price}, ${description})
      RETURNING id, name, price, description
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST menu error:", error);

    return NextResponse.json(
      { error: "Failed to add menu item." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a menu item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "A valid menu item ID is required." },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM menu_items
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Menu item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Menu item deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE menu error:", error);

    return NextResponse.json(
      { error: "Failed to delete menu item." },
      { status: 500 }
    );
  }
}
