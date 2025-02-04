import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const brands = await prisma.brands.findMany();
        return NextResponse.json(brands);
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ msg: err }, { status: 500 })
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
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ msg: err }, { status: 500 })
    }
}