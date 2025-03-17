import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { startOfDay, endOfDay } from "date-fns"

export const GET = async (req: NextRequest) => {
    try {
        const todayStart = startOfDay(new Date())
        const todayEnd = endOfDay(new Date())

        const products = await prisma.product.findMany({
            where: {
                createdAt: {
                    gte: todayStart, // มากกว่าหรือเท่ากับ 00:00 น.
                    lte: todayEnd, // น้อยกว่าหรือเท่ากับ 23:59:59 น.
                },
            },
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch latest products", error: error }, { status: 500 })
    }
}