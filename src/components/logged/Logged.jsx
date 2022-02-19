import React from 'react';
import { deleteUser, getUserAttribute } from '../../api/login';
import { changeName } from '../../api/api';
import { getAuth, signOut } from 'firebase/auth';
import styles from './Logged.module.css';

const {
  loggedWrapper,
  loggedWelcome,
  loggedHello,
  loggedName,
  loggedButton,
  loggedChangeName,
  loggedChangePassword,
} = styles;
export default function Logged(props) {
  return (
    <div className={loggedWrapper}>
      <div className={loggedWelcome}>
        <p className={loggedHello}>Olá, </p>
        <p className={loggedName}>{getUserAttribute('userName')}</p>
      </div>
      <button
        className={loggedButton}
        onClick={(e) => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              deleteUser();
              props.changer('Log out');
            })
            .catch((error) => {
              return '';
            });
        }}
      >
        Logout
      </button>
      <button
        className={loggedChangeName}
        onClick={(e) => {
          changeName(getUserAttribute('userUID'), 'newName');
        }}
      >
        Mudar nome
      </button>
      <button
        className={loggedChangePassword}
        onClick={(e) => {
          return '';
        }}
      >
        Mudar senha
      </button>
    </div>
  );
}
