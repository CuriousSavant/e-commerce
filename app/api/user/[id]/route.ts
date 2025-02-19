import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);

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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const {
      firstname,
      lastname,
      email,
      role,
      password,
    } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstname,
        lastname,
        email,
        role,
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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ msg: "User Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
};
