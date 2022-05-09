import { GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import * as React from 'react';
import useTable from '../../../../hooks/useTable';
import { Request, RequestDto } from '../../../../models/request';
import GET_REQUESTS from '../../../../queries/requests';
import { convertToDateTimeShort } from '../../../../utils/datetime';
import BackdropLoader from '../../../molecules/backdropLoader';
import Drawer from '../../../molecules/Drawer';
import Enquiry from '../../Enquiries/Enquiry';
import Case from '../Case';
import ColumnDefs, { DefaultColDef } from './columnDefinitions';

const Table: React.FC = () => {
  const {
    data,
    selectedRow,
    loading,
    searchTerm,
    getTableItems,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSort,
    handleChangePage,
    handleSearch,
  } = useTable<Request>(GET_REQUESTS);
  const [enquiryId, setEnquiryId] = React.useState<string>();
  const initialLoad = React.useRef<boolean>(true);
  const gridRef = React.useRef<GridReadyEvent>();

  React.useEffect(() => {
    setTimeout(() => {
      initialLoad.current = false;
    }, 500);
  }, []);

  const handleEnquiryClick = () => {
    handleCloseDrawer();
    setEnquiryId(selectedRow?.id);
  };

  const rows = React.useCallback(() => (data?.requests ? data.requests.nodes.map((r) => ({
    ...r,
    topic: r.topic.name,
    email: r.client.email,
    name: r.client.name,
    phoneNumber: r.client.phoneNumber,
    createdDate: convertToDateTimeShort(r.createdDate),
  })) : []), [data?.requests?.nodes]);

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
          animateRows
          sideBar
          onToolPanelVisibleChanged={() => {
            gridRef.current?.api.sizeColumnsToFit();
          }}
          onDisplayedColumnsChanged={() => {
            gridRef.current?.api.sizeColumnsToFit();
          }}
          onRowClicked={handleOpenDrawer}
          gridOptions={{
            getRowId: (rid) => rid.data.id,
          }}
        />
      </div>
      <Drawer onClose={handleCloseDrawer} open={Boolean(selectedRow)}>
        {
          selectedRow
          && (
            <Case
              {...rows().find((r) => r.id === selectedRow.id) as RequestDto}
              handleEnquiryClick={handleEnquiryClick}
            />
          )
        }
      </Drawer>
      <Drawer
        onClose={() => {
          handleCloseDrawer();
          setEnquiryId(undefined);
        }}
        open={Boolean(enquiryId)}
        onBackdropClick={handleCloseDrawer}
      >
        {
          enquiryId
          && (
            <Enquiry
              id={enquiryId}
              handleCallback={() => {
                handleCloseDrawer();
                setEnquiryId(undefined);
              }}
            />
          )
        }
      </Drawer>
      <BackdropLoader open={loading && initialLoad.current} />
    </div>
  );
};

export default Table;
