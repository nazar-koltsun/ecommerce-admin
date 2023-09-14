'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ApiList";

interface BillboardClientProps {
  billboards: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({billboards}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Billboards(${billboards?.length})`}
          description="Manage your billboards here." 
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={columns}
        data={billboards}
        seachKey="label"
      />
      <Heading title="Api" description="Api calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}

export default BillboardClient;