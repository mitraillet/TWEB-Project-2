import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

// Suppress it when it's finish and protected route is reasign
// eslint-disable-next-line
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(params) => (
      <AuthContext>
        {({user}) => user
          ? <Component {...params} />
          : <Redirect to="/login" />}
      </AuthContext>
  )}
  />
)

export default () => (
  <Switch>
    <ProtectedRoute path="/" exact component={HomePage} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);
// ProtectedRoute
