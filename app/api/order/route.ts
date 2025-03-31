import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { STATUS_ORDER } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const filterStatus = searchParams.get("filterStatus");
  const userId = Number(searchParams.get("userId"));
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  let whereClause: any = {};

  let whereCountClause: any = {};

  if (filterStatus && filterStatus !== 'all') whereClause.status = filterStatus.toUpperCase();
  if (query) whereClause.orderId = { contains: query, mode: "insensitive" };
  if (userId) whereClause.userId = userId;

  if (userId) whereCountClause.userId = userId;

  const ordersCount = await prisma.order.count({ where: whereClause })

  try {
    const orders = await prisma.order.findMany({
      where: whereClause,
      orderBy: { createdAt: sortOrder } as any,
      include: {
        items: {
          include: { product: true },
        },
        user: true,
        address: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return NextResponse.json({ orders, ordersCount });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch orders", error: error }, { status: 500 });
  }
}

function generateOrderId(): string {
  const prefix = "T";
  const randomNumber = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${randomNumber}`;
}

export async function POST(request: Request) {
  const { userId, orderItems, totalAmount, addressId } = await request.json();

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
          orderId: generateOrderId(),
          userId,
          status: STATUS_ORDER.PENDING,
          total: totalAmount,
          addressId,
          items: {
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

                  // ลดสต๊อกชั่วคราว
                  await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: product.stock - item.quantity },
                  });

                  return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    total: product.price * item.quantity,
                  };
                }
              )
            ),
          },
        },
      });

      // หลังจากสร้าง order เสร็จ ให้ลบ cartItem ที่มี productId ตรงกับ orderItems ออก
      await tx.cartItem.deleteMany({
        where: {
          productId: {
            in: orderItems.map((item) => item.productId)
          },
          quantity: {
            in: orderItems.map((item) => item.quantity)
          }
        },
      });

      return order;
    });

    return NextResponse.json(result);
  } catch (error) {
    // คืนจำนวนใน stock คืนหากโดยยกเลิก หรือ มีข้อผิดพลาด
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

    return NextResponse.json({ msg: "Failed to create order", error: error }, { status: 500 });
  }
}