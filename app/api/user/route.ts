import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SortType } from "@/types/components/filter-sort";
import { last } from "lodash";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const role = searchParams.get("role") || "all";

    if (!query) {
      const users = await prisma.user.findMany({
        where: {
          role: role === 'all' ? {} : role,
        },
        orderBy: {
          createdAt: sortOrder as SortType,
        },
        include: {
          address: true,
        }
      });
      return NextResponse.json(users, { status: 200 });
    }

    const isNumeric = !isNaN(Number(query));

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: sortOrder as SortType,
      },
      where: {
        role: role === 'all' ? {} : role,
        OR: [
          { firstname: { contains: query.toLowerCase() } },
          { email: { contains: query.toLowerCase() } },
          ...(isNumeric ? [{ id: Number(query) }] : [])
        ]
      },
      include: {
        address: true,
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userName, lastName, email, phone, birthday, role, password, confirmPassword } =
      await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "มีผู้ใช้นี้อยู่แล้ว" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "รหัสผ่านไม่ตรงกัน" },
        { status: 400 }
      );
    }

    console.log(userName, lastName, email, phone, birthday, role, password, confirmPassword)

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname: userName,
        lastname: lastName,
        email: email.toLowerCase(),
        phone: phone,
        birthday: birthday,
        role: role || "member",
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}