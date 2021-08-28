import { CognitoUser } from '@aws-amplify/auth/lib';
import {
  createContext, useContext, Dispatch, SetStateAction,
} from 'react';

interface IAuthContext {
    user?: CognitoUser;
    setUser: Dispatch<SetStateAction<CognitoUser | undefined>>;
}

const AuthContext = createContext<IAuthContext>({
  setUser: () => 2,
});

export default AuthContext;

export const useAuthContext = (): {
    user?: CognitoUser
    setUser: Dispatch<SetStateAction<CognitoUser | undefined>>;
} => {
  const authContext = useContext(AuthContext);

  return {
    user: authContext.user,
    setUser: authContext.setUser,
  };
};
