import prisma from "@/lib/prisma";
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
      },
      where: { slug: params.slug },
    });
    return NextResponse.json(update_product);
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to update product", error: error },
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
