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

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: 'eyJraWQiOiJWREI1STJ3VExKaklcL2N6T2FmUmp4M1wvbXVYYTl1UFJZNDZySEVzOENBZ3M9IiwiYWxnIjoiUlMyNTYifQ.eyJvcmlnaW5fanRpIjoiODdkZWVkMjctY2FhNS00OTA2LWI4MmItMjY4OTQyMzMyNzA3Iiwic3ViIjoiOWVjZTkzMTEtMDU1OC00M2E1LWI0NGEtNjNjMTA5NzQ2OTcwIiwiZXZlbnRfaWQiOiI3MDBiNjU0OS03YmZkLTQ1ZjktOTljYy01YzU4ZDk0OWEzNTEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjMxNzg3MTc0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV84eHVIVnRtTjMiLCJleHAiOjE2MzE4MzI3NjgsImlhdCI6MTYzMTgyOTE2OCwianRpIjoiMWE4ZDFiZTUtYTQyOC00NTQ5LTg4NjctN2E0NmEzODdjZmY4IiwiY2xpZW50X2lkIjoiNW91Y200c2o5dTFqZGhiZDVpNnNsMGxtb2YiLCJ1c2VybmFtZSI6IjllY2U5MzExLTA1NTgtNDNhNS1iNDRhLTYzYzEwOTc0Njk3MCJ9.BNWFAUzipouJ-vE3qvyuslWEwG7BNClaNED_LT6vOUl2L8mcWk50ZXppsKH336J022P-ha_O7D5BsNE8Wi8vo8cfa-kW38AF3RXDlpPE-Gc0yYwtsuCF1OQFWsD2sIlBNnD4zjXffycYGe60Bc390RLN4jDoWqLF0l39A5FiL2rD63GPnFWk1bvQAPk1uUvOkmUKOf6-U5Q0EbZzF_LvCdUg1qHzeG1JH7sDDLS-hXZS1Ax3rJy2PeutUattgLPr3nZZySUJleXNbgPkGs4sNZtzlE4frRSTSYVh7hCVrd2v5ncvBXu-DT8NdwkfpZKkuNANE3nyHBxEW2DKd5m11Q',
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(createHttpLink({ uri: 'http://localhost:8080/graphql' })),
);

export default splitLink;
