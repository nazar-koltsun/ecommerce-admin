import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, categoryId } = params;

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Category name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
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

    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, categoryId } = params;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
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

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
