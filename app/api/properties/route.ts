import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const propertery = await prisma.properties.findMany();
    return NextResponse.json(propertery);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch properties", error: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, value } = await req.json();
    const createProperty = await prisma.properties.create({
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(createProperty);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create properties", error: error }, { status: 500 });
  }
};