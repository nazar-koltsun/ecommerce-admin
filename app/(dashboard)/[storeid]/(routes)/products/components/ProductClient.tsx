'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ApiList";

interface ProductClientProps {
  products: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({products}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Products(${products?.length})`}
          description="Manage your products here." 
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={columns}
        data={products}
        seachKey="name"
      />
      <Heading title="Api" description="Api calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}

export default ProductClient;