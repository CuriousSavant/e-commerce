import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// พรุ่งนีต้องลองกลับมาดูว่าแก้อะไรไปบ้างมีทีเด็ดที่การจัดการเรื่องการลบ properties

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const uniqueData = await prisma.category.findUnique({
      where: { id: Number(params.id) },
      include: {
        product: true,
      }
    });
    return NextResponse.json(uniqueData);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { name, parentId } = await req.json();

    const updateCategory = await prisma.category.update({
      data: {
        name,
        parentId,
      },
      where: { id: Number(params.id) },
    });
    return NextResponse.json(updateCategory);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const deleteCategory = await prisma.category.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deleteCategory);
  } catch (err) {
    return NextResponse.json(
      { msg: err, msgError: "เกิดที่ router categories" },
      { status: 500 }
    );
  }
};
