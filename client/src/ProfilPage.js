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


class ProfilPage  extends React.Component {

constructor(props) {
  super(props)
  this.ProfilPage.bind(this)
}

state = {
  set: false,
  lastName: "",
  firstName: "",
  company: "",
  email: ""
}

ProfilPage() {
  const { classes } = this.props;

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

        if(!this.state.set && data.me.firstName && data.me.lastName && data.me.email && data.me.company)
          this.setState({
            lastName: data.me.lastName,
            firstName: data.me.firstName,
            email: data.me.email,
            company: data.me.company,
            set: true
          })
        

        return (
          <div className={classes.container}>
            <Paper className={classes.root} elevation={1}>
              <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3"> 
                Mon Profil
                </Typography>
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label={"First Name : "+this.state.firstName} onChange={e => this.setState({firstname:e.target.value})} />
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label={"Last Name : "+this.state.lastName} onChange={e => this.setState({lastName:e.target.value})}/>
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label={"Email : "+this.state.email} onChange={e => this.setState({email:e.target.value})}/>
              </Paper>
              <Paper className={classes.root} elevation={1}>
                <TextField label={"Company : "+this.state.company} onChange={e => this.setState({company:e.target.value})} />
              </Paper>
              
              {

                updateProfile(data.users.filter( e => {return e.email === data.me.email})[0]._id, {
                  firstName: this.state.firstName,
                  lastName:  this.state.lastName,
                  email: this.state.email,
                  company: this.state.company
                  }) 
                }
              
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

render() {
  return this.ProfilPage();
}

}

const profil = gql`
query {
  me{
    firstName,
    lastName,
    email,
    company,

  },
  users{
    email,
    _id
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
