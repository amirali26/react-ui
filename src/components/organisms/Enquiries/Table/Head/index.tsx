import {
  Box, TableCell, TableHead, TableRow, TableSortLabel,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Order, TableItem } from '..';

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableItem;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'topic',
    numeric: false,
    disablePadding: false,
    label: 'Topic',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'topic',
    numeric: false,
    disablePadding: false,
    label: 'Topic',
  },
  {
    id: 'createdDate',
    numeric: false,
    disablePadding: false,
    label: 'Created Date',
  },
];

interface IProps {
  onSort: (event: React.MouseEvent<unknown>, property: keyof TableItem) => void;
  order: Order;
  orderBy: string;
}

const Head: React.FC<IProps> = ({
  order, orderBy, onSort,
}: IProps) => {
  const createSortHandler = (property: keyof TableItem) => (event: React.MouseEvent<unknown>) => {
    onSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={(headCell.disablePadding ? 'none' : 'normal') as any}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span">
                  {order === 'desc' ? '' : ''}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Head;
