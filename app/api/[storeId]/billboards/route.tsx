import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthentivated', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Billboard label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image url is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if(!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        storeId,
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

