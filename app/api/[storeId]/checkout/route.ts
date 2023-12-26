import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

const coorsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: coorsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = params;
  const { productsIds } = await req.json();

  if (!productsIds || productsIds.length === 0) {
    return new NextResponse('Product ids are required', { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productsIds,
      },
    },
  });

  const linseItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    linseItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: +product.price * 100,
      },
      quantity: 1,
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId,
      isPaid: false,
      orderItems: {
        create: productsIds.map((productId: string) => ({
          product: { connect: { id: productId } },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: linseItems,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTENT_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTENT_URL}/catr?cancel=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: coorsHeaders });
}
