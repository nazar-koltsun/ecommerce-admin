import prismadb from "@/lib/prismadb";
import SizeClient from "./components/SizeClient";
import { SizeColumn } from "./components/Columns";
import { format } from 'date-fns'

const SizesPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedSizes: SizeColumn[] = sizes.map(size => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format (size.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formatedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;