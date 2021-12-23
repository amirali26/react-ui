import { ReportProblemOutlined } from '@mui/icons-material';
import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from 'helpmycase-storybook/dist/components/External';
import * as React from 'react';
import { RequestDto } from '../../../../models/request';
import convertToDateTime from '../../../../utils/datetime';
import descendingComparator from '../../../../utils/descendingComparator';
import stableSort from '../../../../utils/stableSort';
import BigMessage from '../../../molecules/bigMessage';
import Drawer from '../../../molecules/Drawer';
import Enquiry from '../../Enquiries/Enquiry';
import Case from '../Case';
import Head from './Head';
import Toolbar from './Toolbar';
import useTable from './useTable';
import history from '../../../../utils/routes/history';

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
    page,
    rows,
    order,
    orderBy,
    rowsPerPage,
    selectedRow,
    enquiry,
    getRequests,
    handleOpenDrawer,
    handleCloseDrawer,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEnquiryClick,
  } = useTable();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Box style={{ width: '100%' }}>
      {rows?.length > 0
        ? (
          <>
            <Paper style={{ width: '100%' }}>
              <Toolbar getRequests={getRequests} />
              <TableContainer>
                <MuiTable
                  style={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <Head
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody style={{ cursor: 'pointer' }}>
                    {stableSort<RequestDto>(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: RequestDto, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
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
                            <TableCell align="left">{row.topic}</TableCell>
                            <TableCell align="left">
                              {convertToDateTime(row.createdDate)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 33 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </MuiTable>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <Drawer onClose={handleCloseDrawer} open={Boolean(selectedRow)}>
              {
                selectedRow
                && <Case {...selectedRow} handleEnquiryClick={handleEnquiryClick} />
              }
            </Drawer>
            <Drawer
              onClose={handleCloseDrawer}
              open={Boolean(enquiry)}
              onBackdropClick={handleCloseDrawer}
            >
              {
                enquiry
                && <Enquiry id={enquiry} handleCallback={handleCloseDrawer} />
              }
            </Drawer>
          </>
        )
        : (
          <BigMessage
            icon={<ReportProblemOutlined />}
            title="There are currently no requests"
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
