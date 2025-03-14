import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const category = await prisma.categories.findUnique({
      where: { id: Number(params.id) },
      include: {
        product: true,
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch category", error: error }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { name, parentId, status } = await req.json();

    const update_category = await prisma.categories.update({
      data: {
        name,
        parentId,
        status,
      },
      where: { id: Number(params.id) },
    });
    return NextResponse.json(update_category);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to update category", error: error }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const delete_category = await prisma.categories.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(delete_category);
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to delete category", error: error },
      { status: 500 }
    );
  }
};