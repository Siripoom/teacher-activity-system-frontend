import { NextResponse } from "next/server";

// Mock user database
const users = [
  {
    id: 1,
    email: "teacher@fte.kmutnb.ac.th",
    password: "123456", // In real app, this should be hashed
    name: "อาจารย์ทดสอบ",
    role: "teacher",
    department: "วิศวกรรมเครื่องมือ",
  },
  {
    id: 2,
    email: "admin@fte.kmutnb.ac.th",
    password: "admin123",
    name: "ผู้ดูแลระบบ",
    role: "admin",
    department: "IT",
  },
  {
    id: 3,
    email: "student@fte.kmutnb.ac.th",
    password: "student123",
    name: "นักศึกษาทดสอบ",
    role: "student",
    department: "วิศวกรรมเครื่องมือ",
  },
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกอีเมลและรหัสผ่าน" },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // Create mock token (in real app, use JWT)
    const token = `mock-token-${user.id}-${Date.now()}`;

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword,
      message: "เข้าสู่ระบบสำเร็จ",
    });

    // Set token in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 }
    );
  }
}
