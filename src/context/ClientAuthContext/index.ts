import { CognitoUser } from '@aws-amplify/auth/lib';
import {
  createContext, useContext, Dispatch, SetStateAction,
} from 'react';

interface IClientAuthContext {
    user?: CognitoUser;
    setUser: Dispatch<SetStateAction<CognitoUser | undefined>>;
}

const ClientAuthContext = createContext<IClientAuthContext>({
  setUser: () => 2,
});

export default ClientAuthContext;

export const useClientAuthContext = (): {
    user?: CognitoUser
    setUser: Dispatch<SetStateAction<CognitoUser | undefined>>;
} => {
  const clientAuthContext = useContext(ClientAuthContext);

  return {
    user: clientAuthContext.user,
    setUser: clientAuthContext.setUser,
  };
};
