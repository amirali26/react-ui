import { ColDef, ColGroupDef } from 'ag-grid-community';

export const ColumnDefs: (ColDef | ColGroupDef)[] = [
  { field: 'id', headerName: '#' },
  { field: 'topic', headerName: 'Topic' },
  { field: 'name', headerName: 'Name' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email' },
  { field: 'createdDate', headerName: 'Created Date' },
];

export const DefaultColDef = {
  editable: true,
  filter: 'agTextColumnFilter',
};

export default ColumnDefs;
