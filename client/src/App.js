import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { Button, FormGroup, FormControl, ControlLabel, Checkbox, Col, Form, Well } from 'react-bootstrap';

const inputStyles = { maxWidth: 300, margin: 'auto', height: 50, 'font-size': 20 };
const wellStyles = { maxWidth: 500, margin: 'auto'};

const HomePage = () => (
  <AuthContext>
    {({ signOut }) => (
      <div>
        <h1>Welcome !</h1>
        <Button onClick={signOut}>LOGOUT</Button>
      </div>
    )}
  </AuthContext>
);

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthContext>
      {({ error, user, signIn }) => {

        if (user) {
          return <Redirect to="/" />;
        }

        const onSubmit = (e) => {
          e.preventDefault();
          signIn({ username, password });
        };

        return (
          <React.Fragment>
            <Well style={wellStyles} className="mt-1">
              <h1 className="text-center">Login</h1>
              <Form horizontal onSubmit={onSubmit}>
                <FormGroup componentClass={ControlLabel}>
                  <Col>
                    <FormControl type="text" placeholder="Username" 
                      value={username}
                      style={inputStyles}
                      onChange={e => setUsername(e.target.value)}/>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col lg>
                    <FormControl type="password" placeholder="Password" 
                      value={password}
                      style={inputStyles}
                      onChange={e => setPassword(e.target.value)} />
                  </Col>
                </FormGroup>

                <Col className="text-center alert alert-danger">
                  {error}
                </Col>

                <FormGroup className="text-center">
                  <Col>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup className="text-center">
                  <Col>
                    <Button type="submit">Se connecter</Button>
                  </Col>
                </FormGroup>

                <FormGroup className="text-center">
                  <Col>
                    <a href="#.com" >Vous n’avez pas de compte ? Inscrivez-vous</a>
                  </Col>
                </FormGroup>
              </Form>
            </Well>
          </React.Fragment>
        )
      }}
    </AuthContext>
  )
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(params) => (
    <AuthContext>
      {({ user }) => user
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
