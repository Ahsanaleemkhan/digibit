import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const adminsFile = path.join(process.cwd(), "data", "admins.json");

// Generate hash for a password
export async function POST(req: NextRequest) {
  const { action, email, password, name } = await req.json();

  if (action === "hash") {
    const hash = await bcrypt.hash(password, 10);
    return NextResponse.json({ hash });
  }

  if (action === "create-first-admin") {
    try {
      const admins = JSON.parse(
        fs.readFileSync(adminsFile, "utf-8")
      );
      if (admins.length > 0) {
        return NextResponse.json(
          { error: "Admin already exists" },
          { status: 400 }
        );
      }
    } catch {
      // File doesn't exist, create it
    }

    const hash = await bcrypt.hash(password, 10);
    const newAdmin = {
      id: "admin_1",
      email,
      name,
      password: hash,
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(adminsFile, JSON.stringify([newAdmin], null, 2));
    return NextResponse.json({
      success: true,
      message: "First admin created successfully",
    });
  }

  return NextResponse.json(
    { error: "Invalid action" },
    { status: 400 }
  );
}
