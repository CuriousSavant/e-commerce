import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const products = await prisma.product.findMany({
            where: {status: "ACTIVE",},
            orderBy: {createdAt: "desc"},
            take: 5,
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch latest products", error: error }, { status: 500 })
    }
}