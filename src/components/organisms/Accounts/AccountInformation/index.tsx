import { useQuery, useReactiveVar } from '@apollo/client';
import {
  InputLabel, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Account } from '../../../../models/account';
import { userVar } from '../../../../pages/Dashboard';
import { GET_ACCOUNT } from '../../../../queries/account';
import convertToDateTime from '../../../../utils/datetime';
import BackdropLoader from '../../../molecules/backdropLoader';
import Title from '../../../molecules/Title';

type Props = {
  account?: Account;
}

const AccountInformation: React.FC<Props> = ({ account }) => {
  const user = useReactiveVar(userVar);

  const { loading, data } = useQuery(GET_ACCOUNT, {
    variables: {
      accountId: user.selectedAccount?.id,
    },
    fetchPolicy: 'network-only',
    skip: Boolean(account),
  });

  if (loading && !data && !account) {
    return <BackdropLoader open />;
  }

  if ((!data && !loading && !account) || data?.userAccount?.length < 1) {
    return null;
  }

  const accountInformation = account || data?.userAccount[0];

  return (
    <div>
      <BackdropLoader open={loading} />
      <Title
        title="Firm Information"
        subtitle="A detailed description of the registered details for the selected firm"
      />
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
