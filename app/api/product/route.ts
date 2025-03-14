import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url).searchParams;
    const query = url.get("q")?.trim();
    const sortOrder = url.get("sortOrder") || "desc";
    const status = url.get("status");
    const categoryId = url.get("categoryId");
    const price = url.get("price");

    // Validate sortOrder
    if (!["asc", "desc"].includes(sortOrder)) {
      throw new Error("Invalid sortOrder value");
    }

    // Build filters
    let whereClause: any = {};
    let orderByClause: any = { createdAt: sortOrder }

    let products;

    if (query) whereClause.title = { contains: query, mode: "insensitive" };
    if (categoryId) whereClause.categoryId = Number(categoryId);
    if (price) {
      if (price === "low-high") orderByClause = { price: "asc" };
      else if (price === "high-low") orderByClause = { price: "desc" };
      else orderByClause;
    }

    if (status && status !== 'all') whereClause.status = status.toLowerCase() === "active" ? "ACTIVE" : "INACTIVE";

    if (!query && !categoryId && !status) {
      products = await prisma.product.findMany({
        orderBy: {
          createdAt: sortOrder,
        } as any,
        include: {
          category: {
            include: {
              parent: true,
            },
          },
          properties: true,
        },
      })
    } else {
      // Fetch products
      products = await prisma.product.findMany({
        where: whereClause,
        orderBy: orderByClause,
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

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Failed to fetch products", error: error }, { status: 500 });
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
    } = await req.json();

    const slug = slugify(title, { lower: true, strict: true });

    const createProduct = await prisma.product.create({
      data: {
        title,
        description,
        image,
        price,
        brand,
        stock,
        categoryId,
        slug,
      },
    });

    return NextResponse.json(createProduct);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create product", error: error, status: 500 });
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
  } catch (error) {
    return NextResponse.json({ msg: "Failed to delete products", error: error }, { status: 500 });
  }
};