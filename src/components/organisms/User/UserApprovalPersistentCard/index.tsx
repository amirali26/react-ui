import { CircleNotifications } from '@mui/icons-material';
import React from 'react';
import PersistentCard, { IPersistentCardProps } from '../../../molecules/PersistentCard';

const UserAccountPersistentCard: React.FC<IPersistentCardProps> = ({ visible }) => (
  <PersistentCard visible={visible}>
    <div style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '16x', alignItems: 'center',
    }}
    >
      <h3 style={{ margin: 0 }}>User is being processed</h3>
      <CircleNotifications color="error" style={{ width: '30px', height: '30px' }} />
    </div>
    <p>
      We are currently reviewing your user.
      The process should not take any longer than 2 business days.
    </p>
  </PersistentCard>
);

export default UserAccountPersistentCard;
