import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Quote from './components/pages/Quote';

const App: React.FC = () => (
  <Switch>
    <Quote />
    <Dashboard />
  </Switch>
);

export default App;
