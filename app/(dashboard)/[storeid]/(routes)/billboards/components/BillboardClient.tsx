'use client';

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface BillboardClientProps {
  billboards?: {
    id: string;
    label: string;
    imageUrl: string;
  }[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({billboards}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title="Billboards(0)"
          description="Manage your billboards here." 
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <ul>
        {billboards?.map(billboard => (
          <li key={billboard.id}>
            {billboard.label}
            <Image width={200} height={200} src={billboard.imageUrl} alt='Billboard image' />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/${billboard.id}`)}>
              Edit
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BillboardClient;