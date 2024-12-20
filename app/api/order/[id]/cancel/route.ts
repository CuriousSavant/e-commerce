import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const orderId = params.id;

  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId },
    });

    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json(deletedOrder, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
