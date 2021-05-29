import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';

import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
