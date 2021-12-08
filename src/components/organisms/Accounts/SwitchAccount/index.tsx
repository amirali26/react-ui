import { useReactiveVar } from '@apollo/client';
import { Person } from '@mui/icons-material';
import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { userVar } from '../../../../pages/Dashboard';
import Title from '../../../molecules/Title';

interface IProps {
    callback?: () => void;
}

const SwitchAccount: React.FC<IProps> = ({ callback }: IProps) => {
  const sb = useHelpmycaseSnackbar();
  const user = useReactiveVar(userVar);
  const items = user?.accounts?.map((account) => (
    <ListItem
      key={account.id}
      disabled={account.id === user.selectedAccount?.id}
      button
      onClick={() => {
        userVar({
          ...user,
          selectedAccount: account,
        });
        if (callback) callback();
        sb.trigger(`Successfully switched account to: ${account.name}`, 'success');
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <Person />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={account.name} secondary="Administrator" />
    </ListItem>
  ));
  return (
    <>
      <Title
        title="Switch Accounts"
        subtitle="View available accounts associated with your users and switch between them"
      />
      <List>
        {items}
      </List>
    </>
  );
};

export default SwitchAccount;
