import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TextField, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

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


function RegistrationPage(props) {
  const { classes } = props;

  const registerUser = (user) => {

    let firstName = "toto";
    let mail = "toto@tata.com";
    let lastName = "tata";
    let company = "Toto CORP";
    let pass1 = "tata";
    let pass2 = "tata";

    return (
      <Mutation mutation={registrationMutation}>
        {(createUser, { data }) => (
        

          

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
                  firstName: firstName,
                  lastName: lastName,
                  email: mail,
                  company: company,
                  password: pass1
                }
                console.log(user);
                createUser({ variables: { user }})
              }
            }
          >
            Créer compte
          </Button>
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
