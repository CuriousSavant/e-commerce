import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const cartItems = await prisma.cartItem.findMany({
    include: { product: true },
  });
  return NextResponse.json(cartItems);
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
