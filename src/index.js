import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Dashboard from '../src/Components/dashboard/Dashboard';
import Login from '../src/Components/login/Login';

ReactDOM.render(
  <React.StrictMode>
    {/* <Switch> */}
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login}></Route>
        <Route path='/dashboard' component={Dashboard} exact></Route>
      </Switch>
    </BrowserRouter>
    {/* </Switch> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
