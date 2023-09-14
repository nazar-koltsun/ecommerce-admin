'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './CellAction';

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
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
