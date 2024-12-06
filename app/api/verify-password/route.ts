import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password, userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Not Found User" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false, msg: "รหัสผ่านไม่ถูกต้อง" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน" },
      { status: 500 }
    );
  }
}
