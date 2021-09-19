import { useQuery, useReactiveVar } from '@apollo/client';
import { CloudUpload, PhotoCamera } from '@material-ui/icons';
import clsx from 'clsx';
import {
  Avatar, Button, createStyles, Divider, InputLabel, makeStyles, TextField, Theme, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { userVar } from '../../../../pages/Dashboard';
import { GET_USER } from '../../../../queries/user';
import BackdropLoader from '../../../molecules/backdropLoader';

const useStyles = makeStyles((theme: Theme) => createStyles({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: '2px solid black',
  },
}));

const UserInformation: React.FC = () => {
  const styles = useStyles();
  const user = useReactiveVar(userVar);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      userId: user.user.id,
    },
  });
  return (
    <div>
      <BackdropLoader open={loading} />
      <Typography variant="h5">User Profile</Typography>
      <Typography variant="subtitle1" className="grey">View and manage your user profile on this page.</Typography>
      <Divider className="marginTop marginBottom" />
      <div className="paddingTopMedium paddingMedium flex alignItemsCenter">
        <Avatar className={clsx(styles.large, 'marginRight')}>
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
      <div className="paddingTopMedium paddingMedium flex spaceBetween">
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
    </div>
  );
};

export default UserInformation;
