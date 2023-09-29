'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './CellAction';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({row}) => {
      const data = row.original;

      return <div className='w-6 h-6 rounded-full' style={{backgroundColor: data.value}} />;
    }
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
