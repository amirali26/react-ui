import { OperationVariables, QueryLazyOptions } from '@apollo/client';
import { RefreshOutlined, SearchOutlined } from '@mui/icons-material';
import {
  IconButton, Input, Toolbar as MuiToolbar, Tooltip, Typography,
} from 'helpmycase-storybook/dist/components/External';
import * as React from 'react';

interface IProps {
  handleSearch: (sti: string) => void;
  getEnquiries: (options?: QueryLazyOptions<OperationVariables> | undefined) => void;
}

const Toolbar: React.FC<IProps> = ({ handleSearch, getEnquiries }: IProps) => {
  const handleRefetch = async () => {
    getEnquiries();
  };

  return (
    <MuiToolbar>
      <Typography
        style={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        All Enquiries
      </Typography>
      {/* <Tooltip title="Filter list">
        <IconButton>
          <FilterListOutlined />
        </IconButton>
      </Tooltip> */}
      <Input
        sx={{
          width: '320px',
          marginRight: '16px',
        }}
        placeholder="Case number or email address"
        startAdornment={<SearchOutlined />}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Tooltip title="Refetch Cases" onClick={handleRefetch}>
        <IconButton>
          <RefreshOutlined />
        </IconButton>
      </Tooltip>
    </MuiToolbar>
  );
};

export default Toolbar;
