import {
  Box, TableCell, TableHead, TableRow, TableSortLabel,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Order } from '..';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'requestNumber',
    numeric: false,
    disablePadding: false,
    label: '#',
  },
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
    id: 'createdDate',
    numeric: false,
    disablePadding: false,
    label: 'Created Date',
  },
];

interface IProps {
  onSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
}

const Head: React.FC<IProps> = ({
  order, onSort,
}: IProps) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric || headCell.id === 'createdDate' ? 'right' : 'left'}
            padding={(headCell.disablePadding ? 'none' : 'normal') as any}
          >
            <TableSortLabel
              active={false}
              direction="asc"
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {'asc' ? (
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
