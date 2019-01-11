import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { NavLink, withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  container: {
    marginTop: theme.spacing.unit * 5,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

function HomePage(props) {
  const { classes } = props;

  return (
    <AuthContext>
      {({ signOut }) => (
        <div className={classes.container}>
          <Paper className={classes.root} elevation={1}>
            <NavLink to='/profil'>
              <Typography variant="h5" component="h3"> 
                Mon Profil
              </Typography>
            </NavLink>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <NavLink to='/conversations'>
              <Typography variant="h5" component="h3">
                Conversations
              </Typography>
            </NavLink>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <NavLink to='/projects'>
              <Typography variant="h5" component="h3">
                Mes Projets
              </Typography>
            </NavLink>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <NavLink to='/propositions'>
              <Typography variant="h5" component="h3">
                Propositions
              </Typography>
            </NavLink>
          </Paper>
          <Paper className={classes.root} elevation={1}>
            <NavLink to=''>
              <Typography variant="h5" component="h3" onClick={signOut}>
                Se déconnecter
              </Typography>
            </NavLink>
          </Paper>
        </div>
      )}
      </AuthContext>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(HomePage));
