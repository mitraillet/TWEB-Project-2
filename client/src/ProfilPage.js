import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { NavLink, withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

function ProfilPage(props) {
  const { classes } = props;

  return (
    <AuthContext>
      {({ signOut }) => (
        <div className={classes.container}>
          <Paper className={classes.root} elevation={1}>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3"> 
              Mon Profil
              </Typography>
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <TextField label="Username" value="wwk" />            
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <TextField label="First Name" value="wwk" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <TextField label="Last Name" value="wwk" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <TextField label="Email" value="wwk" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <TextField label="Company" value="wwk" />
            </Paper>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3">
              Technologies
              </Typography>
            </Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sauver les modifications
            </Button>
          </Paper>
        </div>
      )}
      </AuthContext>
  );
}

ProfilPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ProfilPage));
