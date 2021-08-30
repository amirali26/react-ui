import { SnackbarProvider } from 'notistack';
import { CognitoUser } from '@aws-amplify/auth/lib';
import { Container, makeStyles } from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthContext from './context/AuthContext';
import Auth from './pages/Auth';

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
        <Container maxWidth="lg" className={styles.root}>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/dashboard">
              <h2>hi</h2>
            </Route>
            <Redirect to="/auth" />
          </Switch>
        </Container>
      </AuthContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
