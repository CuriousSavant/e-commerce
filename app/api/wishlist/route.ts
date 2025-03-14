import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId: Number(session.user.id) },
      include: { product: true },
    });

    return NextResponse.json(wishlistItems);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch wishlist", error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { productId } = await request.json();

  try {
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingItem = await prisma.wishlist.findFirst({
      where: {
        userId: Number(session.user.id),
        productId,
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { message: "This product is already in your wishlist" },
        { status: 400 }
      );
    }

    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: Number(session.user.id),
        productId,
      },
    });

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create wishlist", error: error }, { status: 500 });
  }
}
