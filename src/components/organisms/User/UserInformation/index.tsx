import { useQuery, useReactiveVar } from '@apollo/client';
import { CloudUpload, PhotoCamera } from '@mui/icons-material';
import {
  Avatar, Button, Divider, InputLabel, List, ListItemButton, TextField, Typography,
} from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import React from 'react';
import { Account } from '../../../../models/account';
import { User } from '../../../../models/user';
import { userVar } from '../../../../pages/Dashboard';
import { GET_USER } from '../../../../queries/user';
import BackdropLoader from '../../../molecules/backdropLoader';
import Title from '../../../molecules/Title';

const UserInformation: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = React.useState<Account>();

  const user = useReactiveVar(userVar);
  const { loading, data } = useQuery<{ user: User }>(GET_USER, {
    variables: {
      userId: user.user.id,
    },
  });

  const handleSetSelectedAccount = (account?: Account) => setSelectedAccount(account);

  return (
    <div>
      <BackdropLoader open={loading} />
      <Title
        title="User Profile"
        subtitle="View and manage your user profile on this page."
      />
      <div className="paddingTopMedium paddingMedium flex alignItemsCenter">
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
      <Divider className="marginTop marginBottom" />
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
                value={data?.user?.name || ''}
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
                value={data?.user?.dateOfBirth || ''}
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
                value={data?.user?.phoneNumber || ''}
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
                value={data?.user?.email || ''}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex row marginTop">
          <div className="marginRightMedium" style={{ width: '50%' }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Available Accounts</InputLabel>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                border: '1px solid #9994',
                padding: 0,
                '& > div': { padding: '16px' },
              }}
            >
              {user.accounts?.map((account) => (
                <ListItemButton key={account.id} onClick={() => handleSetSelectedAccount(account)}>
                  { account.name }
                </ListItemButton>
              ))}
            </List>
          </div>
          <div style={{ width: '50%' }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Available Accounts</InputLabel>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                border: '1px solid #9994',
                padding: 0,
                '& > div': { padding: '16px' },
              }}
            >
              {user.accounts?.map((account) => (
                <ListItemButton key={account.id} onClick={() => handleSetSelectedAccount(account)}>
                  { account.name }
                </ListItemButton>
              ))}
            </List>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserInformation;
