import { ColDef, ColGroupDef } from 'ag-grid-community';

const filterParams = {
  comparator(filterLocalDateAtMidnight: Date, cellValue: string) {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return undefined;
  },
  browserDatePicker: true,
};
export const ColumnDefs: (ColDef | ColGroupDef)[] = [
  { field: 'id', headerName: '#' },
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
