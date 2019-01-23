import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});


class ProjectCreationPage extends React.Component {

  state = {
    name : "",
    amount : "",
    description : "",
    timeEstimated : "",
    technologies : "",
    deadline: "",
    customer: null,
    customerSet: false
  }

  setCustomer(id) {
    this.setState({customer:id,customerSet:true});
  }

  createNewProject() {
    const { classes } = this.props;

    const create = () => (
      <Query query={customerQuery}>
         {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;

        if(!this.state.customerSet){
          this.setState({customerSet:true, customer: data.users.filter( e => {return e.email === data.me.email})[0]._id})
        }
        return (
          <div>
          {projectCreation(data.users.filter( e => {return e.email === data.me.email})[0]._id)}
          </div>
        )
        }}
        
      </Query>
    )

    const projectCreation = (id) => {
      return (
        <Mutation mutation={projectCreationMutation}>
          {(createProject, { data }) => (

          
          
          <div className={classes.container}>
            <Paper className={classes.root} >


              <Typography component="h1" variant="h5">
                Proposer un projet
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Nom</InputLabel>
                  <Input  
                    autoFocus
                    onChange={e => this.setState({name:e.target.value})} 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Description</InputLabel>
                  <Input 
                    onChange={e => this.setState({description:e.target.value})} 
                  />
                </FormControl>
                
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Amount</InputLabel>
                  <Input 
                    type="number"
                    onChange={e => this.setState({amount:e.target.value})} 
                  />
                </FormControl>
                
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Temps estimé</InputLabel>
                  <Input 
                    type="date"
                    onChange={e => this.setState({timeEstimated:e.target.value})} 
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Deadline</InputLabel>
                  <Input 
                    type="date"
                    onChange={e => this.setState({deadline:e.target.value})} 
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Technologies</InputLabel>
                  <Input 
                    onChange={e => this.setState({technologies:e.target.value})} 
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      const project = {
                        name : this.state.name,
                        amount : this.state.amount,
                        description : this.state.description,
                        timeEstimated : this.state.timeEstimated,
                        technologies : this.state.technologies,
                        deadline: this.state.deadline,
                        status: "Proposed",
                        customer: id
                      }
                      if(true) {
                        console.log(id)
                        createProject({ variables: { project }})
                        //window.location= '/projects';
                      }
                    }
                  }
                >
                  Créer un projet
                </Button>

                
              </form>
              
            </Paper>
          </div>
          
          )
              }
        </Mutation>
      );
    };

    return (
      <AuthContext>
        {() => {
          return create();

        }}
      </AuthContext>
    )
  }

  render() {
    return this.createNewProject();
  }
}


const projectCreationMutation = gql`
  mutation($project: CreateProjectInput!) {
    createProject(project: $project) {
      name
    }
  }
`;

const customerQuery = gql`
query {
  users{
    email,
    _id
  },
  me {
    email
  }
}
`;

ProjectCreationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ProjectCreationPage));
