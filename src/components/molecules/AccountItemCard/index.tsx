import {
  ListItem, ListItemAvatar, Avatar, ListItemText,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Account } from '../../../models/account';

type Props = Account & {
  onClick?: () => void,
  disabled?: boolean
}

const AccountItemCard: React.FC<Props> = ({ onClick, disabled, ...account }) => (
  <ListItem
    key={account.id}
    disabled={Boolean(disabled)}
    button
    onClick={onClick}
  >
    <ListItemAvatar>
      <Avatar>
        <img src={account.imageUrl} alt="Avatar" style={{ width: '100%', height: '100%' }} />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={account.name} secondary="Administrator" />
  </ListItem>
);

export default AccountItemCard;
