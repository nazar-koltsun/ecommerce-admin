import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const resp = await prismadb.store.update({
      where: { 
        id: storeId ,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(resp);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }
    
    const resp = await prismadb.store.deleteMany({
      where: { 
        id: storeId,
        userId,
      },
    });

    return NextResponse.json(resp);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
