import React from 'react';
import { AuthContext } from './AuthProvider';
import { Button } from '@material-ui/core';

const direStyles = { maxWidth: 600, margin: 'auto', textAlign: 'center'};

const HomePage = () => (
  <AuthContext>
    {({ signOut }) => (
      <div>
        <Button onClick={signOut}>LOGOUT</Button>
        
      </div>
    )}
  </AuthContext>
);
  
export default HomePage;