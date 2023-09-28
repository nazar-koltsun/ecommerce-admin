'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ColorColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ApiList";

interface ColorClientProps {
  colors: ColorColumn[]
}

const ColorClient: React.FC<ColorClientProps> = ({colors}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Colors(${colors?.length})`}
          description="Manage your colors here." 
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={columns}
        data={colors}
        seachKey="name"
      />
      <Heading title="Api" description="Api calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}

export default ColorClient;