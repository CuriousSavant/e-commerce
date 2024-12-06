import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    if (sortOrder !== "asc" && sortOrder !== "desc") {
      throw new Error("Invalid SortOrder value");
    }

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: sortOrder,
      },
      include: { orderItem: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export const POST = async (req: Request) => {
  try {
    const {
      title,
      description,
      image,
      price,
      category,
      brand,
      stock,
      categoryId,
      productProperties,
    } = await req.json();

    const slug = slugify(title, { lower: true, strict: true });

    const dataCreate = await prisma.product.create({
      data: {
        title,
        description,
        image,
        price,
        category,
        brand,
        stock,
        categoryId,
        productProperty: productProperties,
        slug,
      },
    });

    return NextResponse.json(dataCreate);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msgErr: err, status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { slugs } = await req.json();
    if (Array.isArray(slugs) && slugs.length > 0) {
      const deleteMaryProduct = await prisma.product.deleteMany({
        where: {
          slug: { in: slugs },
        },
      });
      return NextResponse.json(deleteMaryProduct);
    }
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};
