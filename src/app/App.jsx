import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../router/Router';
import './App.css';
import './Vars.css';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
