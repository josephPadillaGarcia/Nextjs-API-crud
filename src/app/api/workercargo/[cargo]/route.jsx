import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request, {params}) {
    //const id = parseInt(params.id);
    const cargo = params.cargo;
    //console.log(params);
    //return new NextResponse(`respuesta`, {status: 200});

    try {
        const res = await prisma.worker.findMany({
            //where: {idworker: id},
            where: {cargo: cargo},
        });
        if(!res){
            return new NextResponse(`No se tiene trabajadores con el cargo ${name}.`, {status: 404})
        }
        return NextResponse.json(res)
    } catch (error) {
        return new NextResponse(error.message, {status: 500});        
    }
}