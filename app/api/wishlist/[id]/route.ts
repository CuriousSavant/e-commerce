import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const wishlistItem = await prisma.wishlist.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(session.user.id),
      },
    });

    if (!wishlistItem) {
      return NextResponse.json({ error: "ไม่พบรายการโปรด" }, { status: 404 });
    }

    return NextResponse.json(wishlistItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลรายการโปรดได้" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  const { productId } = await request.json();

  try {
    const updatedItem = await prisma.wishlist.updateMany({
      where: {
        id: Number(params.id),
        userId: Number(session.user.id),
      },
      data: { productId },
    });

    if (updatedItem.count === 0) {
      return NextResponse.json({ error: "ไม่พบรายการโปรด" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "ไม่สามารถแก้ไขรายการโปรดได้" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const productId = parseInt(params.id, 10);

  try {
    const deletedWishlist = await prisma.wishlist.deleteMany({
      where: { userId: Number(session?.user.id), productId },
    });

    if (deletedWishlist.count === 0) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}