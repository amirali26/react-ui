import { makeVar, useLazyQuery, useReactiveVar } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { isEqual } from 'lodash';
import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import BackdropLoader from '../../components/molecules/backdropLoader';
import CreateAccount from '../../components/organisms/Accounts/CreateAccount';
import Navigation from '../../components/templates/Navigation';
import usePrevious from '../../hooks/usePrev';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { GET_USER, IGetUser } from '../../queries/user';
import history from '../../utils/routes/history';
import routes from '../../utils/routes/routes';
import useAuth from '../Auth/useAuth';

export type UserAccount = {
  user: User,
  accounts?: Account[]
  selectedAccount?: Account,
}

export const userVar = makeVar<UserAccount>({
  user: {
    id: '',
    birthDate: '',
    email: '',
    name: '',
    phoneNumber: '',
  },
});

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const user = useReactiveVar(userVar);
  const prevUser = usePrevious(user);
  const [getUser, { loading, data }] = useLazyQuery<IGetUser>(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (_data) => {
      if (user) {
        userVar({
          ...user,
          accounts: _data.user.accounts,
          selectedAccount: _data.user.accounts[0],
        });
      }
    },
  });
  const location = useLocation();

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
            birthDate: userIdResponse.attributes.birthdate,
            phoneNumber: userIdResponse.attributes.phone_number,
          },
        });
        return;
      }
    }
    history.push('/auth/login');
  };

  useEffect(() => {
    Promise.resolve(getUserOrRedirectToLogin());
  }, [location.pathname]);

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
        !data?.user.accounts.length && !loading
        && <CreateAccount />
      }
      {
        data?.user.accounts.length && (
          <Switch>
            <h2>hi</h2>
          </Switch>
        )
      }
    </Route>
  );
};

export default Dashboard;
