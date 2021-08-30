import { SnackbarProvider } from 'notistack';
import { CognitoUser } from '@aws-amplify/auth/lib';
import { Container, makeStyles } from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthContext from './context/AuthContext';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '32px',
    paddingBottom: '32px',
  },
}));

const App: React.FC = () => {
  const styles = useStyles();
  const [user, setUser] = useState<CognitoUser>();

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </AuthContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
