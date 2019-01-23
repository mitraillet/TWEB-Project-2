import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
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


class RegistrationPage extends React.Component {

  state = {
    firstName :"toto",
    mail : "toto@tata.com",
    lastName : "tata",
    company : "Toto CORP",
    pass1 : "tata",
    pass2 : "titi",
    disabled: true,
    textDisabled: ""
  }

  registrationPage() {
    const { classes } = this.props;

    const registerUser = (user) => {

      return (
        <Mutation mutation={registrationMutation}>
          {(createUser, { data }) => (
          
          <div className={classes.container}>
            <Paper className={classes.root} >
            
              <Typography component="h1" variant="h5">
                Enregistrer un compte
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Prénom</InputLabel>
                  <Input  
                    autoFocus
                    onChange={e => this.setState({firstName:e.target.value})} 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Nom de Famille</InputLabel>
                  <Input 
                    onChange={e => this.setState({lastName:e.target.value})} 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Adresse Email</InputLabel>
                  <Input 
                    name="email" 
                    onChange={e => this.setState({email:e.target.value})} 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="text">Compagnie</InputLabel>
                  <Input 
                    onChange={e => this.setState({company:e.target.value})} 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Mot de Passe</InputLabel>
                  <Input 
                    type="password" 
                    autoComplete="current-password" 
                    onChange={e => {
                      this.setState({pass1: e.target.value})
                      if(e.target.value !== this.state.pass2){
                        this.setState({disabled:true,textDisabled:"Entrer le même mot de pass"})
                      } else {
                        this.setState({disabled:false,textDisabled:""})
                      }
                    }}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Répéter Mot de Passe</InputLabel>
                  <Input 
                    type="password" 
                    autoComplete="current-password" 
                    onChange={e => {
                      this.setState({pass2: e.target.value})
                      if(this.state.pass1 !== e.target.value){
                        this.setState({disabled:true,textDisabled:"Entrer le même mot de pass"})
                      } else {
                        this.setState({disabled:false,textDisabled:""})
                      }
                    }}/>
                </FormControl>
                <Typography variant="h5" component="h3"> 
                  {this.state.textDisabled}
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      const user = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        company: this.state.company,
                        password: this.state.pass1
                      }
                      console.log(this.state.disabled)
                      if(!this.state.disabled) {
                        createUser({ variables: { user }})
                        window.location= '/login';
                      }
                    }
                  }
                >
                  Créer compte
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
          return registerUser();

        }}
      </AuthContext>
    )
  }

  render() {
    return this.registrationPage();
  }
}


const registrationMutation = gql`
  mutation($user: CreateUserInput!) {
    createUser(user: $user) {
      firstName
    }
  }
`;

RegistrationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(RegistrationPage));
