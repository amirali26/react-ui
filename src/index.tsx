import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Amplify, { Auth } from 'aws-amplify';
import { ThemeProvider } from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import amplifyConfiguration from './utils/awsExports';
import history from './utils/routes/history';

Amplify.configure(amplifyConfiguration);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (await Auth.currentSession()).getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token.getJwtToken(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: 'http://localhost:8080/graphql' })),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
