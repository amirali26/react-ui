import Auth, { CognitoUser } from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../../components/molecules/modal';
import ClientAppBar from '../../../components/organisms/AppBar/Client';
import ClientAuth from '../../../components/organisms/Client/Auth';
import ClientAuthContext from '../../../context/ClientAuthContext';

const Enquiries: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<CognitoUser>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await Auth.currentSession();
      if (response) {
        setLoggedIn(true);
      }
    })();
  }, [user]);

  if (!id) return null;

  return (
    <ClientAuthContext.Provider value={{ user, setUser }}>
      <Modal open={!loggedIn} handleClose={() => 1}>
        <ClientAuth />
      </Modal>
      <ClientAppBar />
      <div className="marginTop marginBottom" style={{ marginLeft: '24px', marginRight: '24px' }} />
    </ClientAuthContext.Provider>
  );
};

export default Enquiries;
