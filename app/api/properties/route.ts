import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const propertery = await prisma.properties.findMany();
    return NextResponse.json(propertery);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, value, categoryId } = await req.json();
    const createProperty = await prisma.properties.create({
      data: {
        name,
        value,
        categoryId: categoryId || null,
      },
    });
    return NextResponse.json(createProperty);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};
