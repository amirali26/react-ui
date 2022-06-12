import { useMutation, useReactiveVar } from '@apollo/client';
import { CancelOutlined } from '@mui/icons-material';
import {
  Button,
  InputLabel, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { User } from '../../../../models/user';
import UPDATE_USER_PROFILE_IMAGE from '../../../../mutations/updateUserProfileImage';
import { userVar } from '../../../../pages/Dashboard';
import { GET_USER } from '../../../../queries/user';
import AccountItemCard from '../../../molecules/AccountItemCard';
import BigMessage from '../../../molecules/bigMessage';
import ImageUpload from '../../../molecules/ImageUpload';
import Title from '../../../molecules/Title';
import ChangePassword from '../../ChangePassword';

const UserInformation: React.FC = () => {
  const sb = useHelpmycaseSnackbar();
  const { user, accounts } = useReactiveVar(userVar);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState<boolean>(false);
  const [updateProfileImage] = useMutation<{
    addUserProfileImage: User
  }>(UPDATE_USER_PROFILE_IMAGE, {
    refetchQueries: [GET_USER],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const successMessage = data.addUserProfileImage.imageUrl ? 'Successfully updated profile image' : 'Removed image';
      sb.trigger(successMessage, 'success');
    },
    onError: (e) => {
      sb.trigger('There was an error updating your profile image');
    },
  });

  return (
    <div>
      <Title
        title="User Profile"
        subtitle="View and manage your user profile on this page."
      />
      <div>
        <ImageUpload
          display
          imageUrl={user.imageUrl}
          clearImage={() => updateProfileImage({
            variables: {
              imageUrl: null,
            },
          })}
          submitImage={(imageUrl: string) => updateProfileImage({
            variables: {
              imageUrl,
            },
          })}
        />
      </div>
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
            {
              accounts?.length && accounts?.length > 0 ? (
                <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Available Accounts</InputLabel>
              )
                : <></>
            }
            {accounts?.length ? accounts?.map((account) => (
              <AccountItemCard key={account.id} {...account} />
            )) : (
              <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                <BigMessage
                  icon={<CancelOutlined />}
                  title="No accounts found"
                  subtitle="Your user is not currently associated with any accounts."
                  variant="drawer"
                  style={{ top: '50%' }}
                />
              </div>
            )}
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
