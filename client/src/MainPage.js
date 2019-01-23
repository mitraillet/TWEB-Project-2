import React from 'react';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  container: {
    marginTop: theme.spacing.unit * 2,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

//
class MainPage extends React.Component {

  state = {
    index: 0,
    project: {
      name: 'name',
      amount: 'amount',
      description: 'description',
      timeEstimated: 'timeEstimated',
      status: 'status',
      deadline: 'deadline',
      customer: '{firstName: firstName, lastName: lastName}',
      technologies: 'react, GraphQL',
      _id: 'id'
    },
    technologies: 'react, GraphQL',
    customerID: 'id',
    pageLoaded: false
  }

  onClickPrev = (data) => {
    
    this.setState({
      index: ((this.state.index > 0 ? this.state.index : data.me.projectsApplicable.length)-1 ) % data.me.projectsApplicable.length,
      project: data.me.projectsApplicable[this.state.index],
      technologies: this.state.project.technologies,
      customerID: data.users.filter( e => {return e.email === data.me.email})[0]._id,
      pageLoaded: true
    });
  }

  onClickNext = (data) => {
    
    this.setState({
      index: (this.state.index +1 ) % data.me.projectsApplicable.length,
      project: data.me.projectsApplicable[this.state.index],
      technologies: this.state.project.technologies,
      customerID: data.users.filter( e => {return e.email === data.me.email})[0]._id,
      pageLoaded: true
    });
  }



  mainPage() {
    const { classes } = this.props;

    const buttonApplication = () => {
      return (
        <Mutation mutation={applicationMutation}>
          {(createApplication, { data }) => (
            <Paper className={classes.root} elevation={1}>
              <Button type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      const application = {
                        user: this.state.customerID,
                        project: this.state.project._id,
                        status: "Proposed"
                      }
                      if(true) {
                        console.log(this.state.customerID)
                        console.log(this.state.project._id)
                        createApplication({ variables: { application }})
                        window.location= '/';
                      }
                    }
                  }>
                <Typography variant="h5" component="h3">
                  Postuler
                </Typography>
              </Button>
            </Paper>
          )}
        </Mutation>
      );
    }

    const projectsListRecuperation = () => (
      <Query
        query={projectsList}
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

          if(data.me && data.me.projectsApplicable && data.me.projectsApplicable.length === 0) return (
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3">
                  Not project available, come back later!
              </Typography>
            </Paper>
          );

          if(!this.state.pageLoaded) this.onClickPrev(data);

          return (
            <div className={classes.container}>

            {
              //prev button
            }
            <Paper className={classes.root}  >
              <Button onClick={() => this.onClickPrev(data)}>
                <Typography variant="h5" component="h3"> 
                    Prev
                </Typography>
              </Button>
            </Paper>          

            {//globale
            }
            <Paper className={classes.root} elevation={1}>

              {//first 2 button
              }
              <div className={classes.container}>

                {//two horiz button
                }
                <Paper className={classes.root} elevation={1}>
                    <NavLink to='#'>
                    <Typography variant="h5" component="h3"> 
                        Non interessé
                    </Typography>
                    </NavLink>
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <NavLink to='#'>
                    <Typography variant="h5" component="h3">
                        Mettre en attente
                    </Typography>
                    </NavLink>
                </Paper>
              </div>

              
              {//partie centrale
              }
              <Paper className={classes.root}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                      {this.state.project.name}
                    </Typography>
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                      {this.state.project.description}
                    </Typography>
                </Paper>

                <div className={classes.container}>
                  <Paper className={classes.root} elevation={1}>
                      <Typography variant="h5" component="h3">
                        {this.state.project.amount}
                      </Typography>
                  </Paper>
                  <Paper className={classes.root} elevation={1}>
                      <Typography variant="h5" component="h3">
                        {this.state.project.customer.firstName},<br /> {this.state.project.customer.lastName}
                      </Typography>
                  </Paper>
                </div>

              
                <div className={classes.container}>
                  
                  {this.state.technologies.split(",").map((value) => {
                    return (
                      <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            {value}
                        </Typography>
                    </Paper>
                    )
                  })}
                </div>

              </Paper>

              {//last button
              }
              {buttonApplication()}
              </Paper>
            {
              //next button
            }
            <Paper className={classes.root} elevation={1}>
              <Button onClick={() => this.onClickNext(data)}>
                <Typography variant="h5" component="h3"> 
                    Next
                </Typography>
              </Button>
            </Paper>

          </div>
          );
        }
        }
      </Query>
    );

    return (
      <AuthContext>
        {() => {
          return projectsListRecuperation();

        }}
      </AuthContext>
    )
  }

  render() {
    return this.mainPage();
  }
}

const projectsList = gql`
query {
  me{
    email,
    projectsApplicable{
        name,
        amount,
        description,
        timeEstimated,
        status,
        deadline,
        _id,
        customer {
          firstName,
          lastName
        },
        technologies
    }
  },
  users{
    email,
    _id
  }
}
`;

const applicationMutation = gql`
  mutation($application: CreateApplicationInput!) {
    createApplication(application: $application) {
      _id
    }
  }
`;


MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withRouter(MainPage));
