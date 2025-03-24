import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const address = await prisma.address.findMany({
        where: { userId: Number(userId) },
        include: { user: true }
      });
      return NextResponse.json(address);
    } else {
      const address = await prisma.address.findMany({
        include: { user: true }
      });
      return NextResponse.json(address);
    }
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch address", error: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const {
    fullName,
    phone,
    address,
    subDistrict,
    district,
    province,
    postalCode,
    type,
    isDefault,
    userId,
  } = await req.json();

  try {
    const create_address = await prisma.address.create({
      data: {
        fullName,
        phone,
        address,
        subDistrict,
        district,
        province,
        postalCode,
        type,
        isDefault,
        userId: session?.user.role === "admin" ? userId : session?.user.id,
      },
    });
    return NextResponse.json(create_address);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create address", error: error }, { status: 500 });
  }
};
