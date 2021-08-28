import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import FormTitle from '../../../components/molecules/auth/FormTitle';
import useAuth from '../useAuth';

const initialValues = {
  username: '',
  password: '',
};

const formValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username should be atleast 5 characters in length')
    .max(12, 'Username should b at most 12 characters in length')
    .required('Username is a required field'),
  password: Yup.string().min(8, 'Password must be 8 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const { signIn } = useAuth();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => signIn(values.username, values.password),
    validationSchema: formValidationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormTitle
        title="Log in"
        subtitle={`To login to your account,
                    please provide your username
                    (normally your email address) and your password.`}
      />
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
          type="submit"
          startIcon={<LockOutlined />}
        >
          Login
        </Button>
      </div>
      <div className="marginTopMedium fullWidth textAlignLeft">
        <Typography variant="subtitle1">
          Forgotten your password?
          {' '}
          <NavLink className="underline red" to="/auth/reset-password">Reset your password</NavLink>
        </Typography>
      </div>
    </form>
  );
};

export default Login;
