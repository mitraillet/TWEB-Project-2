import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { Button, FormGroup, FormControlLabel, Checkbox, TextField } from '@material-ui/core';


const inputStyles = { marginTop: 10};
const buttonStyles = { maxWidth: 300, margin: 'auto'};
const wellStyles = { maxWidth: 300, margin: 'auto'};

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <AuthContext>
      {({ error, user, signIn }) => {

        if (user) {
          return <Redirect to="/" />;
        }
        let errorTemplate;
        if (error) {
          errorTemplate = <p className="text-center alert alert-danger mt-2">{error}</p>;
        }
        const onSubmit = (e) => {
          e.preventDefault();
          signIn({ email, password });
        };

        return (
          <React.Fragment>
            <form style={wellStyles} className="mt-1" onSubmit={onSubmit}>
              <h1 className="text-center">Login</h1>
                <FormGroup>
                  <TextField
                    required
                    id="outlined-email-input"
                    label="Email"
                    value={email}
                    fullWidth
                    variant="outlined"
                    type="email"
                    name="email"
                    autoComplete="email"
                    style={inputStyles}
                    onChange={e => setEmail(e.target.value)}
                    />

                  <TextField
                    required
                    type="password"
                    id="outlined-required" 
                    label="Password"
                    value={password}
                    fullWidth
                    variant="outlined"
                    style={inputStyles}
                    onChange={e => setPassword(e.target.value)} />
                </FormGroup>

                  {errorTemplate}

                <FormGroup>
                  <FormControlLabel 
                      control={
                        <Checkbox
                        color="primary" />
                      }
                      label="Remember me"
                  />
                </FormGroup>

                <FormGroup>
                  <Button variant="contained" type="submit" style={buttonStyles} >
                      Se connecter
                  </Button>
                  <a href="#.com">Vous n’avez pas de compte ? Inscrivez-vous</a>
                </FormGroup>
            </form>
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
