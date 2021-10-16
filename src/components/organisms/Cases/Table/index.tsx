import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody, TableCell,
  TableContainer,
  TablePagination, TableRow,
} from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import * as React from 'react';
import { DateTime } from 'luxon';
import descendingComparator from '../../../../utils/descendingComparator';
import stableSort from '../../../../utils/stableSort';
import Head from './Head';
import Toolbar from './Toolbar';
import useTable from './useTable';

export type Order = 'asc' | 'desc';
export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
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
    getRequests,
    handleClick,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTable();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box style={{ width: '100%' }}>
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
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <div style={{
                          borderRadius: '5px',
                          backgroundColor: theme.palette.success.main,
                          padding: '8px',
                          color: 'white',
                          textAlign: 'center',
                        }}
                        >
                          {row.status}
                        </div>
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        +44
                        {' '}
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.case}</TableCell>
                      <TableCell align="left">
                        {DateTime.fromSeconds(+row.createdDate).toLocaleString()}
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Table;
