import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/BillboardClient";

const BillboardsPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;