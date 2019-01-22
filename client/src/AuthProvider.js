import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';


const {
  Provider: AuthContextProvider,
  Consumer: AuthContext,
} = React.createContext();

class AuthProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      user: null,
      error: null,
      signIn: this.signIn,
      signOut: this.signOut,
    }
  }

  componentDidMount() {
    this.props.client.query({
      query: meQuery
    }).then(res => {
      this.setState( {user: res.data.me} )
    });
  }

  signIn = ({ username, password }) => {
    let email = username;
    this.props.login({
      variables: { email,password },
    }).then(response => {
        this.setState({user : response.data.login});
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: 'Invalid username or password' });
      })
}

  signOut = () => {
    this.props.logout().then(() => {
      this.setState({user : null});
      window.location= '/login';
    });
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContextProvider value={this.state}>
        {children}
      </AuthContextProvider>
    )
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!){
    login(email: $email, password: $password){
      firstName
      lastName
      email
      company
    }
  }
`;

const logoutMutation = gql`
  mutation{
    logout
  }
`;

const meQuery = gql`
  query {
    me{
      firstName
      lastName
      email
      company
      projectsProposed { 
        _id
        name
        applications { 
        messages{body} }
      }
      applications { 
      project{
        _id
        name}
      messages{body}
      }
    }
  }
`;
export { AuthContext};
export default compose(
  withApollo,
  graphql(loginMutation, {name: 'login'}),
  graphql(logoutMutation, {name: 'logout'}),
  )(AuthProvider);
