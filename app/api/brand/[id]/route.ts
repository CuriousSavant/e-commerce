import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const brands_get_by_id = await prisma.brands.findMany({
            where: { id: Number(params.id) }
        })
        return NextResponse.json(brands_get_by_id);
    } catch (err: any) {
        return NextResponse.json({ msg: err }, { status: 500 })
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { name, image } = await req.json();
    try {
        const update_brand = await prisma.brands.update({
            data: {
                name,
                image,
            },
            where: { id: Number(params.id) },
        });
        return NextResponse.json(update_brand);
    } catch (err: any) {
        return NextResponse.json({ msg: err }, { status: 500 });
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const delete_brand = await prisma.brands.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(delete_brand);
    } catch (err: any) {
        return NextResponse.json({ msg: err }, { status: 500 });
    }
}