import { DocumentNode, useLazyQuery } from '@apollo/client';
import { RowClickedEvent } from 'ag-grid-community';
import { debounce } from 'lodash';
import * as React from 'react';
import { Pagination } from '../models/pagination';

const useTable = <T extends { id: string }>(query: DocumentNode) => {
  const [getTableItems, { data, loading }] = useLazyQuery<{
    [key: string]: Pagination<T>
  }>(query, {
    fetchPolicy: 'cache-and-network',
  });
  const [selectedRow, setSelectedRow] = React.useState<T>();
  const [tableItems, setTableItems] = React.useState<string>();
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      getTableItems();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleEnquirySort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    console.log('Handle Sort');
  };

  const handleChangePage = (action: 'Previous' | 'Next') => {
    if (!data) return;
    const variables: Record<string, any> = {
      first: 1,
      after: undefined,
      before: undefined,
      last: undefined,
      searchTerm,
    };

    if (action === 'Previous') {
      variables.before = Object.values(data)[0].pageInfo.startCursor;
      variables.last = 10;
    } else {
      variables.after = Object.values(data)[0].pageInfo.endCursor;
    }

    getTableItems({
      variables,
    });
  };
  const handleSearch = debounce((searchTermInput: string) => {
    const variables: Record<string, string> = {
      searchTermInput,
    };
    getTableItems({
      variables,
    });
    setSearchTerm(searchTermInput);
  }, 250);

  const handleOpenDrawer = (event: RowClickedEvent) => {
    setSelectedRow(event.data);
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
    selectedRow,
    tableItems,
    loading,
    searchTerm,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleEnquirySort,
    handleChangePage,
    handleSort,
    handleSearch,
  };
};

export default useTable;
