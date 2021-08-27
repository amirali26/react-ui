import { Auth, Hub } from 'aws-amplify';
import Button from 'helpmycase-storybook/dist/components/Button';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import routes from '../../utils/routes/routes';
import Navigation from '../../components/templates/Navigation';

const Dashboard: React.FC = () => {
  const x = 2;

  const handleLoginWithGoogle = async () => {
    const response = await Auth.federatedSignIn(
      {
        provider: 'Google' as any,
        customState: 'something wonderful',
      },
    );
  };

  useEffect(() => {
    (async () => {
      await Hub.listen('auth', (data) => {
        console.log(data, 'amir');
      });
    })();
  });

  return (
    <Route path={[routes.dashboard, routes.base]}>
      <Navigation />
      <Button variant="text" color="default" onClick={handleLoginWithGoogle}>
        Something wonderful
      </Button>
    </Route>
  );
};

export default Dashboard;
