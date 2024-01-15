import prismadb from '@/lib/prismadb';

const getProductsCount = async (storeId: string) => {
  const paidSalesCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return paidSalesCount;
}

export default getProductsCount;