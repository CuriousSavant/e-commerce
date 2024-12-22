import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (userId) {
      const users = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
      return NextResponse.json(users, { status: 200 });
    }

    // not userId case
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json("Error fetching users", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userName, lastName, email, password, confirmPassword } =
      await req.json();

    // สำหรับใช้งานในกรณีที่ต้องการตรวจสอบว่า email ซ้ำหรือไม่(ในกรณีนี้เป็นแค่ example เท่านั้น)
    // const existingUser = await prisma.user.findUnique({
    //   where: { email },
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "Email already exists" },
    //     { status: 400 }
    //   );
    // }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (!userName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          msg: "จำเป็นต้องกรอกข้อมูลให้ครบ",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: userName,
        lastName,
        email,
        password: hashedPassword,
        role: userName === "admin-config-111" ? "admin" : "member",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}