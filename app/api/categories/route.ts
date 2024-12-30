import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categoryData = await prisma.category.findMany({
      include: {
        product: true,
      },
    });
    return NextResponse.json(categoryData);
  } catch (err) {
    return NextResponse.json({ MsgError: err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, parentId } = await req.json();

    const crateCategory = await prisma.category.create({
      data: {
        name,
        parentId: parentId || null,
      },
    });
    return NextResponse.json(crateCategory);
  } catch (err) {
    return NextResponse.json({ MsgError: err }, { status: 500 });
  }
};
