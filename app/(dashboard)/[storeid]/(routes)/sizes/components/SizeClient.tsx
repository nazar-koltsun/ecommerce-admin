'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SizeColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ApiList";

interface SizeClientProps {
  sizes: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({sizes}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Sizes(${sizes?.length})`}
          description="Manage your sizes here." 
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={columns}
        data={sizes}
        seachKey="name"
      />
      <Heading title="Api" description="Api calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  )
}

export default SizeClient;