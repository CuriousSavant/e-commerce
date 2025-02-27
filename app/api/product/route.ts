import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url).searchParams;
    const query = url.get("q");
    const sortOrder = url.get("sortOrder") || "desc";
    const status = url.get("status");
    const categoryId = url.get("categoryId");
    const price = url.get("price");

    // Validate sortOrder
    if (!["asc", "desc"].includes(sortOrder)) {
      throw new Error("Invalid sortOrder value");
    }

    // Build filters
    const whereClause: any = {};
    let orderByClause: any = { createdAt: sortOrder }

    let products;

    if (query) whereClause.title = { contains: query.trim() };
    if (categoryId) whereClause.categoryId = Number(categoryId);
    if (price) {
      if (price === "low-high") orderByClause = { price: "asc" };
      else if (price === "high-low") orderByClause = { price: "desc" };
      else orderByClause;
    }

    if (status && status !== 'all') {
      whereClause.status = status.toLowerCase() === "active" ? "ACTIVE" : "INACTIVE";
    }
    console.log("where:", whereClause, "orderBy:", orderByClause)

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

    // เมื่อผู้ใช้ search แต่หาสินค้าที่ตรงกับ query ที่ส่งมาไม่ได้จะทำการคืนสินค้าเริ่มต้นไปให้
    // if (products.length === 0) {
    //   const fallbackProducts = await prisma.product.findMany({
    //     orderBy: { createdAt: sortOrder } as any,
    //     include: {
    //       category: true,
    //       properties: true,
    //     },
    //   });
    //   return NextResponse.json(fallbackProducts);
    // }

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