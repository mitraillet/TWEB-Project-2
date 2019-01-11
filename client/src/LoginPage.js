import React, { useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink, withRouter } from 'react-router-dom'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  navLink: {
    width: 'auto',
    marginTop: theme.spacing.unit * 1,
  }
});


function LoginPage(props) {
  const { classes } = props;
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
          errorTemplate = <p className="text-center alert alert-danger mt-2">{error}</p>;
        }
        
        const onSubmit = (e) => {
          e.preventDefault();
          signIn({ username, password });
        };
        
        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Se connecter
              </Typography>
              <form className={classes.form} onSubmit={onSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Adresse Email</InputLabel>
                  <Input 
                    id="email"
                    name="email" 
                    autoComplete="email" 
                    value={username} 
                    autoFocus
                    onChange={e => setUsername(e.target.value)} 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Mot de Passe</InputLabel>
                  <Input 
                    name="password" 
                    type="password" 
                    id="password" 
                    value={password}
                    autoComplete="current-password" 
                    onChange={e => setPassword(e.target.value)}/>
                </FormControl>
                  {errorTemplate}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Se connecter
                </Button>
              </form>
              <NavLink to='/register'>
                <Typography className={classes.navLink} component="a" variant="subtitle1">
                  Vous n’avez pas de compte ? Inscrivez-vous
                </Typography>
              </NavLink>
            </Paper>
          </main>
        );
      }}
    </AuthContext>
  )
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(LoginPage));
