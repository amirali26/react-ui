import { useMutation } from '@apollo/client';
import { CircleNotifications } from '@mui/icons-material';
import { Button, CircularProgress } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Account } from '../../../../models/account';
import { RESEND_VERIFICATION_CODE } from '../../../../mutations/resendVerificationCode';
import PersistentCard, { IPersistentCardProps } from '../../../molecules/PersistentCard';

const AccountPersistentCard: React.FC<IPersistentCardProps> = ({ visible }) => {
  const [resendVerificationCode, { loading }] = useMutation<{
    resendVerificationCode: Account
  }>(RESEND_VERIFICATION_CODE);
  return (
    <PersistentCard visible={visible}>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '16x', alignItems: 'center',
      }}
      >
        <h3 style={{ margin: 0 }}>Firm Not Verified</h3>
        <CircleNotifications color="error" style={{ width: '30px', height: '30px' }} />
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
    </PersistentCard>
  );
};
export default AccountPersistentCard;
