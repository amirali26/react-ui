import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import {
  Button, IconButton, InputAdornment, InputLabel, TextField, Typography, CircularProgress,
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
    .required('Username is a required field'),
  password: Yup.string().min(8, 'Password must be 8 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const { loading, signIn } = useAuth();
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
        <TextField
          id="input-with-icon-adornment"
          name="username"
          fullWidth
          color="primary"
          helperText={formik.touched.username && formik.errors.username}
          error={Boolean(formik.touched.username && formik.errors.username)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Password</InputLabel>
        <div style={{ position: 'relative' }}>
          <TextField
            id="input-with-icon-adornment"
            name="password"
            fullWidth
            color="primary"
            type={showPassword ? 'text' : 'password'}
            helperText={formik.touched.password && formik.errors.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <InputAdornment position="end" style={{ position: 'absolute', right: '0px', top: '15px' }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="marginTop fullWidth"
          type="submit"
          disabled={Boolean(
            !formik.isValid || loading || !formik.touched.username || !formik.touched.password,
          )}
          startIcon={loading ? <CircularProgress color="secondary" size="12px" />
            : <LockOutlined />}
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
