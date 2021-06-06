import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'helpmycase-storybook/dist/components/External';
import { BrowserRouter } from 'react-router-dom';
import theme from 'helpmycase-storybook/dist/theme/theme';
import Amplify from 'aws-amplify';

import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import amplifyConfiguration from './awsexports';

Amplify.configure(amplifyConfiguration);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
