import { Container, makeStyles } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';

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
      <Switch>
        <Route path="/login">
          <Auth />
        </Route>
        {/* <Quote /> */}
      </Switch>
    </Container>
  );
};

export default App;
