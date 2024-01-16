import prismadb from '@/lib/prismadb';

const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: string]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.toLocaleString('default', { month: 'short' });

    for (const orderItem of order.orderItems) {
      monthlyRevenue[month] =
        (monthlyRevenue[month] || 0) + +orderItem.product.price;
    }
  }

  const graphRevenue: { [key: string]: number } = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  for (const data in graphRevenue) {
    graphRevenue[data] = monthlyRevenue[data] || 0;
  }

  return Object.entries(graphRevenue).map(([key, value]) => ({[key]: value}));
};

export default getGraphRevenue;
