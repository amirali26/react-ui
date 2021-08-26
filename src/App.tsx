import { Container, makeStyles } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Logo from './components/atoms/Logo';
import Login from './components/pages/Login';
import Quote from './components/pages/Quote';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '32px',
    paddingBottom: '32px',
  },
}));

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <Container maxWidth="lg" className={styles.root}>
      <Logo />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {/* <Quote /> */}
      </Switch>
    </Container>
  );
};

export default App;
