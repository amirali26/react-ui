import { createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Auth } from 'aws-amplify';
import { userVar } from './pages/Dashboard';

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (await Auth.currentSession()).getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token.getJwtToken(),
      accountid: userVar().selectedAccount?.id,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
    );
  },
  // authLink.concat(createHttpLink({ uri: 'http://localhost:8080/graphql' })),
  authLink.concat(createHttpLink({ uri: 'https://dashboard-api.helpmycase.co.uk/graphql' })),
);

export default splitLink;
