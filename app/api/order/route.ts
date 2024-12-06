import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StatusOrder } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  console.log(userId);

  if (!userId) {
    return NextResponse.json({ msg: "UserId is required" }, { status: 400 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId, orderItems } = await request.json();

  if (!Array.isArray(orderItems)) {
    return NextResponse.json(
      { error: "Invalid orderItems format" },
      { status: 400 }
    );
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        status: StatusOrder.PENDING,
        orderDate: new Date(),
        orderItems: {
          create: await Promise.all(
            orderItems.map(
              async (item: { productId: number; quantity: number }) => {
                const product = await prisma.product.findUnique({
                  where: { id: item.productId },
                });

                if (product) {
                  return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                  };
                } else {
                  throw new Error(
                    `Product with ID: ${item.productId} not found`
                  );
                }
              }
            )
          ),
        },
      },
    });

    for (const item of orderItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (product) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: product.stock || 0 - item.quantity },
        });
      }

      await prisma.cartItem.deleteMany({
        where: {
          cartId: userId,
          productId: {
            in: orderItems.map((item) => item.productId),
          },
        },
      });
    }

    // หลังสั่งชื้อ ให้ลลบสินค้าในตะกร้าทั้งหมด
    return NextResponse.json(order);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}