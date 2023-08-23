import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid } = params;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!storeid) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const resp = await prismadb.store.update({
      where: { 
        id: storeid ,
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
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid } = params;
    
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    if (!storeid) {
      return new NextResponse('Store ID is required', { status: 400 });
    }
    
    const resp = await prismadb.store.deleteMany({
      where: { 
        id: storeid,
        userId,
      },
    });

    return NextResponse.json(resp);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
