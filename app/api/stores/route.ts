import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(reg: Request) {
  try {
    const { userId } = auth();
    const body = await reg.json();

    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);

  } catch (err) {
    console.error('[STORES_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

