import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 1
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ msg: "Failed to fetch newest products", error: error }, { status: 500 })
    }
}