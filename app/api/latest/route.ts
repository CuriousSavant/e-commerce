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
    console.error('Error fetching latest products:', error);
    return NextResponse.json({ error: 'Failed to fetch latest products' }, { status: 500 });
  }
}
