import React, { useState, useEffect } from 'react';
import { deleteUser, getUserAttribute } from '../../api/login';
import { getAuth, signOut } from 'firebase/auth';
import TextToUpdate from './textToUpdate/TextToUpdate';
import styles from './Logged.module.css';
import { Link } from 'react-router-dom';

const {
  loggedWrapper,
  loggedWelcome,
  loggedHello,
  loggedName,
  loggedButton,
  loggedChangeName,
  loggedChangePassword,
  loggedAddBookWrapper,
  loggedAddBook,
} = styles;

export default function Logged(props) {
  const [desiredTextUpdate, setDesiredTextUpdate] = useState('');
  const [userName, setUserName] = useState('');
  const [didChange, setDidChange] = useState([]);

  useEffect(() => {
    setUserName(getUserAttribute('userName'));
  }, [didChange]);

  const receivedUpdate = (value) => {
    setDidChange((didChange) => [...didChange, value]);
  };

  return (
    <div className={loggedWrapper}>
      <div className={loggedWelcome}>
        <p className={loggedHello}>Olá, </p>
        <p className={loggedName}>{userName}</p>
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
          setDesiredTextUpdate('name');
        }}
      >
        Mudar nome
      </button>
      <button
        className={loggedChangePassword}
        onClick={(e) => {
          setDesiredTextUpdate('password');
        }}
      >
        Mudar senha
      </button>
      <div className={loggedAddBookWrapper}>
        <Link className={loggedAddBook} to={'/novolivro'}>
          Adicionar livro
        </Link>
      </div>
      <TextToUpdate wasUpdated={receivedUpdate} desiredUpdate={desiredTextUpdate} />
    </div>
  );
}
