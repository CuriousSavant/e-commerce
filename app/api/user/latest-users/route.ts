import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { startOfDay, endOfDay } from "date-fns"

export const GET = async () => {
    try {
        const todayStart = startOfDay(new Date())
        const todayEnd = endOfDay(new Date())

        const users = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: todayStart, // >= เวลาเริ่มต้นของวัน
                    lte: todayEnd, // <= เวลาสิ้นสุดของวัน
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch latest users", error: error }, { status: 500 })
    }
}