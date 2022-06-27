import { ColDef, ColGroupDef } from 'ag-grid-community';
import { filterParams } from '../../Cases/Table/columnDefinitions';

export const ColumnDefs: (ColDef | ColGroupDef)[] = [
  { field: 'enquiryNumber', headerName: 'Solicitor Response Number' },
  { field: 'requestNumber', headerName: 'Enquiry Number' },
  { field: 'topic', headerName: 'Topic' },
  { field: 'name', headerName: 'Name' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email' },
  {
    field: 'createdDate', headerName: 'Created Date', filter: 'agDateColumnFilter', filterParams,
  },
];

export const DefaultColDef = {
  filter: 'agTextColumnFilter',
  sortable: true,
};

export default ColumnDefs;
