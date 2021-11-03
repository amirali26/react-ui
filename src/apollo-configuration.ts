import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';
import { userVar } from './pages/Dashboard';
import environmentVars from './utils/env.variables';

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (await Auth.currentSession()).getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token.getJwtToken()}`,
      accountid: userVar().selectedAccount?.id,
    },
  };
});

const splitLink = authLink.concat(createHttpLink({ uri: `${environmentVars.REACT_APP_API_URL}/graphql` }));

export default splitLink;
