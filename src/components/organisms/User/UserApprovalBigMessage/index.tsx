import { WarningAmberRounded } from '@mui/icons-material';
import React from 'react';
import BigMessage from '../../../molecules/bigMessage';

const UserApprovalBigMessage: React.FC = () => (
  <BigMessage
    icon={<WarningAmberRounded />}
    title="We are in the process of verifying your user"
    subtitle="To have unrestricted access to Helpmycase, you need to verify your user.
      We are currently in the process of verifying your user, if all goes well, your user should be verified within 2 business days"
    style={{ top: '50%' }}
  />
);

export default UserApprovalBigMessage;
