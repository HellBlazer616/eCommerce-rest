import React from 'react';
import { Router } from '@reach/router';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Product from './Product';

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
};

function App() {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <Landing path="/" />
          <Register path="register" />
          <Login path="login" />
          <Product path="product" />
        </Router>
      </Provider>
    </>
  );
}

export default App;
