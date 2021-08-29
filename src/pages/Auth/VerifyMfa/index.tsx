import { LockOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { useFormik } from 'formik';
import {
  Button, CircularProgress, makeStyles, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import ReactCodeInput from 'react-code-input';
import { NavLink, useLocation } from 'react-router-dom';
import FormTitle from '../../../components/molecules/auth/FormTitle';
import history from '../../../utils/routes/history';
import useAuth from '../useAuth';

const useStyles = makeStyles({
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
}

const VerifyMfa: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();
  const {
    loading, resendConfirmationCode, confirmSignUp, verifyMfa,
  } = useAuth();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if ((location.state as IRouteState)?.verify) {
        return confirmSignUp(values.code);
      }
      return verifyMfa(values.code);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormTitle
        title="Authenticate Account"
        subtitle="A verification code has been sent to your registered device. This code will be valid for 20 minutes."
      />
      <div className={clsx(styles.codeWrapper, 'marginTopMedium')}>
        <ReactCodeInput
          type="text"
          fields={6}
          name="code"
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
          {' '}
          <button
            type="button"
            className="underline red borderNone font"
            style={{ backgroundColor: 'transparent' }}
            onClick={resendConfirmationCode}
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
