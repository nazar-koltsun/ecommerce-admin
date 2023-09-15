'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ApiList";

interface CategoryClientProps {
  categories: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({categories}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Categories(${categories?.length})`}
          description="Manage your categories here." 
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={columns}
        data={categories}
        seachKey="name"
      />
      <Heading title="Api" description="Api calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categorieId" />
    </>
  )
}

export default CategoryClient;