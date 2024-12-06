import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    console.log(userId)

    if (!userId) {
      return NextResponse.json({ msg: "Not Found User Id" }, { status: 404 });
    }

    const userUnique = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userUnique) {
      return NextResponse.json({ msg: "Not Found User" }, { status: 404 });
    }

    return NextResponse.json(userUnique, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const {
      id,
      name,
      email,
      password,
      currentPassword,
      lastName,
      phone,
      dateOfBirth,
    } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    console.log(isCurrentPasswordValid);

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        password: password ? await bcrypt.hash(password, 10) : user.password,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้" },
      { status: 500 }
    );
  }
}
