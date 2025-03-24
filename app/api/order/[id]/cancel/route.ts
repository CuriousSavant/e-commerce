import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);

  try {
    const updated_order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELED"
      }
    });

    return NextResponse.json(updated_order, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
