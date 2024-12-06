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
    console.error(error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลรายการโปรดได้" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { productId } = await request.json();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const wishlistItem = await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId: Number(session.user.id),
          productId,
        },
      },
      update: {},
      create: {
        userId: Number(session.user.id),
        productId,
      },
    });

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This product is already in the wishlist" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}
