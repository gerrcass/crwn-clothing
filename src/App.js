import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router'
import HomePage from './pages/homepage/homepage.component'

const Pa = () => (
  <h1>Hellooo</h1>
)
function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop/hats' component={Pa} />
      </Switch>

      
    </div>
  );
}

export default App;
