import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categoryData = await prisma.category.findMany({ include: { properties: true } });
    return NextResponse.json(categoryData);
  } catch (err) {
    return NextResponse.json({ MsgError: err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, parentId, properties } = await req.json();

    const crateCategory = await prisma.category.create({
      data: {
        name,
        parentId: parentId || null,
        properties: {
          create: properties.map((property: { name: string; value: string }) => {
            return {
              name: property.name,
              value: property.value,
            };
          }),
        },
      },
      include: { properties: true }
    });
    return NextResponse.json(crateCategory);
  } catch (err) {
    return NextResponse.json({ MsgError: err }, { status: 500 });
  }
};