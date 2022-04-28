import { makeVar, useLazyQuery, useReactiveVar } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { Button, Typography } from 'helpmycase-storybook/dist/components/External';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import BackdropLoader from '../../components/molecules/backdropLoader';
import PersistentCard from '../../components/molecules/PersistentCard';
import TopBar from '../../components/molecules/topBar';
import AccountPersistentCard from '../../components/organisms/Accounts/AccountPersistentCard';
import CreateAccount from '../../components/organisms/Accounts/CreateAccount';
import UserApprovalBigMessage from '../../components/organisms/User/UserApprovalBigMessage';
import UserAccountPersistentCard from '../../components/organisms/User/UserApprovalPersistentCard';
import Navigation from '../../components/templates/Navigation';
import RoutePage from '../../components/templates/RoutePage';
import { Account } from '../../models/account';
import AccountUserInvitation from '../../models/accountUserInvitation';
import { User } from '../../models/user';
import {
  GET_USER, GET_USER_ACCOUNT, IGetUser, IGetUserAccount,
} from '../../queries/user';
import history from '../../utils/routes/history';
import routes from '../../utils/routes/routes';
import useAuth from '../Auth/useAuth';
import Cases from '../Cases';
import Enquiries from '../Enquiries';

export type UserAccount = {
  user: User,
  accounts?: Account[]
  selectedAccount?: Account,
  accountUserInvitations?: AccountUserInvitation[],
}

export const userVar = makeVar<UserAccount>({
  user: {
    id: '',
    dateOfBirth: '',
    email: '',
    name: '',
    phoneNumber: '',
    accounts: [],
  },
  accountUserInvitations: [],
});

const Dashboard: React.FC = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const user = useReactiveVar(userVar);

  const [getUser, { loading }] = useLazyQuery<IGetUser>(GET_USER, {
    onCompleted: (_data) => {
      if (user && _data.user.length) {
        userVar({
          ...user,
          user: {
            ...user.user,
            userApproval: _data.user[0].userApproval,
            imageUrl: _data.user[0].imageUrl,
          },
          accounts: [],
        });
      }
      if (!_data?.user.length && !loading) handleLogout();
    },
  });

  const [getUserAccount, getUserAccountState] = useLazyQuery<IGetUserAccount>(GET_USER_ACCOUNT, {
    onCompleted: (_data) => {
      if (user && _data.user.length) {
        userVar({
          ...user,
          user: {
            ...user.user,
            userApproval: _data.user[0].userApproval,
            imageUrl: _data.user[0].imageUrl,
          },
          accounts: _data.user[0].accounts,
          accountUserInvitations: _data.user[0].accountUserInvitations,
          selectedAccount: _data.user[0].accounts[0],
        });
      }
      if (!_data?.user.length && !loading) handleLogout();
    },
  });

  const getUserOrRedirectToLogin = async (): Promise<void> => {
    try {
      const response = await isLoggedIn();
      if (response) {
        const userIdResponse = await Auth.currentAuthenticatedUser();
        if (userIdResponse) {
          userVar({
            user: {
              id: userIdResponse.username,
              name: userIdResponse.attributes.name,
              email: userIdResponse.attributes.email,
              dateOfBirth: userIdResponse.attributes.birthdate,
              phoneNumber: userIdResponse.attributes.phone_number,
              accounts: [],
            },
          });
          return;
        }
      }
    } catch {
      history.push('/auth/login');
    }
  };

  useEffect(() => {
    Promise.resolve(getUserOrRedirectToLogin());
  }, []);

  useEffect(() => {
    if (!user.user.userApproval) return;
    getUserAccount();
  }, [user.user.userApproval]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading || getUserAccountState.loading) {
    return <BackdropLoader open />;
  }

  return (
    <Route path={[routes.dashboard, routes.base]}>
      <AccountPersistentCard visible={
        Boolean(user.selectedAccount && !user.selectedAccount.firmVerified)
      }
      />
      <UserAccountPersistentCard visible={!user.user.userApproval} />
      <Navigation />
      <BackdropLoader open={loading} />
      {
        Boolean(!user.accounts?.length) && !loading && user.user.userApproval
        && <CreateAccount />
      }
      {
        !user.user.userApproval && !loading
        && <UserApprovalBigMessage />
      }
      {
        Boolean(user.accounts?.length) && (
          <Switch>
            <Route path={['/dashboard/enquiries']} key={user.selectedAccount?.id}>
              <TopBar
                breadcrumbs={[
                  <Typography key="Enquiries" color="text.primary">Enquiries</Typography>,
                ]}
                title="Enquiries"
                subtitle="A detailed list of all enquiries made on behalf of your organisation"
                rightElement={(
                  <Button
                    variant="contained"
                    style={{
                      width: '250px',
                      height: '50px',
                    }}
                    onClick={() => history.push('/dashboard/cases')}
                  >
                    View Available Cases
                  </Button>
                )}
              />
              <RoutePage>
                <Enquiries />
              </RoutePage>
            </Route>
            <Route path={['/dashboard/cases', '/dashboard']} key={user.selectedAccount?.id}>
              <TopBar
                breadcrumbs={[
                  <Typography key="Cases" color="text.primary">Available Cases</Typography>,
                ]}
                title="Available Cases"
                subtitle="A detailed list of all available cases which you are able to reply to"
                rightElement={(
                  <Button
                    variant="contained"
                    style={{
                      width: '250px',
                      height: '50px',
                    }}
                    onClick={() => history.push('/dashboard/enquiries')}
                  >
                    View Enquiries
                  </Button>
                )}
              />
              <RoutePage>
                <Cases />
              </RoutePage>
            </Route>
          </Switch>
        )
      }
    </Route>
  );
};

export default Dashboard;
