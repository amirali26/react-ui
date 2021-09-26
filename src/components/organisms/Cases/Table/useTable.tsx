import * as React from 'react';
import { useLazyQuery } from '@apollo/client';
import { Order } from '.';
import GET_REQUESTS from '../../../../queries/requests';
import { Request } from '../../../../models/request';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';

const useTable = () => {
  const sb = useHelpmycaseSnackbar();
  const [getRequests, { called, loading, data }] = useLazyQuery<{
    requestSubmissions: Request[]
  }>(GET_REQUESTS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => sb.trigger('Successfully retrieved latest cases', 'success'),
  });
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Request>('createdDate');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    getRequests();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Request,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleClick = (event: React.MouseEvent<unknown>, requestId: string) => {
    console.log(requestId);
  };

  return {
    rows: data?.requestSubmissions || [],
    order,
    orderBy,
    page,
    dense,
    rowsPerPage,
    getRequests,
    handleClick,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
  };
};

export default useTable;
