import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/CategoryClient";
import { CategoryColumn } from "./components/Columns";
import { format } from 'date-fns'

const CategoriesPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedCategories: CategoryColumn[] = categories.map(category => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format (category.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formatedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;