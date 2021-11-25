import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import {
  InputLabel, TextField, Typography,
} from 'helpmycase-storybook/dist/components/External';
import { DateTime } from 'luxon';
import { userVar } from '../../../../pages/Dashboard';
import { GET_ACCOUNT } from '../../../../queries/account';
import BackdropLoader from '../../../molecules/backdropLoader';

const AccountInformation = () => {
  const user = useReactiveVar(userVar);
  console.log(user);
  const { loading, data } = useQuery(GET_ACCOUNT, {
    variables: {
      accountId: user.selectedAccount?.id,
    },
    fetchPolicy: 'network-only',
  });
  console.log(data);
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
              value={data?.userAccount?.name || ''}
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
              value={data?.userAccount?.createdBy?.name || ''}
              disabled
            />
          </div>
          <div className="fullWidth marginLeftSmall">
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Created Date</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              value={DateTime.fromISO(data?.userAccount?.createdAt || '').toFormat('DDDD')}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
