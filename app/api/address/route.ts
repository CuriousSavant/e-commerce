import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.address.findMany();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const {
    fullName,
    phoneNumber,
    address,
    subDistrict,
    district,
    province,
    postalCode,
    type,
    isDefault,
  } = await req.json();

  try {
    const createData = await prisma.address.create({
      data: {
        fullName,
        phoneNumber,
        address,
        subDistrict,
        district,
        province,
        postalCode,
        type,
        isDefault,
        userId: Number(session?.user?.id),
      },
    });
    return NextResponse.json(createData);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};
