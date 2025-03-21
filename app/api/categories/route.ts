import prisma from "@/lib/prisma";
import { STATUS_PRODUCT } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url).searchParams;
    const query = url.get('q')?.trim() || "";
    const sortOrder = url.get('sortOrder') === "asc" ? "asc" : "desc";
    const status = url.get('status');
    const page = url.get('page') || "1";
    const pageSize = url.get('pageSize') || "10";

    let whereClause: any = {};
    const categoriesCount = await prisma.categories.count({});

    if (query) whereClause.name = { contains: query, mode: "insensitive" }
    if (status && status !== "ALL") whereClause.status = status as STATUS_PRODUCT;

    if (!query && !status) {
      const categories = await prisma.categories.findMany({
        include: { product: true },
        orderBy: { createdAt: sortOrder },
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
      });

      return NextResponse.json({ categories, categoriesCount });
    } else {
      const categories = await prisma.categories.findMany({
        where: whereClause,
        orderBy: { createdAt: sortOrder } as any,
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
      })
      return NextResponse.json({ categories, categoriesCount });
    }
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch categories", error: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, parentId, status } = await req.json();

    const create_category = await prisma.categories.create({
      data: {
        name,
        parentId: parentId || null,
        status,
      },
    });
    return NextResponse.json(create_category);
  } catch (error) {
    return NextResponse.json({ msg: "Failed to create category", error: error }, { status: 500 });
  }
};
