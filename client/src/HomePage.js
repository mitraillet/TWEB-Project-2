import React from 'react';
import { AuthContext } from './AuthProvider';
import { Button } from '@material-ui/core';

const HomePage = () => (
  <AuthContext>
    {({ signOut }) => (
      <div>
        <Button onClick={signOut}>LOGOUT</Button>
        <div className="container">
          <div classname="sublimeDiv" onClick={''} >Mon Profil</div>
          <div classname="sublimeDiv" onClick={''} >Conversation</div>
          <div classname="sublimeDiv" onClick={''} >Mes Projets</div>
          <div classname="sublimeDiv" onClick={''} >Propositions</div>
        </div>
        
      </div>
    )}
  </AuthContext>
);
  
export default HomePage;