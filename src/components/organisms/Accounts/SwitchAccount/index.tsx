import { useReactiveVar } from '@apollo/client';
import { Person, PersonPinCircleTwoTone } from '@material-ui/icons';
import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { userVar } from '../../../../pages/Dashboard';

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
      <Typography variant="h5" className="marginBottomMedium">Available Accounts</Typography>
      <List>
        {items}
      </List>
    </>
  );
};

export default SwitchAccount;
