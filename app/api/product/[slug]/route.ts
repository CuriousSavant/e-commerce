import prisma from "@/lib/prisma";
import { Propertie } from "@/types/product";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const products = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { category: true, properties: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to fetch products", error: error },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const {
    title,
    description,
    image,
    price,
    categoryId,
    brandId,
    stock,
    properties,
  } = await req.json();

  try {
    const update_product = await prisma.product.update({
      data: {
        title,
        description,
        image,
        price,
        categoryId,
        brandId,
        stock,
        properties: { // ยังไม่รู้วิธี update properties เลยทำแบบนี้ไปก่อน
          deleteMany: {}, // ลบ properties เดิมทั้งหมดก่อน
          create: properties.map((property: Propertie) => ({ // แล้วสร้างใหม่
            name: property.name,
            value: property.value,
          })),
        },
      },
      where: { slug: params.slug },
    });
    return NextResponse.json(update_product);
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to update product", error: String(error) },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const delete_product = await prisma.product.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json(delete_product);
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to delete product", error: error },
      { status: 500 }
    );
  }
};
