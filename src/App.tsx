import Button from 'helpmycase-storybook/dist/components/Button';
import React from 'react';
import './App.css';
import Navigation from './components/templates/Navigation';

const App: React.FC = () => (
  <>
    <Navigation />
    <Button variant="text" color="primary">
      Something wonderful
    </Button>
  </>
);

export default App;
