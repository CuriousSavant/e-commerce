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
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msgErr: "An error occurred", error: err },
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
    feature,
    properties,
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
        feature: {
          create: feature.map((item: any) => ({
            desctiption: item.description,
          })),
        },
        properties: {
          create: properties.map((item: any) => ({
            name: item.name,
            value: item.value,
          })),
        },
      },
      where: { slug: params.slug },
    });
    return NextResponse.json(updateProduct);
  } catch (err) {
    return NextResponse.json(
      { msgErr: "Update product fail!", error: err },
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
  } catch (err) {
    return NextResponse.json(
      {
        msg: "An error occurred",
        error: err,
      },
      { status: 500 }
    );
  }
};
