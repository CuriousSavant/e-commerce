import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const productWithProperties = await prisma.properties.findUnique({
      where: { id: Number(params.id) },
      include: {
        category: {
          include: {
            properties: true,
          },
        },
      },
    });

    if (!productWithProperties) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(productWithProperties);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const deletePropertiesField = await prisma.properties.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deletePropertiesField);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};
