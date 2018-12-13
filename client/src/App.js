import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { Button, FormGroup, FormControl, Checkbox, TextField } from '@material-ui/core';

const inputStyles = { maxWidth: 300, margin: 'auto', marginTop: 10, height: 50, fontSize: 20 };
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
        let errorTemplate;
        if (error) {
          errorTemplate = <row className="text-center alert alert-danger">{error}</row>;
        }
        const onSubmit = (e) => {
          e.preventDefault();
          signIn({ username, password });
        };

        return (
          <React.Fragment>
            <React.Fragment style={wellStyles} className="mt-1">
              <h1 className="text-center">Login</h1>
              <form horizontal onSubmit={onSubmit}>    
                <FormGroup>
                  <TextField
                    id="outlined-full-width"
                    label="Username"
                    style={inputStyles}
                    placeholder="Username" 
                    value={username}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={e => setUsername(e.target.value)}
                    />

                  <TextField type="password" 
                    label="Password"
                    style={inputStyles}
                    placeholder="Password"
                    value={password}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={e => setPassword(e.target.value)} />
                </FormGroup>

                  {errorTemplate}

                <FormGroup className="text-center">
                  <row>
                    <Checkbox>Remember me</Checkbox>
                  </row>
                </FormGroup>

                <FormGroup className="text-center">
                  <row>
                    <Button type="submit">Se connecter</Button>
                  </row>
                </FormGroup>

                <FormGroup className="text-center">
                  <row>
                    <a href="#.com" >Vous n’avez pas de compte ? Inscrivez-vous</a>
                  </row>
                </FormGroup>
              </form>
            </React.Fragment>
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
