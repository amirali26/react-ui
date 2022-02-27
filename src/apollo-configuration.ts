import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';
import { userVar } from './pages/Dashboard';
import environmentVars from './utils/env.variables';

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let authorization = '';
  try {
    const token = await Auth.currentSession();
    authorization = `Bearer ${token && token.getAccessToken().getJwtToken()}`;
  } catch {
    authorization = 'none';
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization,
      accountid: userVar() ? userVar().selectedAccount?.id : 'none',
    },
  };
});

const splitLink = authLink.concat(
  createHttpLink({ uri: `${environmentVars.REACT_APP_API_URL}/graphql` }),
);

export default splitLink;
