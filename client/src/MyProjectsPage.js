import React from 'react';
import { AuthContext } from './AuthProvider';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import { NavLink, withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margingTop: theme.spacing.unit * 2,
    margingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  root2: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'white',
  },
  title: {
      display: 'block',
      backgroundColor: '#3f51b5',
      margingBottom: theme.spacing.unit * 2,
  },
  container: {
    marginTop: theme.spacing.unit * 5,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

function MyProjects(props) {
  const { classes } = props;

  const myProjectsRecuperation = () => (
    <Query
      query={projects}
    >
      {({ data, loading, error }) => {
        if (loading) return (
          <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3">
                  Loading...
              </Typography>
          </Paper>
        );

        if (error || data.me.projectsApplicable === null) return (
          <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3">
                  Error...
              </Typography>
          </Paper>
        );

        let projects = null ;
        if (data.me.projectsProposed && data.me.projectsProposed.length > 0) { 
          projects = data.me.projectsProposed.map(project => {
            return ( 
              <Paper className={classes.root} elevation={1} key={project._id}>
                <Typography variant="h5" component="h3"> 
                  {project.name}
                </Typography>
              </Paper>
            )
          })
        } else {
          projects = (
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3"> 
                  Pas de projet pour l'instant
                </Typography>
              </Paper>
            )
          
        }
        
        return (
          <Paper className={classes.container} elevation={1}>
            <Paper className={classes.title} elevation={1}>
              <Typography className={classes.root2} variant="h2" component="h2"> 
                Mes Projets
              </Typography>
            </Paper>
            
            {projects}
            
            <Paper className={classes.title} elevation={1}>
              <NavLink to='/submitProject'>
                <Typography className={classes.root2}  variant="h5" component="h3">
                   Nouveau projet
                </Typography>
              </NavLink>
            </Paper>

          </Paper>
        )
      }
    }
    </Query>
  );


  return (
    <AuthContext>
      {({ user }) => {
        return myProjectsRecuperation({applicationId: user.applicationId});

      }}
    </AuthContext>
  )
}

const projects = gql`
query {
  me{
    projectsProposed { 
      name
      applications { 
      messages{body} 
      }
    }
  }
}
`;

export default withStyles(styles)(withRouter(MyProjects));