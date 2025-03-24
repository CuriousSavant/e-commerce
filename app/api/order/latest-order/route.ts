import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { startOfDay, endOfDay } from "date-fns"

export const GET = async () => {
    try {
        const todayStart = startOfDay(new Date())
        const todayEnd = endOfDay(new Date())

        const products = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
            include: {
                user: true,
                address: true,
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch latest orders", error: error }, { status: 500 })
    }
}