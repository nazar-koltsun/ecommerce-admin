import prismadb from '@/lib/prismadb';

const getSalesCount = async (storeId: string) => {
  const paidSalesCount = await prismadb.order.count({
    where: {
      storeId: storeId,
      isPaid: true,
    },
  });

  return paidSalesCount;
}

export default getSalesCount;