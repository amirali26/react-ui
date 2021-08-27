import {
  AddToHomeScreenOutlined, LockOutlined, Visibility, VisibilityOff,
} from '@material-ui/icons';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormTitle from '../../../../components/molecules/auth/FormTitle';

const Request: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <form>
      <FormTitle
        title="Reset Password"
        subtitle={'Enter the username associated with your account and we\'ll send an email with instructions to reset your password.'}
      />
      <div className="fullWidth marginTopMedium">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Username</InputLabel>
        <Input
          id="input-with-icon-adornment"
          fullWidth
          color="primary"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        className="marginTop fullWidth"
        startIcon={<AddToHomeScreenOutlined />}
      >
        Send Verification
      </Button>
      <div className="marginTopMedium fullWidth textAlignLeft">
        <Typography variant="subtitle1">Want to go back?</Typography>
        <NavLink className="underline red" to="/auth/login">Take me back to log in</NavLink>
      </div>
    </form>
  );
};

export default Request;
