import { PersonAddOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { useFormik } from 'formik';
import {
  Button, CircularProgress, InputLabel, TextField, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import ReactCodeInput from 'react-code-input';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import FormTitle from '../../../../components/molecules/auth/FormTitle';
import useAuth from '../../useAuth';
import { useStyles } from '../../VerifyMfa';

const initialValues = {
  code: '',
  password: '',
  confirmPassword: '',
};

const formValidationSchema = Yup.object().shape({
  code: Yup.string().required('Please enter a code'),
  password: Yup.string().min(8, 'Password must be 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Confirmation: React.FC = () => {
  const styles = useStyles();
  const location = useLocation<{ email: string }>();
  const { loading, triggerForgotPasswordSubmit } = useAuth();
  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    validationSchema: formValidationSchema,
    onSubmit: (values) => triggerForgotPasswordSubmit(
      location.state.email, values.code, values.password,
    ),
  });

  if (!location.state.email) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormTitle
        title="Create new Password"
        subtitle="Please ensure your new password meets the minimum requirements and is different to your previous passwords."
      />
      <div className={clsx(styles.codeWrapper, 'marginTopMedium')}>
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
          Verification code sent to your email address
          {' '}
          <span className="red">*</span>
        </InputLabel>
        <ReactCodeInput
          type="text"
          fields={6}
          name="code"
          onChange={(e) => formik.setFieldValue('code', e)}
          inputMode="email"
        />
      </div>
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
          Password
          {' '}
          <span className="red">*</span>
        </InputLabel>
        <TextField
          name="password"
          required
          id="input-with-icon-adornment"
          type="password"
          fullWidth
          color="primary"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          helperText={formik.touched.password && formik.errors.password}
          error={Boolean(formik.touched.password && formik.errors.password)}
        />
      </div>
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
          Confirm Password
          {' '}
          <span className="red">*</span>
        </InputLabel>
        <TextField
          name="confirmPassword"
          id="input-with-icon-adornment"
          fullWidth
          color="primary"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
        />
        {' '}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="marginTop fullWidth"
          disabled={Boolean(
            !formik.isValid
            || loading,
          )}
          startIcon={loading ? <CircularProgress color="secondary" size="12px" />
            : <PersonAddOutlined />}
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
