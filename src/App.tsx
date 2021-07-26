import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import { Container, makeStyles } from 'helpmycase-storybook/dist/components/External';
import Quote from './components/pages/Quote';
import logoPNG from './assets/images/logoPNG.png';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 0',
    '& .logo': {
      width: '256px',
      height: 'auto',
      position: 'relative',
      '& img': {
        position: 'relative',
        width: '100%',
        height: 'auto',
      },
    },
  },
}));

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <Container maxWidth="md" className={styles.root}>
      <div className="logo">
        <img src={logoPNG} alt="HelpMyCase logo" />
      </div>
      <Switch>
        <Quote />
      </Switch>
    </Container>
  );
};

export default App;
