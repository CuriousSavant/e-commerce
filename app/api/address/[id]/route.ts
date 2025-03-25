import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const address = await prisma.address.findMany({
      where: { userId: Number(params.id) },
    });
    return NextResponse.json(address);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch address", error: error }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

    const update_address = await prisma.address.update({
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
        userId,
      },
      where: { id: Number(params.id) },
    });

    return NextResponse.json(update_address);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "Failed to update address" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const delete_address = await prisma.address.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(delete_address);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to delete address", error: error }, { status: 500 });
  }
};
