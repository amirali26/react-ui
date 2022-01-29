import { useReactiveVar } from '@apollo/client';
import {
  Button,
  InputLabel, List, ListItem, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { userVar } from '../../../../pages/Dashboard';
import Title from '../../../molecules/Title';
import ChangePassword from '../../ChangePassword';

const UserInformation: React.FC = () => {
  const { user, accounts } = useReactiveVar(userVar);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState<boolean>(false);

  return (
    <div>
      <Title
        title="User Profile"
        subtitle="View and manage your user profile on this page."
      />
      {/* <div className="paddingTopMedium paddingMedium flex alignItemsCenter">
        <Avatar
          className="marginRight"
          sx={{
            width: theme.spacing(10),
            height: theme.spacing(10),
            border: '2px solid black',
          }}
        >
          <PhotoCamera />
        </Avatar>
        <div style={{ width: '350px' }} className="marginRight">
          <Typography variant="subtitle1">
            Change Avatar
          </Typography>
          <Typography variant="subtitle1" className="grey">
            Update or set a new profile picture by clicking on the button on the right
          </Typography>
        </div>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudUpload />}
        >
          Upload
        </Button>
      </div>
      <Divider className="marginTop marginBottom" /> */}
      <div className="paddingTopMedium paddingMedium flex column spaceBetween">
        <div className="flex column marginBottomMedium">
          <div className="flex row marginBottom">
            <div className="marginRightMedium" style={{ width: '50%' }}>
              <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Full Name</InputLabel>
              <TextField
                id="input-with-icon-adornment"
                name="name"
                fullWidth
                color="primary"
                value={user?.name || ''}
                disabled
              />
            </div>
            <div style={{ width: '50%' }}>
              <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Date of Birth</InputLabel>
              <TextField
                id="input-with-icon-adornment"
                name="name"
                fullWidth
                color="primary"
                value={user?.dateOfBirth || ''}
                disabled
              />
            </div>
          </div>
          <div className="flex row">
            <div className="marginRightMedium" style={{ width: '50%' }}>
              <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Phone Number</InputLabel>
              <TextField
                id="input-with-icon-adornment"
                name="name"
                fullWidth
                color="primary"
                value={user?.phoneNumber || ''}
                disabled
              />
            </div>
            <div style={{ width: '50%' }}>
              <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Email</InputLabel>
              <TextField
                id="input-with-icon-adornment"
                name="name"
                fullWidth
                color="primary"
                value={user?.email || ''}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex row marginTop">
          <div style={{ width: '100%' }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Available Accounts</InputLabel>
            <List
              sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                minHeight: 300,
                maxHeight: 300,
                border: '1px solid rgba(94, 94, 94, 0.267)',
                padding: 0,
                '& > div': { padding: '16px' },
              }}
            >
              {accounts?.map((account) => (
                <ListItem key={account.id}>
                  {account.name}
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <div className="flex row marginTop">
          <div style={{ width: '100%' }}>
            <Button fullWidth variant="contained" onClick={() => setOpenChangePasswordModal(true)}>Change Your Password</Button>
          </div>
        </div>
        <ChangePassword
          open={openChangePasswordModal}
          handleClose={() => setOpenChangePasswordModal(false)}
        />
      </div>
    </div>
  );
};

export default UserInformation;
