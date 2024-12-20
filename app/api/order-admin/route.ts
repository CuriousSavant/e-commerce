import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                user: true,
            }
        })
        return NextResponse.json(orders)
    } catch (err) {
        return NextResponse.json({ msg: err }, { status: 500 })
    }
}