import { useLazyQuery } from '@apollo/client';
import * as React from 'react';
import { Order, TableItem } from '.';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { Enquiry } from '../../../../models/enquiry';
import GET_ENQUIRIES from '../../../../queries/enquiries';

const useTable = () => {
  const sb = useHelpmycaseSnackbar();
  const [getTableItems, { data }] = useLazyQuery<{
    enquiries: Enquiry[]
  }>(GET_ENQUIRIES, {
    fetchPolicy: 'cache-and-network',
  });
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<'createdDate'>('createdDate');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [selectedRow, setSelectedRow] = React.useState<Enquiry>();
  const [tableItems, setTableItems] = React.useState<string>();

  React.useEffect(() => {
    getTableItems();
  }, []);

  const handleEnquirySort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableItem,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy('createdDate');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDrawer = (event: React.MouseEvent<unknown>, _tableItem: TableItem) => {
    console.log(_tableItem);
    setSelectedRow(_tableItem.enquiry);
  };

  const handleCloseDrawer = () => {
    setSelectedRow(undefined);
    setTableItems(undefined);
  };

  const handleSort = () => {
    setTableItems(selectedRow?.id);
    setSelectedRow(undefined);
  };

  const rows = data?.enquiries.map((e) => ({
    ...e.request,
    id: e.id,
    enquiry: { ...e },
    topic: e.request.topic.name,
  })) || [];

  return {
    rows,
    order,
    orderBy,
    page,
    rowsPerPage,
    selectedRow,
    tableItems,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleEnquirySort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  };
};

export default useTable;
