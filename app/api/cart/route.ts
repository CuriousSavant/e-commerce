import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ msg: "UserId is required" }, { status: 400 });
  }
  try {
    const cartItem = await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: Number(userId),
        },
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItem);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId || !quantity) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}
