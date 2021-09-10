import { useLazyQuery } from '@apollo/client';
import { ReportProblemOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import BigMessage from '../../components/molecules/bigMessage';
import Navigation from '../../components/templates/Navigation';
import { GET_USER } from '../../queries/user';
import history from '../../utils/routes/history';
import routes from '../../utils/routes/routes';
import useAuth from '../Auth/useAuth';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const [getUser, { loading, error, data }] = useLazyQuery<{
    user: {
      id: string,
      name: string,
      accounts: any[],
    }
  }>(GET_USER);
  const location = useLocation();

  const getUserOrRedirectToLogin = async (): Promise<void> => {
    const userId = await isLoggedIn();
    if (!userId) {
      history.push('/auth/login');
    }

    getUser({ variables: { userId } });
  };

  useEffect(() => {
    Promise.resolve(getUserOrRedirectToLogin());
  }, [location.pathname, data]);

  return (
    <Route path={[routes.dashboard, routes.base]}>
      <Navigation />
      {
        !data?.user.accounts.length
          ? (
            <BigMessage
              icon={<ReportProblemOutlined />}
              title="No Account Found"
              subtitle="Your user is not currently associated with any accounts, please click on the button below to create a free account"
              buttonProps={{
                children: 'Create an account',
              }}
            />
          )
          : (
            <Switch>
              <h2>hi</h2>
            </Switch>
          )
      }
    </Route>
  );
};

export default Dashboard;
