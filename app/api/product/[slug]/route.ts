import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        properties: true,
        feature: true,
      },
    });

    return NextResponse.json(product);
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
    brand,
    stock,
  } = await req.json();

  try {
    const updateProduct = await prisma.product.update({
      data: {
        title,
        description,
        image,
        price,
        categoryId,
        brand,
        stock,
      },
      where: { slug: params.slug },
    });
    return NextResponse.json(updateProduct);
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
    const deleteRow = await prisma.product.delete({
      where: { slug: params.slug },
    });
    return NextResponse.json(deleteRow);
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to delete product", error: error },
      { status: 500 }
    );
  }
};
