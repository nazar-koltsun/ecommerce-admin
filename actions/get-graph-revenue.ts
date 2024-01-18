import prismadb from '@/lib/prismadb';

interface graphRevenuePropsType {
  name: string; 
  total: number;
}[];

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

  const graphRevenue: Array<{name: string, total: number}> = [
    {name: 'Jan', total: 0},
    {name: 'Feb', total: 0},
    {name: 'Mar', total: 0},
    {name: 'Apr', total: 0},
    {name: 'May', total: 0},
    {name: 'Jun', total: 0},
    {name: 'Jul', total: 0},
    {name: 'Aug', total: 0},
    {name: 'Sep', total: 0},
    {name: 'Oct', total: 0},
    {name: 'Nov', total: 0},
    {name: 'Dec', total: 0},
  ];

  graphRevenue.forEach(revenue => {
    revenue.total = monthlyRevenue[revenue.name] || 0;
  });

  return graphRevenue;
};

export default getGraphRevenue;
