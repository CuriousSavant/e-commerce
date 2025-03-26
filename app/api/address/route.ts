import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const address = await prisma.address.findMany({
        where: { userId: Number(userId) },
        include: { user: true },
        orderBy: { isDefault: "desc" }
      });
      return NextResponse.json(address);
    } else {
      const address = await prisma.address.findMany({
        include: { user: true },
        orderBy: { isDefault: "desc" }
      });
      return NextResponse.json(address);
    }
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch address", error: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
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
        userId: Number(userId),
      },
    });
    return NextResponse.json(create_address);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create address", error: error }, { status: 500 });
  }
};
