import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StatusOrder } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

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

function generateOrderId(): string {
  const prefix = "T";
  const randomNumber = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${randomNumber}`;
}

export async function POST(request: Request) {
  const { userId, orderItems, totalAmount } = await request.json();

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return NextResponse.json(
      { error: "Invalid or empty orderItems format" },
      { status: 400 }
    );
  }

  try {
    // Start a Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          id: generateOrderId(),
          userId,
          status: StatusOrder.PENDING,
          orderDate: new Date(),
          totalAmount,
          orderItems: {
            create: await Promise.all(
              orderItems.map(
                async (item: { productId: number; quantity: number }) => {
                  const product = await tx.product.findUnique({
                    where: { id: item.productId },
                  });

                  if (!product || product.stock < item.quantity) {
                    throw new Error(
                      `Insufficient stock for product ID: ${item.productId}`
                    );
                  }

                  // Reserve stock (reduce stock temporarily)
                  await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: product.stock - item.quantity },
                  });

                  return {
                    id: generateOrderId(),
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    totalPrice: product.price * item.quantity,
                  };
                }
              )
            ),
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: userId,
          productId: {
            in: orderItems.map((item) => item.productId),
          },
        },
      });

      return order;
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);

    // Rollback stock adjustment if there's an error
    await Promise.all(
      orderItems.map(async (item: { productId: number; quantity: number }) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (product) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: product.stock + item.quantity },
          });
        }
      })
    );

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
