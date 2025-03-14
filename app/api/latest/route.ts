import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const latestProducts = await prisma.product.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    return NextResponse.json(latestProducts);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch latest products", error: error }, { status: 500 });
  }
}