import Auth, { CognitoUser } from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Modal from '../../components/molecules/modal';
import ClientAppBar from '../../components/organisms/AppBar/Client';
import ClientAuth from '../../components/organisms/Client/Auth';
import Requests from './Requests';
import ClientAuthContext from '../../context/ClientAuthContext';

const Client: React.FC = () => {
  const [user, setUser] = useState<CognitoUser>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await Auth.currentSession();
      if (response) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })();
  }, [user]);
  return (
    <ClientAuthContext.Provider value={{ user, setUser }}>
      <Modal open={!loggedIn} handleClose={() => 1}>
        <ClientAuth />
      </Modal>
      <ClientAppBar />
      <Route path="/client/requests" component={Requests} />
      <Route path="/client/requests/:id" component={Requests} />
    </ClientAuthContext.Provider>
  );
};

export default Client;
