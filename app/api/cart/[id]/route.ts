import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const cartItems = await prisma.cartItem.findUnique({
      where: { id: Number(params.id) },
      include: { product: true },
    });
    return NextResponse.json(cartItems);
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);

    const itemsToDelete = await prisma.cartItem.findMany({
      where: { productId: productId },
    });

    if (!itemsToDelete || itemsToDelete.length === 0) {
      return NextResponse.json(
        { msg: "ไม่มีสินค้าที่ต้องการลบใน CartItem" },
        { status: 404 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: { productId: productId },
    });
    return NextResponse.json({ msg: "ลบสินค้าทั้งหมดสำเร็จ" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting items:", error);
    return NextResponse.json(
      { msg: "เกิดข้อผิดพลาดในการลบสินค้า" },
      { status: 500 }
    );
  }
}