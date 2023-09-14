'use client';
import { BillboardColumn } from './Columns';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import AlertModal from '@/components/modals/AlertModal';

interface SellActionProps {
  data: BillboardColumn;
}

const SellAction: React.FC<SellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success('Billboard route copied to clipboard');
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/billboards/${data.id}`);
  };

  const onDeleteBillboard = async () => {
    try {
      setOpen(true);
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${data.id}`
      );
      router.refresh();
      toast.success('Billboard deleted.');
    } catch (error) {
      toast.error(
        'Make sute that you are deleted all categories using the billboard first.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteBillboard}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 w-4 h-4" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 w-4 h-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SellAction;
