import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../router/Router';
import { deleteUser, checkUserTime, getUserAttribute } from '../api/login';
import './App.css';
import './Vars.css';

const App = () => {
  useEffect(() => {
    checkUserTime();

    function deleteUserIfDontKeep() {
      if (!getUserAttribute('keepLogin')) deleteUser();
    }

    window.addEventListener('beforeunload', deleteUserIfDontKeep());
    return () => window.removeEventListener('beforeunload', deleteUserIfDontKeep());
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
