import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthProvider from './AuthProvider';
import * as serviceWorker from './serviceWorker';
import Header from './Header';

ReactDOM.render(
  <BrowserRouter>
      <AuthProvider>
        <Header/>
        <App />
      </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
