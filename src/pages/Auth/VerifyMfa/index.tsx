import { LockOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { useFormik } from 'formik';
import {
  Button, CircularProgress, Styles, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import ReactCodeInput from 'react-code-input';
import { NavLink, useLocation } from 'react-router-dom';
import FormTitle from '../../../components/molecules/auth/FormTitle';
import useAuth from '../useAuth';

export const useStyles = Styles.makeStyles({
  codeWrapper: {
    '& > div': {
      display: 'flex !important',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    '& > div > input': {
      width: '60px !important',
      height: '60px !important',
    },
  },
});

const initialValues = {
  code: '',
};

interface IRouteState {
  verify?: boolean
  username?: string
  password?: string
}

const VerifyMfa: React.FC = () => {
  const styles = useStyles();
  const location = useLocation<IRouteState>();
  const {
    loading, resendConfirmationCode, resendSignUpEmail, confirmSignUp, verifyMfa,
  } = useAuth();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (location.state?.verify && location.state?.username && location.state?.password) {
        return confirmSignUp(values.code, location.state.username, location.state.password);
      }
      return verifyMfa(values.code);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormTitle
        title={
         location.state?.verify ? 'Verify Email' : 'Authenticate Account'
        }
        subtitle={
          location.state?.verify ? 'Please verify your email address address using the code sent.'
            : 'A verification code has been sent to your registered device. This code will be valid for 20 minutes.'
        }
      />
      <div className={clsx(styles.codeWrapper, 'marginTopMedium')}>
        <ReactCodeInput
          type="text"
          fields={6}
          name="code"
          value={formik.values.code}
          onChange={(e) => formik.setFieldValue('code', e)}
          inputMode="email"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="marginTop fullWidth"
        disabled={loading || !(formik.values.code.length === 6)}
        startIcon={loading ? <CircularProgress color="secondary" size="12px" />
          : <LockOutlined />}
      >
        Submit
      </Button>
      <div className="marginTopMedium fullWidth textAlignLeft">
        <Typography variant="subtitle1">
          It may take a minute to receive your code?
          <button
            type="button"
            className="underline red borderNone font"
            style={{ backgroundColor: 'transparent' }}
            onClick={location.state?.verify ? resendSignUpEmail : resendConfirmationCode}
          >
            Resend a new code
          </button>
        </Typography>
        <div className="marginTopMedium fullWidth textAlignLeft">
          <Typography variant="subtitle1">
            Want to go back?
            {' '}
            <NavLink className="underline red" to="/auth/login">Take me back to log in</NavLink>
          </Typography>
        </div>
      </div>
    </form>
  );
};

export default VerifyMfa;
