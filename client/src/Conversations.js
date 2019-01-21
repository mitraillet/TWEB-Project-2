import React from 'react';
import { AuthContext } from './AuthProvider';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';

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

function Conversations(props) {
  const { classes } = props;

  const conversationRecuperation = () => (
    <Query
      query={conversation}
    >
      {({ data, loading }) => {
        if (loading) return null;

        console.log(data)
        let porpositionMessages = null ;
        let applicationMessages = null ;
        if (data.me.applications) { 
          applicationMessages = data.me.applications.map(application => {
            return ( 
              <Paper className={classes.root} elevation={1} key={application.project._id}>
                <Typography variant="h5" component="h3"> 
                  {application.project.name}
                </Typography>
              </Paper>
            )
          })
        }
        if (data.me.projectsProposed) { 
          porpositionMessages = data.me.projectsProposed.map(project => {
            return (
              <Paper className={classes.root} elevation={1} key={project._id}>
                <Typography variant="h5" component="h3"> 
                  {project.name}
                </Typography>
              </Paper>
              )
          })
        }
        return (
          <Paper className={classes.container} elevation={1}>
            <Paper className={classes.title} elevation={1}>
                <Typography className={classes.root2} variant="h2" component="h2"> 
                  Conversation
                </Typography>
              </Paper>
            {applicationMessages}
            {porpositionMessages}
          </Paper>
        )
      }
    }
    </Query>
  );


  return (
    <AuthContext>
      {({ user }) => {
        return conversationRecuperation({applicationId: user.applicationId});

      }}
    </AuthContext>
  )
}

const conversation = gql`
query {
  me{
    projectsProposed { 
      name
      applications { 
      messages{body} }
    }
    applications { 
    project{name}
    messages{body}
    }
  }
}
`;

export default withStyles(styles)(Conversations);