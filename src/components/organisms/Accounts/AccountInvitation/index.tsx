import { useMutation, useReactiveVar } from '@apollo/client';
import { AddTask } from '@mui/icons-material';
import {
  Avatar, Button, List, ListItem, ListItemAvatar, ListItemText,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import AccountUserInvitation from '../../../../models/accountUserInvitation';
import ACCEPT_OR_REJECT_ACCOUNT_USER_INVITATION from '../../../../mutations/acceptOrRejectAccountUserInvitation';
import { userVar } from '../../../../pages/Dashboard';
import GET_ACCOUNT_USER_INVITATION from '../../../../queries/account-user-invitations';
import { GET_USER } from '../../../../queries/user';
import convertToDateTime from '../../../../utils/datetime';
import BackdropLoader from '../../../molecules/backdropLoader';
import Drawer from '../../../molecules/Drawer';
import Title from '../../../molecules/Title';
import CreateAccountForm from '../CreateAccount/Form';

interface IProps {
  callback?: () => void;
}

const AccountInvitation: React.FC<IProps> = () => {
  const [selectedAui, setSelectedAui] = useState<AccountUserInvitation>();
  const user = useReactiveVar(userVar);
  const [acceptOrRejectAccountUserInvitation, { loading }] = useMutation(
    ACCEPT_OR_REJECT_ACCOUNT_USER_INVITATION,
    {
      onCompleted: () => setSelectedAui(undefined),
      refetchQueries: [GET_USER, GET_ACCOUNT_USER_INVITATION],
    },
  );
  console.log(selectedAui, user?.accountUserInvitations);
  const items = user?.accountUserInvitations?.map((aui) => (
    <ListItem
      key={aui.id}
      disabled={aui.id === user.selectedAccount?.id}
      className="marginBottomSmall"
      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      sx={{
        '&:hover:after': {
          content: '"View Invitation"',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(0, 0, 0, 0.6)',
          fontWeight: 'bold',
        },
      }}
      button
      onClick={() => {
        setSelectedAui(aui);
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar>
            <AddTask />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={aui.account.name} secondary={aui.referUser.name} />
      </div>
      <div>
        <ListItemText secondary={convertToDateTime(aui.createdAt)} />
      </div>
    </ListItem>
  ));
  return (
    <>
      <Title
        title="Firm Invitations"
        subtitle="View all your firm invitations currently pending"
      />
      <List>
        {items}
      </List>
      <Drawer open={Boolean(selectedAui)} onClose={() => setSelectedAui(undefined)}>
        {
          selectedAui
          && (
            <>
              <CreateAccountForm
                accountInformation={{
                  ...selectedAui.account,
                  type: selectedAui.account.size,
                  handledAreasOfPractice: selectedAui.account.areasOfPractice.map((aop) => aop.id),
                }}
                readonly
              />
              <div style={{ display: 'flex', flexDirection: 'row' }} className="marginTop">
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  fullWidth
                  sx={{ marginRight: '8px' }}
                  onClick={() => {
                    acceptOrRejectAccountUserInvitation({
                      variables: {
                        aui: selectedAui.id,
                        auis: 2,
                      },
                    });
                  }}
                >
                  Accept Invitation
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  fullWidth
                  sx={{ marginLeft: '8px' }}
                  onClick={() => {
                    acceptOrRejectAccountUserInvitation({
                      variables: {
                        aui: selectedAui.id,
                        auis: 1,
                      },
                    });
                  }}
                >
                  Reject Invitation
                </Button>
              </div>
              <BackdropLoader open={loading} />
            </>
          )
        }
      </Drawer>
    </>
  );
};

export default AccountInvitation;
