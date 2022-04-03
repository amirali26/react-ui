import { useMutation } from '@apollo/client';
import { CircleNotifications } from '@mui/icons-material';
import { Button, CircularProgress } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Account } from '../../../models/account';
import RESEND_VERIFICATION_CODE from '../../../mutations/resendVerificationCode';

interface IProps {
  visible: boolean;
}

const PersistentCard: React.FC<IProps> = ({ visible }: IProps) => {
  const [resendVerificationCode, { loading }] = useMutation<{
    resendVerificationCode: Account
  }>(RESEND_VERIFICATION_CODE);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      width: '300px',
      minHeight: '150px',
      padding: '24px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      backgroundColor: 'rgb(247, 247, 247)',
      bottom: '0',
      right: '0',
      margin: '0 24px 24px 0',
      borderRadius: '4px',
      zIndex: '1',
      visibility: visible ? 'visible' : 'hidden',
    }}
    >
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '16x', alignItems: 'center',
      }}
      >
        <CircleNotifications color="error" style={{ width: '30px', height: '30px' }} />
        <h3 style={{ margin: 0 }}>Firm Not Verified</h3>
      </div>
      <p>
        To unlock all functionalities, please verify your firm.
        A verification code has been sent to the email used to create your firm.
      </p>
      <Button
        variant="contained"
        disabled={loading}
        startIcon={loading && <CircularProgress color="secondary" size="12px" />}
        onClick={() => resendVerificationCode()}
      >
        Resend Verification Code
      </Button>
    </div>
  );
};
export default PersistentCard;
