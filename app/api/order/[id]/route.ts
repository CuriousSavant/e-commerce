import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { STATUS_ORDER } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);

  try {
    if (!orderId) {
      throw new Error("Order Not Found");
    }

    const orderItem = await prisma.order.findMany({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orderItem) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(orderItem);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch order", error: error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);
  const { status, addressId, items } = await request.json();

  try {
    if (!Object.values(STATUS_ORDER).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // ตรวจสอบว่าสินค้ามีอยู่หรือไม่
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items format" }, { status: 400 });
    }

    // อัพเดทสถานะ และ ที่หมายเลขที่อยู่
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        addressId,
      },
    });

    // ดึงสินค้าปัจจุบันใน OrderItem
    const existingOrderItems = await prisma.orderItem.findMany({
      where: { orderId },
    });

    // แปลงเป็น Map เพื่อง่ายต่อการตรวจสอบ
    const existingItemsMap = new Map(existingOrderItems.map(item => [item.productId, item]));

    // เตรียมรายการสินค้าใหม่
    const updatedOrderItems = items.map(async (item: any) => {
      const productId = item.product.id;
      const quantity = item.quantity;
      const price = item.product.price;
      const total = price * quantity;

      if (existingItemsMap.has(productId)) {
        // อัปเดตจำนวนสินค้าในคำสั่งซื้อเดิม
        return prisma.orderItem.update({
          where: { id: existingItemsMap.get(productId)!.id },
          data: { quantity, total },
        });
      } else {
        // เพิ่มสินค้าใหม่ลงคำสั่งซื้อ
        return prisma.orderItem.create({
          data: {
            orderId,
            productId,
            quantity,
            price,
            total,
          },
        });
      }
    });

    // ลบสินค้าที่ถูกลบออกจากคำสั่งซื้อ
    const updatedProductIds = new Set(items.map(item => item.product.id));
    const removedItems = existingOrderItems.filter(item => !updatedProductIds.has(item.productId));

    await Promise.all([
      ...updatedOrderItems,
      ...removedItems.map(item => prisma.orderItem.delete({ where: { id: item.id } })),
    ]);

    return NextResponse.json({ msg: "Order updated successfully" });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to update order", error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);
  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId },
    });

    await prisma.order.delete({
      where: { id: orderId },
    });
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to delete order", error: error }, { status: 500 });
  }
}
