import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SortType } from "@/types/components/filter-sort";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const role = searchParams.get("role") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const countUser = await prisma.user.count({});

    if (!query) {
      const users = await prisma.user.findMany({
        where: { role: role === 'all' ? {} : role },
        orderBy: { createdAt: sortOrder as SortType },
        include: { address: true, order: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return NextResponse.json({ users, countUser }, { status: 200 });
    }

    const isNumeric = !isNaN(Number(query));

    const users = await prisma.user.findMany({
      orderBy: { createdAt: sortOrder as SortType },
      where: {
        role: role === 'all' ? {} : role,
        OR: [
          { firstname: { contains: query, mode: "insensitive" } },
          { lastname: { contains: query, mode: "insensitive" } },
          { email: { contains: query.toLowerCase(), mode: "insensitive" } },
          ...(isNumeric ? [{ id: Number(query) }] : [])
        ]
      },
      include: {
        address: true,
        order: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({ users, countUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch users", error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, phone, birthday, role, password, confirmPassword } =
      await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ msg: "มีผู้ใช้อีเมลนี้แล้ว" }, { status: 400 });
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