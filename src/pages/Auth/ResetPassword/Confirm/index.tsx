import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormTitle from '../../../../components/molecules/auth/FormTitle';

const Confirmation: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <form>
      <FormTitle
        title="Create new Password"
        subtitle="Please ensure your new password meets the minimum requirements and is different to your previous passwords."
      />
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Password</InputLabel>
        <Input
          id="input-with-icon-adornment"
          fullWidth
          color="primary"
          type={showPassword ? 'text' : 'password'}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
        />
      </div>
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Confirm Password</InputLabel>
        <Input
          id="input-with-icon-adornment"
          fullWidth
          color="primary"
          type={showPassword ? 'text' : 'password'}
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginTopMedium red">Both passwords must match.</InputLabel>
        <Button
          variant="contained"
          color="primary"
          className="marginTop fullWidth"
          startIcon={<LockOutlined />}
        >
          Update Password
        </Button>
      </div>
      <div className="marginTopMedium fullWidth textAlignLeft">
        <Typography variant="subtitle1">
          Want to go back?
          {' '}
          <NavLink className="underline red" to="/auth/login">Take me back to log in</NavLink>
        </Typography>
      </div>
    </form>
  );
};

export default Confirmation;
