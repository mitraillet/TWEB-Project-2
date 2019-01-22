import React, { Component } from 'react';
import { AuthContext } from './AuthProvider';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { graphql, withApollo, compose } from 'react-apollo';
import {Link} from 'react-router-dom';

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

class Conversations extends Component{
  state = {
    titresConversationFromApplication: [],
    titresConversationFromProject: []
  }

  componentDidMount() {
    this.props.client.query({
      query: conversation,
    }).then(({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      this.setState({titresConversationFromApplication:data.me.applications}); 
      this.setState({titresConversationFromProject:data.me.projectsProposed});
    })
  }

  render() {
    const { classes } = this.props;
    const applicationMessages = this.state.titresConversationFromApplication.length ? (
      this.state.titresConversationFromApplication.map( application =>
        ( 
          <Link to={'/messages/' + application._id} key={application._id}>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3"> 
                {application.project.name}
              </Typography>
            </Paper>
          </Link>
        )
    )) : null;

    const propositionMessages = this.state.titresConversationFromProject.length ? (
      this.state.titresConversationFromProject.map(project => {
        return (
          <Link to={'/messages/' + project.application._id} key={project.application._id}>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3"> 
                {project.name}
              </Typography>
            </Paper>
          </Link>
          )
      }
    )) : null;

    const noMessage = (applicationMessages===null && propositionMessages === null) ? (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3"> 
            Pas de messages...
          </Typography>
        </Paper>
    ) : null;

    return (
      <AuthContext>
      {({ user }) => {
        return (
          <Paper className={classes.container} elevation={1}>
            <Paper className={classes.title} elevation={1}>
                <Typography className={classes.root2} variant="h2" component="h2"> 
                  Conversation
                </Typography>
              </Paper>
            {applicationMessages}
            {propositionMessages}
            {noMessage}
          </Paper>
        );
      }}
      </AuthContext>
    );
  }
}

const conversation = gql`
query {
  me{
    firstName
    lastName
    email
    company
    projectsProposed {
      name
      applications {  
        _id
      messages{body} }
    }
    applications {  
      _id
    project{
      name}
    messages{body}
    }
  }
}
`;

export default compose(
  withApollo,
  graphql(conversation),
  withStyles(styles)
  )(Conversations); 