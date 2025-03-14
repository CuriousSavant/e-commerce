import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url).searchParams;
        const query = url.get('q')?.trim() || "";
        const sortOrder = url.get('sortOrder') === "asc" ? "asc" : "desc";

        if (!query) {
            const brands = await prisma.brands.findMany({
                orderBy: { createdAt: sortOrder }
            });

            return NextResponse.json(brands);
        } else {
            const brands = await prisma.brands.findMany({
                where: {
                    name: { contains: query, mode: "insensitive" }
                },
                orderBy: {
                    createdAt: sortOrder,
                } as any,
            })
            return NextResponse.json(brands);
        }
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch brands", error: error }, { status: 500 })
    }
}

export const POST = async (req: Request) => {
    const { name, image } = await req.json();
    try {
        const create_brands = await prisma.brands.create({
            data: {
                name,
                image,
            }
        })
        return NextResponse.json(create_brands);
    } catch (error) {
        return NextResponse.json({ msg: "Failed to create brand", error: error }, { status: 500 })
    }
}