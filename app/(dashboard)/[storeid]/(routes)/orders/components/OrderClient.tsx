'use client';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderColumn, columns } from './Columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
  orders: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders(${orders?.length})`}
          description="Manage your Orders here."
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={orders} seachKey="products" />
    </>
  );
};

export default OrderClient;
