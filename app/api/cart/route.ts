import prisma from "@/lib/prisma";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ msg: "UserId is required" }, { status: 400 });
  }
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: Number(userId),
        },
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItems);
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

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
    })

    if (!user) {
      return NextResponse.json({ msg: "Not Found User" }, { status: 404 })
    }

    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart || cart === null) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const create_cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    return NextResponse.json(create_cartItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}
