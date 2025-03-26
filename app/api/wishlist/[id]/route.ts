import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const wishlistItem = await prisma.wishlist.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(userId),
      },
    });

    if (!wishlistItem) {
      return NextResponse.json({ error: "ไม่พบรายการโปรด" }, { status: 404 });
    }

    return NextResponse.json(wishlistItem);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch wishlist", error: error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { productId, userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const updatedItem = await prisma.wishlist.updateMany({
      where: {
        id: Number(params.id),
        userId: Number(userId),
      },
      data: { productId },
    });

    if (updatedItem.count === 0) {
      return NextResponse.json({ error: "ไม่พบรายการโปรด" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to update wishlist", error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = request.nextUrl.searchParams.get("userId");
  const productId = parseInt(params.id, 10);

  try {
    const deletedWishlist = await prisma.wishlist.deleteMany({
      where: { userId: Number(userId), productId },
    });

    if (deletedWishlist.count === 0) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Failed to delete wishlist", error: error }, { status: 500 });
  }
}