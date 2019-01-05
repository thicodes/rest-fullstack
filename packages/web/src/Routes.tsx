import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  WithRouter,
} from 'react-router-dom';

import { isAuthenticated } from './auth';
import Login from './components/Login';
import UserCreate from './components/UserCreate';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import Admin from './components/Admin';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={UserList} />
    </Switch>
  </Router>
);

export default Routes;
