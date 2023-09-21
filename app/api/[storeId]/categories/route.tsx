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

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthentivated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Category name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        storeId,
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const { storeId } = params;

//     if (!storeId) {
//       return new NextResponse('Store ID is required', { status: 400 });
//     }

//     const billboards = await prismadb.billboard.findMany({
//       where: {
//         storeId,
//       },
//     });

//     return NextResponse.json(billboards);
//   } catch (err) {
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

