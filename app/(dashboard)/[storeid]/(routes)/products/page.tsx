import prismadb from "@/lib/prismadb";
import ProductClient from "./components/ProductClient";
import { ProductColumn } from "./components/Columns";
import { format } from 'date-fns'

const ProductsPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedProducts: ProductColumn[] = products.map(product => ({
    id: product.id,
    name: product.name,
    createdAt: format (product.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={formatedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;