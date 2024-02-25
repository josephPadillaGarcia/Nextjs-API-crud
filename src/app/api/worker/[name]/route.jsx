import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request, {params}) {
    //const id = parseInt(params.id);
    const name = params.name;
    console.log(params);
    //return new NextResponse(`respuesta`, {status: 200});

    try {
        const res = await prisma.worker.findMany({
            //where: {idworker: id},
            where: {nombre: name},
        });
        if(!res){
            return new NextResponse(`El trabajador ${name} no esta registrado.`, {status: 404})
        }
        return NextResponse.json(res)
    } catch (error) {
        return new NextResponse(error.message, {status: 500});        
    }
}