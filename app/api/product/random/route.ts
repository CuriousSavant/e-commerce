import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const randomProduct = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0
        }
      },
      take: 10,
    });
    return NextResponse.json(randomProduct);
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
};
