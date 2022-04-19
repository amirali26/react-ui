import { useReactiveVar } from '@apollo/client';
import { Person } from '@mui/icons-material';
import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { userVar } from '../../../../pages/Dashboard';
import AccountItemCard from '../../../molecules/AccountItemCard';
import Title from '../../../molecules/Title';

interface IProps {
  callback?: () => void;
}

const SwitchAccount: React.FC<IProps> = ({ callback }: IProps) => {
  const sb = useHelpmycaseSnackbar();
  const user = useReactiveVar(userVar);
  const items = user?.accounts?.map((account) => (
    <AccountItemCard
      key={account.id}
      {...account}
      disabled={account.id === user.selectedAccount?.id}
      onClick={() => {
        userVar({
          ...user,
          selectedAccount: account,
        });
        if (callback) callback();
        sb.trigger(`Successfully switched account to: ${account.name}`, 'success');
      }}
    />
  ));
  return (
    <>
      <Title
        title="Switch Firm"
        subtitle="View available firms associated with your user and switch between them"
      />
      <List>
        {items}
      </List>
    </>
  );
};

export default SwitchAccount;
