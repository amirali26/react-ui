import { Key } from '@mui/icons-material';
import { Auth } from 'aws-amplify';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../hooks/useHelpmycaseSnackbar';
import Modal from '../../molecules/modal';

type Props = {
  open: boolean,
  handleClose: () => void;
}

type InitialValues = {
  oldPassword: string;
  password: string;
  confirmResetPassword: string;
}

const initialValues: InitialValues = {
  oldPassword: '',
  password: '',
  confirmResetPassword: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const ChangePassword: React.FC<Props> = ({ open, handleClose }) => {
  const sb = useHelpmycaseSnackbar();
  const handleSubmit = async (values: InitialValues) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, values.oldPassword, values.password);
      sb.trigger('Password successfully changed', 'success');
      handleClose();
    } catch (e) {
      sb.trigger((e as any)?.message || 'There was an error changing your password');
    }
  };

  const formik = useFormik({
    initialValues,
    isInitialValid: false,
    validateOnMount: true,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <Modal open={open} handleClose={handleClose}>
      <form style={{ textAlign: 'center' }} onSubmit={formik.handleSubmit}>
        <Key sx={{ fontSize: '42px' }} />
        <Typography variant="h5" className="marginBottom">Change Your Password</Typography>
        <TextField
          sx={{ marginBottom: '16px' }}
          id="input-with-icon-adornment"
          name="oldPassword"
          fullWidth
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color="primary"
          placeholder="Current Password"
          type="password"
        />
        <TextField
          id="input-with-icon-adornment"
          sx={{ marginBottom: '16px' }}
          name="password"
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          error={Boolean(formik.touched.password && formik.errors.password)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color="primary"
          placeholder="New Password"
          type="password"
        />
        <TextField
          id="input-with-icon-adornment"
          sx={{ marginBottom: '16px' }}
          name="confirmResetPassword"
          fullWidth
          helperText={formik.touched.confirmResetPassword && formik.errors.confirmResetPassword}
          error={Boolean(formik.touched.confirmResetPassword && formik.errors.confirmResetPassword)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color="primary"
          placeholder="Confirm New Password"
          type="password"
        />
        <Button type="submit" variant="contained" fullWidth disabled={!formik.isValid}>Change Password</Button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
