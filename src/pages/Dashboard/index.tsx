import { makeVar, useLazyQuery, useReactiveVar } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { Button, Typography } from 'helpmycase-storybook/dist/components/External';
import { isEqual } from 'lodash';
import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import BackdropLoader from '../../components/molecules/backdropLoader';
import TopBar from '../../components/molecules/topBar';
import CreateAccount from '../../components/organisms/Accounts/CreateAccount';
import Navigation from '../../components/templates/Navigation';
import RoutePage from '../../components/templates/RoutePage';
import usePrevious from '../../hooks/usePrev';
import { Account } from '../../models/account';
import AccountUserInvitation from '../../models/accountUserInvitation';
import { User } from '../../models/user';
import GET_ACCOUNT_USER_INVITATION from '../../queries/account-user-invitations';
import { GET_USER, IGetUser } from '../../queries/user';
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
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const user = useReactiveVar(userVar);
  const prevUser = usePrevious(user);
  const [getInvitations, invitations] = useLazyQuery<{
    accountUserInvitations: AccountUserInvitation[]
  }>(GET_ACCOUNT_USER_INVITATION);

  const [getUser, { loading, data }] = useLazyQuery<IGetUser>(GET_USER, {
    onCompleted: (_data) => {
      getInvitations();
      if (user) {
        userVar({
          ...user,
          accounts: _data.user[0].accounts,
          selectedAccount: _data.user[0].accounts[0],
        });
      }
    },
  });

  const getUserOrRedirectToLogin = async (): Promise<void> => {
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
    history.push('/auth/login');
  };

  useEffect(() => {
    Promise.resolve(getUserOrRedirectToLogin());
  }, []);

  useEffect(() => {
    if (user) {
      userVar({
        ...user,
        accountUserInvitations: invitations.data?.accountUserInvitations,
      });
    }
  }, [invitations.data]);

  useEffect(() => {
    if (user) {
      userVar({
        ...user,
        accounts: data?.user[0].accounts,
        selectedAccount: data?.user[0].accounts[0],
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isEqual(user, prevUser)) {
      getUser({ variables: { userId: user.user.id } });
    }
  }, [user.user, user.accounts]);

  return (
    <Route path={[routes.dashboard, routes.base]}>
      <Navigation />
      <BackdropLoader open={loading} />
      {
        Boolean(!data?.user[0].accounts.length) && !loading
        && <CreateAccount />
      }
      {
        Boolean(data?.user[0].accounts.length) && (
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
