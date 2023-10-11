import prismadb from "@/lib/prismadb";
import ProductClient from "./components/ProductClient";
import { ProductColumn } from "./components/Columns";
import { format } from 'date-fns';
import { formater } from "@/lib/utils";

const ProductsPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedProducts: ProductColumn[] = products.map(product => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formater.format(+product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
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