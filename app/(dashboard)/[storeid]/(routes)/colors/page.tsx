import prismadb from "@/lib/prismadb";
import ColorClient from "./components/ColorClient";
import { ColorColumn } from "./components/Columns";
import { format } from 'date-fns'

const ColorsPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedColors: ColorColumn[] = colors.map(color => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format (color.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formatedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;