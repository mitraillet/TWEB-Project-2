import React, {Component} from 'react';
import { AuthContext } from './AuthProvider';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { graphql, withApollo, compose } from 'react-apollo';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

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
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  container: {
    marginTop: theme.spacing.unit * 5,
    width: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textInput: {
    width: '80%',
  },
  iconButton: {
    width: '10%',
  }
});

class Messages extends Component {

  state = {
    titreConversation: null,
    messagesConversation: [],
    messageContent: null
  }
  
  onSend = () => {

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
    })
  }
  
  render() {
    const { classes } = this.props;
    const message = this.state.messagesConversation.length ? (
      this.state.messagesConversation.map( msg =>
      (
        <Paper className={classes.root} elevation={1} key={msg._id}>
          <Typography variant="h6" component="h6"> 
            {msg.body}
          </Typography>
        </Paper>)
      )
    ) : (
      <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3"> 
            Loading content...
          </Typography>
        </Paper>
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

            <Paper className={classes.root} elevation={1}>
              <form className={classes.form} onSubmit={this.onSend}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="text">Réponse</InputLabel>
                    <Input 
                      id="text"
                      name="text" 
                      value={this.state.messageContent} 
                      autoFocus
                      className={classes.textInput}
                    /> 
                    <IconButton
                      type="submit"
                      color="inherit" 
                      className={classes.iconButton}>
                      <Send />
                    </IconButton>
                  </FormControl>
                </form>
            </Paper>
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
    messages {
      _id
      body
    }
  }
}`;

export default compose(
withApollo,
graphql(message, {options: (props) => ({ variables : {id: props.match.params.post_id}})}),
withStyles(styles)
)(Messages);
