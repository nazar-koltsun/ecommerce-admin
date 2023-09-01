import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse('BillboardId ID is required', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Billboard label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image url is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!billboardId) {
      return new NextResponse('BillboardId ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
