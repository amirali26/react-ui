import { ReportProblemOutlined } from '@mui/icons-material';
import {
  Box,
  Button, Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer, TableRow,
} from 'helpmycase-storybook/dist/components/External';
import * as React from 'react';
import { Enquiry as EnquiryType } from '../../../../models/enquiry';
import { RequestDto } from '../../../../models/request';
import convertToDateTime from '../../../../utils/datetime';
import descendingComparator from '../../../../utils/descendingComparator';
import history from '../../../../utils/routes/history';
import BigMessage from '../../../molecules/bigMessage';
import Drawer from '../../../molecules/Drawer';
import Enquiry from '../Enquiry';
import Head from './Head';
import Toolbar from './Toolbar';
import useTable from './useTable';

export type Order = 'asc' | 'desc';
export function getComparator<Key extends keyof never>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export type TableItem = RequestDto & {
  enquiry: EnquiryType,
  topic: string,
}

const Table: React.FC = () => {
  const {
    data,
    order,
    orderBy,
    selectedRow,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSort,
    handleChangePage,
  } = useTable();

  const rows = data?.enquiries.nodes.map((e) => ({
    ...e.request,
    id: e.id,
    enquiry: { ...e },
    topic: e.request.topic.name,
    name: e.request.client.name,
    phoneNumber: e.request.client.phoneNumber,
    email: e.request.client.email,
  })) || [];

  return (
    <Box style={{ width: '100%' }}>
      {rows?.length > 0
        ? (
          <>
            <Paper style={{ width: '100%' }}>
              <Toolbar getEnquiries={getTableItems} />
              <TableContainer>
                <MuiTable
                  style={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <Head
                    order={order}
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                  <TableBody style={{ cursor: 'pointer' }}>
                    {rows.map((row: TableItem) => (
                      <TableRow
                        hover
                        onClick={(event) => handleOpenDrawer(event, row)}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="left">{row.topic}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">
                          {row.phoneNumber}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="right">
                          {convertToDateTime(row.createdDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </MuiTable>
              </TableContainer>
              <div style={{
                boxSizing: 'border-box',
                padding: '16px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              >
                <Button
                  onClick={() => handleChangePage('Previous')}
                  disabled={!data?.enquiries.pageInfo.hasPreviousPage}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleChangePage('Next')}
                  disabled={!data?.enquiries.pageInfo.hasNextPage}
                >
                  Next
                </Button>
              </div>
            </Paper>
            <Drawer
              onClose={handleCloseDrawer}
              open={Boolean(selectedRow)}
              onBackdropClick={handleCloseDrawer}
            >
              {
                selectedRow?.id
                && (
                  <Enquiry
                    id={selectedRow?.id}
                    enquiry={selectedRow}
                    handleCallback={handleCloseDrawer}
                  />
                )
              }
            </Drawer>
          </>
        )
        : (
          <BigMessage
            icon={<ReportProblemOutlined />}
            title="No Enquiries Found"
            subtitle="Your organisation does not currently have any enquiries"
            buttonProps={{
              children: 'View All Requests',
              onClick: () => history.push('/dashboard'),
            }}
          />
        )}

    </Box>
  );
};

export default Table;
