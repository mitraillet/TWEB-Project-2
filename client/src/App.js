import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Conversations from './Conversations';

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
    <ProtectedRoute path="/profil" component={LoginPage} />
    <ProtectedRoute path="/conversations" component={Conversations} />
    <ProtectedRoute path="/projects" component={LoginPage} />
    <ProtectedRoute path="/propositions" component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={LoginPage} />
  </Switch>
);
// ProtectedRoute
