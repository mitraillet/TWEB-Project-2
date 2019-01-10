import React from 'react';
import { AuthContext } from './AuthProvider';
import { Button } from '@material-ui/core';

const direStyles = { maxWidth: 600, margin: 'auto', textAlign: 'center'};

const HomePage = () => (
  <AuthContext>
    {({ signOut }) => (
      <div>
        <Button onClick={signOut}>LOGOUT</Button>
        <Button size="large" variant="outlined" onClick={''} style={direStyles} >Mon Profil</Button>
        <Button size="large" variant="outlined" onClick={''} style={direStyles} >Conversation</Button>
        <Button size="large" variant="outlined" onClick={''} style={direStyles} >Mes Projets</Button>
        <Button size="large" variant="outlined" onClick={''} style={direStyles} >Propositions</Button>
      </div>
    )}
  </AuthContext>
);
  
export default HomePage;