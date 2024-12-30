import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sortOrder = url.searchParams.get("sortOrder") || "desc";
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const search = url.searchParams.get("search");
    const categoryId = url.searchParams.get("categoryId");

    // Validate sortOrder
    if (!["asc", "desc"].includes(sortOrder)) {
      throw new Error("Invalid sortOrder value");
    }

    // Validate sortBy
    const allowedSortByFields = [
      "createdAt",
      "updatedAt",
      "lowPrice",
      "highPrice",
    ];
    if (!allowedSortByFields.includes(sortBy)) {
      throw new Error("Invalid sortBy value");
    }

    // Build filters
    const whereClause: any = {};
    let products;

    if (categoryId) {
      whereClause.categoryId = Number(categoryId);
    }

    if (search) {
      whereClause.title = {
        contains: search.toLowerCase(),
      };
    }

    // Determine orderBy
    const orderBy =
      sortBy === "lowPrice"
        ? { price: "asc" }
        : sortBy === "highPrice"
        ? { price: "desc" }
        : { [sortBy]: sortOrder };

    if (!search && !categoryId) {
      products = await prisma.product.findMany({
        orderBy: orderBy as any,
        include: {
          category: {
            include: {
              parent: true,
            },
          },
          properties: true,
        },
      });
    } else {
      // Fetch products
      products = await prisma.product.findMany({
        where: whereClause,
        orderBy: orderBy as any,
        include: {
          category: {
            include: {
              parent: true,
            },
          },
          properties: true,
        },
      });
    }

    // Fallback for no products
    if (products.length === 0) {
      const fallbackProducts = await prisma.product.findMany({
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: true,
          properties: true,
        },
      });
      return NextResponse.json(fallbackProducts);
    }

    return NextResponse.json(products);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

export const POST = async (req: Request) => {
  try {
    const {
      title,
      description,
      image,
      price,
      brand,
      stock,
      categoryId,
      feature,
      properties,
    } = await req.json();

    const slug = slugify(title, { lower: true, strict: true });

    const dataCreate = await prisma.product.create({
      data: {
        title,
        description,
        image,
        price,
        brand,
        stock,
        categoryId,
        slug,
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
