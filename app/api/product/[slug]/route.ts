import prisma from "@/lib/prisma";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { category: { include: { parent: true, properties: true } } },
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
  try {
    const {
      title,
      description,
      image,
      price,
      categoryId,
      brand,
      stock,
      productProperties,
    } = await req.json();
    const updateProduct = await prisma.product.update({
      data: {
        title,
        description,
        image,
        price,
        categoryId,
        brand,
        stock,
        productProperty: productProperties,
      },
      where: { slug: params.slug },
    });
    return NextResponse.json(updateProduct);
  } catch (err) {
    return NextResponse.json(
      { msgErr: "Update product fail!" },
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
      },
      { status: 500 }
    );
  }
};
