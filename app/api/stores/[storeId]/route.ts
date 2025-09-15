import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name } = body as { name?: string };

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const result = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId,
            },
            data: {
                name,
            },
        });

        if (result.count === 0) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const result = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (result.count === 0) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


