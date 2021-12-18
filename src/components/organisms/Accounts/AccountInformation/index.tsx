import { useQuery, useReactiveVar } from '@apollo/client';
import {
  InputLabel, TextField, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { userVar } from '../../../../pages/Dashboard';
import { GET_ACCOUNT } from '../../../../queries/account';
import convertToDateTime from '../../../../utils/datetime';
import BackdropLoader from '../../../molecules/backdropLoader';
import Title from '../../../molecules/Title';

const AccountInformation = () => {
  const user = useReactiveVar(userVar);
  const { loading, data } = useQuery(GET_ACCOUNT, {
    variables: {
      accountId: user.selectedAccount?.id,
    },
    fetchPolicy: 'network-only',
  });

  if (loading && !data) {
    return <BackdropLoader open />;
  }

  if ((!data && !loading) || data?.userAccount?.length < 1) {
    return null;
  }

  const accountInformation = data?.userAccount[0];

  return (
    <div>
      <BackdropLoader open={loading} />
      <Title
        title="Account Information"
        subtitle="View your account information on this page"
      />
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
              value={accountInformation.name}
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
              value={accountInformation.createdBy?.name}
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
              value={convertToDateTime(accountInformation.createdAt)}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
