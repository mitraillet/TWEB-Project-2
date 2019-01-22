import React, {Component} from 'react';
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
    width: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

class Messages extends Component {

  state = {
    titreConversation: null,
    messagesConversation: []
  }
  
  componentDidMount() {
    let id = this.props.match.params.post_id;
    this.props.client.query({
      query: message,
      variables: {id: id},
    }).then(({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      this.setState({titreConversation:data.application.project.name}); 
      this.setState({messagesConversation:data.application.messages}); 
      console.log(this.state.messagesConversation[0].body);
    })
  }
  
  render() {
    const { classes } = this.props;
    const message = this.state.messagesConversation.length ? (
      this.state.messagesConversation.map( msg =>
      (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="p" component="p"> 
            {msg.body}
          </Typography>
        </Paper>)
      )
    ) : (
      <Paper> Loading content </Paper>
    );
  
    return (
      <AuthContext>
      {({ user }) => {

        return (
          <Paper className={classes.container} elevation={1}>
            <Paper className={classes.title} elevation={1}>
                <Typography className={classes.root2} variant="h2" component="h2"> 
                  {this.state.titreConversation}
                </Typography>
              </Paper>
            {message}
          </Paper>
        ) 
      }}
      </AuthContext>
    )
  }
}

const message = gql`
query ($id: ID!){
  application (_id: $id) {
    project {name}
    messages {body}
  }
}`;

export default compose(
withApollo,
graphql(message, {options: (props) => ({ variables : {id: props.match.params.post_id}})}),
withStyles(styles)
)(Messages);
