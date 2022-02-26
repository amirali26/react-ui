import { CognitoUser } from '@aws-amplify/auth/lib';
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import VerifiedAccount from './components/organisms/Accounts/VerifiedAccount';
import AuthContext from './context/AuthContext';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
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
          <Route path="/activate/firm/:id">
            <VerifiedAccount />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </AuthContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
