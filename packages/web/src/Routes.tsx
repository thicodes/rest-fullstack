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
import Home from './components/Home';
import UserCreate from './components/UserCreate';
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
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/users/create" exact component={UserCreate} />
      <PrivateRoute path="/admin" exact component={Admin} />
    </Switch>
  </Router>
);

export default Routes;
