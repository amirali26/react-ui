import { useLazyQuery } from '@apollo/client';
import * as React from 'react';
import { Order } from '.';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { Request } from '../../../../models/request';
import GET_REQUESTS from '../../../../queries/requests';

const useTable = () => {
  const sb = useHelpmycaseSnackbar();
  const [getRequests, { data }] = useLazyQuery<{
    requestSubmissions: Request[]
  }>(GET_REQUESTS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => sb.trigger('Successfully retrieved latest cases', 'success'),
  });
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Request>('createdDate');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [modalInformation, setModalInformation] = React.useState<string | undefined>();

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

  const handleOpenModal = (event: React.MouseEvent<unknown>, requestId: string) => {
    // We want to open a modal here
    setModalInformation(requestId);
  };

  const handleCloseModal = () => setModalInformation(undefined);

  return {
    rows: data?.requestSubmissions || [],
    order,
    orderBy,
    page,
    rowsPerPage,
    modalInformation,
    getRequests,
    handleOpenModal,
    handleCloseModal,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useTable;
