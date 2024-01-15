import prismadb from '@/lib/prismadb';

const getTotalSales = async (storeId: string) => {
  const paidSalesCount = await prismadb.order.count({
    where: {
      storeId: storeId,
      isPaid: true,
    },
  });

  return paidSalesCount;
}

export default getTotalSales;