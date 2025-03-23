import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { startOfDay, endOfDay } from "date-fns"
import { SortType } from "@/components/admin/users/types/filter-sort-search";

export const GET = async (req: NextRequest) => {
    try {
        const sortOrder = new URL(req.url).searchParams.get("sortOrder") || "asc";

        const todayStart = startOfDay(new Date())
        const todayEnd = endOfDay(new Date())

        // หาผู้ใช้ที่ลงชื่อเข้าใช้ภายในวันนี้
        const users = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: todayStart, // มากกว่าหรือเท่ากับ 00:00 น.
                    lte: todayEnd, // น้อยกว่าหรือเท่ากับ 23:59:59 น.
                },
            },
            orderBy: {
                createdAt: sortOrder as SortType,
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch latest users", error: error }, { status: 500 })
    }
}