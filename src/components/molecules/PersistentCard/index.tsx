import { useMutation } from '@apollo/client';
import { CircleNotifications } from '@mui/icons-material';
import { Button, CircularProgress } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Account } from '../../../models/account';
import RESEND_VERIFICATION_CODE from '../../../mutations/resendVerificationCode';

export interface IPersistentCardProps {
  visible: boolean;
  children?: JSX.Element | JSX.Element[],
}

const PersistentCard: React.FC<IPersistentCardProps> = ({
  visible,
  children,
}: IPersistentCardProps) => (
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
    {children}
  </div>
);
export default PersistentCard;
