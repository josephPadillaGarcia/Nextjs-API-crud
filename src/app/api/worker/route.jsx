import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json()
        const res = await prisma.worker.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(res),{
            headers: {
                "Content-Type":"application/json"
            },
            status:201
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}

export async function GET() {
    try {
        const res = await prisma.worker.findMany();
        return NextResponse.json(
            {data:res},
            {status: 200}
        )
    } catch (error) {
        return new NextResponse(error.message, {status: 500});
    }
}

export async function PUT(request){
    const data = await request.json();

    try {
       const res = await prisma.worker.updateMany({
           data: data
       });
       if(!res){
           return new NextResponse(`ERROR EN LA ACTUALIZACION`, {status: 404});
       }
       return NextResponse.json(`Todos los trabajadpres tiene 0 puntos`, {status: 200})
    } catch (error) {
       return new NextResponse(error.message, {status: 500});  
    }
}