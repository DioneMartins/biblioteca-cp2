import React from 'react';
import { deleteUser, getUserAttribute } from '../../api/login';
import styles from './Logged.module.css';

const { loggedWrapper, loggedWelcome, loggedHello, loggedName, loggedButton } = styles;
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
          deleteUser();
          props.changer('Log out');
        }}
      >
        Logout
      </button>
    </div>
  );
}
