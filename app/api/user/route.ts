import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SortType } from "@/types/components/filter-sort";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim() || "";
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
          order: true,
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
        order: true,
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch users", error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, phone, birthday, role, password, confirmPassword } =
      await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // console.log(firstname, lastname, email, phone, birthday, role, password, confirmPassword)

    if (existingUser) {
      return NextResponse.json(
        { msg: "มีผู้ใช้อีเมลนี้แล้ว" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "รหัสผ่านไม่ตรงกัน" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email: email.toLowerCase(),
        phone,
        birthday,
        role: role || "member",
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create user", error: error }, { status: 500 });
  }
}