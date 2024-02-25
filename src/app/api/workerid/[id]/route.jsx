import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request, {params}){
    const id = parseInt(params.id);

    try {
        const res = await prisma.worker.delete({
            where: {idworker:id}
        });
        return NextResponse.json({message: res}, {status:200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500});
    }

}

export async function PUT(request, {params}){
     const id = parseInt(params.id);
     const data = await request.json();

     try {
        const res = await prisma.worker.update({
            where: {idworker: id},
            data: data
        });
        if(!res){
            return new NextResponse(`Trabajador no encontrado`, {status: 404});
        }
        return NextResponse.json(`Trabajador Actualizado correctamente`, {status: 200})
     } catch (error) {
        return new NextResponse(error.message, {status: 500});  
     }
}
