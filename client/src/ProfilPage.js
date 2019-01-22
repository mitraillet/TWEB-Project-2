import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
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


function ProfilPage(props) {
  const { classes } = props;

  const updateProfile = (_id, user) => {
    return (
      <Mutation mutation={profilMutation}>
        {(updateUser, { data }) => (
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={
              (e) => {
                e.preventDefault();
                updateUser({ variables: { _id, user}})
              }
            }
          >
            Sauver les modifications
          </Button>
        )
        }
      </Mutation>
    );
  };

  const profilRecuperation = () => (
    <Query
      query={profil}
    >
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;

        let firstName = "...";
        let mail = "...";
        let lastName = "...";
        let company = "...";
        if(data.me.firstName)
          firstName = data.me.firstName;
        if(data.me.lastName)
          lastName = data.me.lastName;
        if(data.me.email)
          mail = data.me.email;
        if(data.me.company)
          company = data.me.company;
        return (
          <div className={classes.container}>
            <Paper className={classes.root} elevation={1}>
              <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3"> 
                Mon Profil
                </Typography>
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label="First Name" value={firstName} />
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label="Last Name" value={lastName} />
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label="Email" value={mail} />
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label="Company" value={company} />
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                Technologies
                </Typography>
              </Paper>
              
              
              {/*

                Pour l'instant marche pas, il faut pourvoir récup l'_id

                updateProfile(data.me._id, {
                  firstName: firstName,
                  lastName: lastName,
                  email: mail,
                  company: company
                  }) 
                */}
              
            </Paper>
          </div>
        )
        
        }
      }
    </Query>
  );

  return (
    <AuthContext>
      {({ signOut }) => {
        return profilRecuperation();

      }}
    </AuthContext>
  )
}

const profil = gql`
query {
  me{
    firstName,
    lastName,
    email,
    company,

  }
}
`;

const profilMutation = gql`
  mutation($_id: String!,$user: UpdateUserInput!) {
    updateUser(_id: $_id, user: $user) {
      firstName,
      lastName
    }
  }
`;

ProfilPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ProfilPage));
