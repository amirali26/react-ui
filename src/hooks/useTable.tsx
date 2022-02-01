import { DocumentNode, useLazyQuery } from '@apollo/client';
import * as React from 'react';
import { Order } from '../components/organisms/Enquiries/Table';
import { Pagination } from '../models/pagination';

const useTable = <T extends { id: string }>(query: DocumentNode) => {
  const [getTableItems, { data }] = useLazyQuery<{
    [key: string]: Pagination<T>
  }>(query, {
    fetchPolicy: 'cache-and-network',
  });
  const [order, setOrder] = React.useState<Order>('asc');
  const [selectedRow, setSelectedRow] = React.useState<T>();
  const [tableItems, setTableItems] = React.useState<string>();

  React.useEffect(() => {
    getTableItems();
  }, []);

  const handleEnquirySort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    console.log('Handle Sort');
  };

  const handleChangePage = (action: 'Previous' | 'Next') => {
    if (!data) return;
    const variables: any = {
      first: 1,
      after: undefined,
      before: undefined,
      last: undefined,
    };

    if (action === 'Previous') {
      variables.before = data[0].pageInfo.startCursor;
      variables.last = 10;
    } else {
      variables.after = data[0].pageInfo.endCursor;
    }

    getTableItems({
      variables,
    });
  };
  const handleOpenDrawer = (event: React.MouseEvent<unknown>, _tableItem: T) => {
    setSelectedRow(_tableItem);
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
