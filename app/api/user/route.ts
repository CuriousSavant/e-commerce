import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SortType } from "@/types/components/filter-sort";

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
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, phone, birthday, role, password, confirmPassword } =
      await req.json();

    console.log(firstname, lastname, email, phone, birthday, role, password, confirmPassword)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // if (!firstname || !email || !password || !confirmPassword) {
    //   return NextResponse.json(
    //     {
    //       msg: "จำเป็นต้องกรอกข้อมูลให้ครบ",
    //     },
    //     { status: 400 }
    //   );
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email: email.toLowerCase(),
        phone: phone,
        dateOfBirth: birthday,
        role: role || "member",
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}