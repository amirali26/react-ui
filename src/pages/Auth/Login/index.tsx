import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, makeStyles, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({

});

const Login: React.FC = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <form>
      <div className="textAlignCenter">
        <Typography variant="h1" color="inherit">
          Welcome back!
        </Typography>
        <Typography variant="subtitle1">
          To login to your account,
          please provide your username
          (normally your email address) and your password.
        </Typography>
      </div>
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Username</InputLabel>
        <Input
          id="input-with-icon-adornment"
          fullWidth
          color="primary"
        />
      </div>
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
        <Button
          variant="contained"
          color="primary"
          className="marginTop fullWidth"
          startIcon={<LockOutlined />}
        >
          Login

        </Button>
      </div>
      <div className="marginTop fullWidth textAlignCenter">
        <Typography variant="subtitle1">Forgotten your password?</Typography>
        <NavLink className="underline red" to="/">Reset your password</NavLink>
      </div>
    </form>
  );
};

export default Login;
