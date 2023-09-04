import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/BillboardClient";
import { BillboardColumn } from "./components/Columns";
import { format } from 'date-fns'

const BillboardsPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedBillboards: BillboardColumn[] = billboards.map(billboard => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format (billboard.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formatedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;