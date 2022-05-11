import { GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import useTable from '../../../../hooks/useTable';
import { Enquiry as EnquiryType } from '../../../../models/enquiry';
import { RequestDto } from '../../../../models/request';
import GET_ENQUIRIES from '../../../../queries/enquiries';
import { convertToDateTimeShort } from '../../../../utils/datetime';
import Drawer from '../../../molecules/Drawer';
import EnquiryAndRequest from '../../EnquiryAndRequest';
import ColumnDefs, { DefaultColDef } from './columnDefinitions';

const Table: React.FC = () => {
  const gridRef = React.useRef<GridReadyEvent>();
  const {
    data,
    selectedRow,
    handleSearch,
    loading,
    searchTerm,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSort,
    handleChangePage,
  } = useTable<EnquiryType>(GET_ENQUIRIES);

  const rows: () => {
    [props: string]: unknown,
    request: RequestDto,
  }[] = React.useCallback(
    () => data?.enquiries.nodes.map((e) => ({
      request: {
        requestNumber: e.request.requestNumber,
        topic: e.request.topic.name,
        id: e.request.id,
        name: e.request.client.name,
        phoneNumber: e.request.client.phoneNumber,
        email: e.request.client.email,
        description: e.request.description,
        createdDate: e.request.createdDate,
      },
      id: e.request.id,
      requestNumber: e.request.requestNumber,
      enquiry: { ...e },
      topic: e.request.topic.name,
      name: e.request.client.name,
      phoneNumber: e.request.client.phoneNumber,
      email: e.request.client.email,
      createdDate: convertToDateTimeShort(e.request.createdDate),
    })) || [], [data?.enquiries?.nodes],
  );

  return (
    <div style={{ width: '100%' }}>
      <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 289px)' }}>
        <AgGridReact
          onGridReady={(gr) => {
            gr.api.sizeColumnsToFit();
            gridRef.current = gr;
          }}
          rowData={rows()} // Row Data for Rows
          defaultColDef={DefaultColDef}
          columnDefs={ColumnDefs} // Column Defs for Columns
          sideBar
          onToolPanelVisibleChanged={() => {
            gridRef.current?.api.sizeColumnsToFit();
          }}
          onDisplayedColumnsChanged={() => {
            gridRef.current?.api.sizeColumnsToFit();
          }}
          onRowClicked={handleOpenDrawer}
          animateRows
          onCellClicked={() => { console.log('Hello World'); }}
        />
      </div>
      <Drawer
        onClose={handleCloseDrawer}
        open={Boolean(selectedRow)}
        onBackdropClick={handleCloseDrawer}
      >
        {
          selectedRow?.id && (
            <EnquiryAndRequest {...(selectedRow as any)} />
          )
        }
      </Drawer>
    </div>
  );
};

export default Table;
