import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sortOrder = url.searchParams.get("sortOrder") || "desc";
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const search = url.searchParams.get("search");

    let products;

    if (sortOrder !== "asc" && sortOrder !== "desc") {
      throw new Error("Invalid SortOrder value");
    }

    const searchFilter = search
      ? {
          where: {
            title: {
              contains: search.toLowerCase(),
            },
          },
        }
      : undefined;

    switch (sortBy) {
      case "lowPrice":
        products = await prisma.product.findMany({
          ...searchFilter,
          orderBy: { price: "asc" },
        });
        break;
      case "highPrice":
        products = await prisma.product.findMany({
          ...searchFilter,
          orderBy: { price: "desc" },
        });
        break;
      default:
        products = await prisma.product.findMany({
          ...searchFilter,
          orderBy: { [sortBy]: sortOrder },
        });
        break;
    }

    if (products.length === 0) {
      products = await prisma.product.findMany({
        take: 5,
        orderBy: { [sortBy]: sortOrder },
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: error }, { status: 500 });
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
      feature,
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
        slug,
        feature: {
          create: feature.map((item: any) => ({
            desctiption: item.description,
          })),
        },
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
