import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Conversations from './Conversations';
import MainPage from './MainPage';
import ProfilPage from './ProfilPage';

// Suppress it when it's finish and protected route is reasign
// eslint-disable-next-line
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(params) => (
      <AuthContext>
        {({user}) => user
          ? <Component {...params} />
          : <Redirect to={"/login?fromUrl="+ params.location.pathname }/>}
      </AuthContext>
  )}
  />
)

export default () => (
  <Switch>
    <ProtectedRoute path="/" exact component={HomePage} />
    <ProtectedRoute path="/profil" component={ProfilPage} />
    <ProtectedRoute path="/conversations" component={Conversations} />
    <ProtectedRoute path="/projects" component={LoginPage} />
    <ProtectedRoute path="/propositions" component={MainPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={LoginPage} />
  </Switch>
);
// ProtectedRoute
