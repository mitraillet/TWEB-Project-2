import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Conversations from './Conversations';
import MainPage from './MainPage';
import ProfilPage from './ProfilPage';
import Messages from './Messages';
import MyProjects from './MyProjectsPage'
import RegistrationPage from './RegistrationPage';
import ProjectCreationPage from './ProjectCreationPage';

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
    <ProtectedRoute path="/projects" component={MyProjects} />
    <ProtectedRoute path="/propositions" component={MainPage} />
    <ProtectedRoute path="/submitProject" component={ProjectCreationPage} />
    <ProtectedRoute path="/Messages/:post_id" component={Messages} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegistrationPage} />
  </Switch>
);
// ProtectedRoute
