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
      include: { properties: true },
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
    const { name, parentId, properties } = await req.json();
    const propertyIds = properties
      .map((property: any) => property.id)
      .filter(Boolean);

    // ลบ properties ที่ไม่มีอยู่ใน payload นี้แล้ว
    await prisma.properties.deleteMany({
      where: {
        categoryId: Number(params.id),
        NOT: { id: { in: propertyIds } }, // ลบเฉพาะ properties ที่ไม่มีใน payload
      },
    });
    const updatedProperties = await Promise.all(
      properties.map(
        async (property: { id: number; name: string; value: string }) => {
          if (property.id) {
            const existingProperty = await prisma.properties.findUnique({
              where: { id: Number(property.id) },
            });

            if (existingProperty) {
              return prisma.properties.update({
                where: { id: Number(property.id) },
                data: {
                  name: property.name,
                  value: property.value,
                },
              });
            } else {
              return prisma.properties.create({
                data: {
                  name: property.name,
                  value: property.value,
                  categoryId: Number(params.id),
                },
              });
            }
          }
        }
      )
    );

    const updateCategory = await prisma.category.update({
      data: {
        name,
        parentId,
        properties: {
          connect: updatedProperties.map((property) => ({ id: property.id })),
        },
      },
      where: { id: Number(params.id) },
      include: { properties: true },
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
      { msg: err, msgError: "เกิดที่ router categires" },
      { status: 500 }
    );
  }
};
