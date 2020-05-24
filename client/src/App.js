import React from 'react';
import { Router } from '@reach/router';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Product from './Product';

function App() {
  return (
    <>
      <Router>
        <Landing path="/" />
        <Register path="register" />
        <Login path="login" />
        <Product path="product" />
      </Router>
    </>
  );
}

export default App;
