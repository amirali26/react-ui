import { useQuery, useReactiveVar } from '@apollo/client';
import {
  InputLabel, TextField, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { userVar } from '../../../../pages/Dashboard';
import { GET_ACCOUNT } from '../../../../queries/account';
import BackdropLoader from '../../../molecules/backdropLoader';

const AccountInformation = () => {
  const user = useReactiveVar(userVar);
  const { loading, error, data } = useQuery(GET_ACCOUNT, {
    variables: {
      accountId: user.selectedAccount?.id,
    },
    fetchPolicy: 'network-only',
  });
  return (
    <div>
      <BackdropLoader open={loading} />
      <Typography variant="h5" className="marginBottom">Account Information</Typography>
      <div className="flex column">
        <div className="flex">
          <div className="fullWidth marginRightSmall">
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Name</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              value={data?.account?.name || ''}
              disabled
            />
          </div>
          <div className="fullWidth marginLeftSmall">
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Permissions</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              value="Full Permissions"
              disabled
            />
          </div>
        </div>
        <div className="flex marginTop">
          <div className="fullWidth marginRightSmall">
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Created By</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              value={data?.account?.createdBy?.name || ''}
              disabled
            />
          </div>
          <div className="fullWidth marginLeftSmall">
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Created By</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              value={data?.account?.createdDate ? new Date(+data.account?.createdDate).toLocaleString() : ''}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
