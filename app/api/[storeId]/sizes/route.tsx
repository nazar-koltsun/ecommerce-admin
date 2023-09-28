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

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthentivated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Size name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Size value is required', { status: 400 });
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

    const size = await prismadb.size.create({
      data: {
        storeId,
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const size = await prismadb.size.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(size);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

