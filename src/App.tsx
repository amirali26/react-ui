import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/pages/Dashboard';

const App: React.FC = () => (
  <Switch>
    <Dashboard />
    <Route path="/login">
      <div>What would you like?</div>
    </Route>
  </Switch>
);

export default App;
