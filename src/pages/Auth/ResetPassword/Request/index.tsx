import {
  AddToHomeScreenOutlined,
} from '@material-ui/icons';
import { useFormik } from 'formik';
import {
  Button, Input, InputLabel, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import FormTitle from '../../../../components/molecules/auth/FormTitle';
import useAuth from '../../useAuth';

const initialValues = {
  email: '',
};

const formValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is a required field'),
});

const Request: React.FC = () => {
  const {
    loading,
  } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: formValidationSchema,
    onSubmit: async (values) => verifyMfa(values.email),
  });

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
        disabled={
          loading || !formik.touched.email
        }
      >
        Send Verification
      </Button>
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

export default Request;
