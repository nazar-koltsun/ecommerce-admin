'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './CellAction';
import { Image } from '@prisma/client';

export type ProductColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'action',
    cell: ({row}) => {
      const data = row.original;

      return <CellAction data={data} />;
    }
  }
];
