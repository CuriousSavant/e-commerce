import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await prisma.address.findUnique({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
    const userId = Number(session?.user?.id);

    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const updateData = await prisma.address.update({
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
        userId,
      },
      where: { id: Number(params.id) },
    });

    return NextResponse.json(updateData);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "เกิดข้อผิดพลาดในการอัปเดตที่อยู่" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const deleteData = await prisma.address.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deleteData);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};
