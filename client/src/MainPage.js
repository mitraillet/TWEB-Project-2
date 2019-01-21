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
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  container: {
    marginTop: theme.spacing.unit * 2,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

function MainPage(props) {
  const { classes } = props;

  return (
    <AuthContext>
      {({ signOut }) => (
        <div className={classes.container}>

          {
            //prev button
          }
          <Paper className={classes.root}  elevation={1}>
            <NavLink to='/'>
              <Typography variant="h5" component="h3"> 
                  Prev
              </Typography>
            </NavLink>
          </Paper>          

          {//globale
          }
          <Paper className={classes.root} elevation={1}>

            {//first 2 button
            }
            <div className={classes.container}>

              {//two horiz button
              }
              <Paper className={classes.root} elevation={1}>
                  <NavLink to='/'>
                  <Typography variant="h5" component="h3"> 
                      Non interessé
                  </Typography>
                  </NavLink>
              </Paper>
              <Paper className={classes.root} elevation={1}>
                  <NavLink to='/'>
                  <Typography variant="h5" component="h3">
                      Mettre en attente
                  </Typography>
                  </NavLink>
              </Paper>
            </div>

            
            {//partie centrale
            }
            <Paper className={classes.root}>
              <Paper className={classes.root} elevation={1}>
                  <Typography variant="h5" component="h3">
                      Titre
                  </Typography>
              </Paper>
              <Paper className={classes.root} elevation={1}>
                  <Typography variant="h5" component="h3">
                      Description
                  </Typography>
              </Paper>

              <div className={classes.container}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Budget
                    </Typography>
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Mandant
                    </Typography>
                </Paper>
              </div>


              <div className={classes.container}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        JS
                    </Typography>
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        React
                    </Typography>
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        GraphQL
                    </Typography>
                </Paper>
              </div>

            </Paper>

            {//last button
            }
            <Paper className={classes.root} elevation={1}>
                <NavLink to='/'>
                <Typography variant="h5" component="h3">
                    Entrer en relation
                </Typography>
                </NavLink>
            </Paper>
          </Paper>

          {
            //prev button
          }
          <Paper className={classes.root} elevation={1}>
            <NavLink to='/'>
              <Typography variant="h5" component="h3"> 
                  Next
              </Typography>
            </NavLink>
          </Paper>

        </div>
      )}
      </AuthContext>
  );
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(MainPage));
