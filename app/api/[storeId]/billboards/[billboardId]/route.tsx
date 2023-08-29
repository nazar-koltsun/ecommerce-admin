import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { billboardId } = params;

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
      return new NextResponse('BillboardId ID is required', { status: 400 });
    }

    const resp = await prismadb.billboard.update({
      where: {
        id: billboardId,
        store: {
          userId,
        },
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(resp);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { billboardId } = params;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!billboardId) {
      return new NextResponse('BillboardId ID is required', { status: 400 });
    }

    const resp = await prismadb.billboard.delete({
      where: {
        id: billboardId,
        store: {
          userId,
        },
      },
    });

    return NextResponse.json(resp);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

