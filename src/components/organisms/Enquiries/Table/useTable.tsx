import { useLazyQuery } from '@apollo/client';
import * as React from 'react';
import { Order, TableItem } from '.';
import { Enquiry } from '../../../../models/enquiry';
import { Pagination } from '../../../../models/pagination';
import GET_ENQUIRIES from '../../../../queries/enquiries';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTable = () => {
  const [getTableItems, { data }] = useLazyQuery<{
    enquiries: Pagination<Enquiry>
  }>(GET_ENQUIRIES, {
    fetchPolicy: 'cache-and-network',
  });
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<'createdDate'>('createdDate');
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

  const handleChangePage = (action: 'Previous' | 'Next') => {
    const variables: any = {
      first: 1,
      after: undefined,
      before: undefined,
      last: undefined,
    };

    if (action === 'Previous') {
      variables.before = data?.enquiries.pageInfo.startCursor;
      variables.last = 2;
    } else {
      variables.after = data?.enquiries.pageInfo.endCursor;
    }

    getTableItems({
      variables,
    });
  };
  const handleOpenDrawer = (event: React.MouseEvent<unknown>, _tableItem: TableItem) => {
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

  return {
    data,
    order,
    orderBy,
    selectedRow,
    tableItems,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleEnquirySort,
    handleChangePage,
    handleSort,
  };
};

export default useTable;
