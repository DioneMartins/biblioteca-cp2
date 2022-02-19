import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../router/Router';
import { deleteUser, checkUserTime, checkIfUserExists, getUserAttribute } from '../api/login';
import { getAuth, signOut } from 'firebase/auth';
import './App.css';
import './Vars.css';

const App = () => {
  useEffect(() => {
    checkUserTime();

    const warnUser = (event) => {
      if (checkIfUserExists() && !getUserAttribute('keepLogin')) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };

    const deleteUserIfDontKeep = (e) => {
      if (checkIfUserExists() && !getUserAttribute('keepLogin')) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            deleteUser();
          })
          .catch((error) => {
            return '';
          });
      }
    };

    window.addEventListener('beforeunload', warnUser);
    window.addEventListener('unload', deleteUserIfDontKeep);
    return () => window.removeEventListener('beforeunload', warnUser);
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
