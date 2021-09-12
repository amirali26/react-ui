import { useReactiveVar, useQuery } from '@apollo/client';
import { Typography, InputLabel, TextField } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { userVar } from '../../../../pages/Dashboard';
import { GET_USER } from '../../../../queries/user';
import BackdropLoader from '../../../molecules/backdropLoader';

const UserInformation: React.FC = () => {
  const user = useReactiveVar(userVar);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      userId: user.user.id,
    },
  });
  return (
    <div>
      <BackdropLoader open={loading} />
      <Typography variant="h5" className="marginBottom">User Information</Typography>
      <div className="flex column">
        <div className="flex">
          <div className="fullWidth marginRightSmall">
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Name</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              value={data?.user?.name || ''}
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
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
