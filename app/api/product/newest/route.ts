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
        console.error('Error fetching newest products:', error)
        return NextResponse.json({ status: 500, statusText: 'Internal server error' })
    }
}