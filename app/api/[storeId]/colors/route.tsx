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
      return new NextResponse('Color name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Color value is required', { status: 400 });
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

    const color = await prismadb.color.create({
      data: {
        storeId,
        name,
        value,
      },
    });

    return NextResponse.json(color);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

