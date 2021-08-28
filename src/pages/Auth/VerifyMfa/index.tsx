import { LockOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { Button, makeStyles, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import ReactCodeInput from 'react-code-input';
import { NavLink } from 'react-router-dom';
import FormTitle from '../../../components/molecules/auth/FormTitle';

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

const VerifyMfa: React.FC = () => {
  const styles = useStyles();
  return (
    <form>
      <FormTitle
        title="Authenticate Account"
        subtitle="A verification code has been sent to your registered device. This code will be valid for 20 minutes."
      />
      <div className={clsx(styles.codeWrapper, 'marginTopMedium')}>
        <ReactCodeInput
          type="text"
          fields={6}
          name="hi"
          inputMode="email"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        className="marginTop fullWidth"
        startIcon={<LockOutlined />}
      >
        Submit
      </Button>
      <div className="marginTopMedium fullWidth textAlignLeft">
        <Typography variant="subtitle1">
          It may take a minute to receive your code?
          {' '}
          <NavLink className="underline red" to="/auth/login">Resend a new code</NavLink>
        </Typography>
      </div>
    </form>
  );
};

export default VerifyMfa;
