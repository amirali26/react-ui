import { ReportProblemOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from 'helpmycase-storybook/dist/components/External';
import * as React from 'react';
import { Request, RequestDto } from '../../../../models/request';
import convertToDateTime from '../../../../utils/datetime';
import descendingComparator from '../../../../utils/descendingComparator';
import stableSort from '../../../../utils/stableSort';
import BigMessage from '../../../molecules/bigMessage';
import Drawer from '../../../molecules/Drawer';
import Enquiry from '../../Enquiries/Enquiry';
import Case from '../Case';
import Head from './Head';
import Toolbar from './Toolbar';
import history from '../../../../utils/routes/history';
import useTable from '../../../../hooks/useTable';
import GET_REQUESTS from '../../../../queries/requests';

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

const Table: React.FC = () => {
  const {
    data,
    order,
    selectedRow,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSort,
    handleChangePage,
  } = useTable<Request>(GET_REQUESTS);
  const [enquiryId, setEnquiryId] = React.useState<string>();

  const handleEnquiryClick = () => {
    handleCloseDrawer();
    setEnquiryId(selectedRow?.id);
  };

  const rows = data?.requests ? data.requests.nodes.map((r) => ({
    ...r,
    topic: r.topic.name,
    email: r.client.email,
    name: r.client.name,
    phoneNumber: r.client.phoneNumber,
  })) : [];

  return (
    <Box style={{ width: '100%' }}>
      {rows?.length > 0
        ? (
          <>
            <Paper style={{ width: '100%' }}>
              <Toolbar getRequests={getTableItems} />
              <TableContainer>
                <MuiTable
                  style={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <Head
                    order={order}
                    onSort={handleSort}
                  />
                  <TableBody style={{ cursor: 'pointer' }}>
                    {rows.map((row: RequestDto) => (
                      <TableRow
                        hover
                        onClick={(event) => {
                          const r = data?.requests.nodes.find((_r) => _r.id === row.id);
                          if (r) {
                            handleOpenDrawer(event, r);
                          }
                        }}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="left">{row.topic}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">
                          {row.phoneNumber}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">
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
                  disabled={!data?.requests.pageInfo.hasPreviousPage}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleChangePage('Next')}
                  disabled={!data?.requests.pageInfo.hasNextPage}
                >
                  Next
                </Button>
              </div>
            </Paper>
            <Drawer onClose={handleCloseDrawer} open={Boolean(selectedRow)}>
              {
                selectedRow
                && (
                  <Case
                    {...rows.find((r) => r.id === selectedRow.id) as RequestDto}
                    handleEnquiryClick={handleEnquiryClick}
                  />
                )
              }
            </Drawer>
            <Drawer
              onClose={handleCloseDrawer}
              open={Boolean(enquiryId)}
              onBackdropClick={handleCloseDrawer}
            >
              {
                enquiryId
                && <Enquiry id={enquiryId} handleCallback={handleCloseDrawer} />
              }
            </Drawer>
          </>
        )
        : (
          <BigMessage
            icon={<ReportProblemOutlined />}
            title="No Requests"
            subtitle="Unfortunately, we are unable to find any requests available to you at this time."
            buttonProps={{
              children: 'View All Enquiries',
              onClick: () => history.push('/dashboard/enquiries'),
            }}
          />
        )}

    </Box>
  );
};

export default Table;
