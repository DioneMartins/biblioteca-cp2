import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, setPersistence } from 'firebase/auth';
import { saveUser } from '../../api/login';
import styles from './LoginComponent.module.css';

const {
  loginWrapper,
  loginMessage,
  loginEmailInput,
  loginPasswordInput,
  loginKeep,
  loginButton,
  loginWarning,
} = styles;

export default function LoginComponent(props) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);

  function handleLoginRequest() {
    const auth = getAuth();
    if (keepLogin) setPersistence(auth, 'local');
    else setPersistence(auth, 'session');
    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleLogin(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        pickErrorMessage(errorCode);
      });
  }

  async function handleLogin(user) {
    saveUser(user.uid, user.displayName, keepLogin);
    props.changer('Log in');
  }

  function pickErrorMessage(codedError) {
    switch (codedError) {
      default:
        setErrorMessage(codedError);
        break;
      case 'auth/invalid-email':
        setErrorMessage('Email inválido');
        break;
      case 'auth/internal-error':
        setErrorMessage('Insira a senha');
        break;
      case 'auth/user-not-found':
        setErrorMessage('Usuário não encontrado');
        break;
      case 'auth/wrong-password':
        setErrorMessage('Senha incorreta');
        break;
    }
  }

  return (
    <div className={loginWrapper}>
      <p className={loginMessage}>O login só está disponível para administradores</p>
      <label htmlFor="user">Usuário:</label>
      <input
        id="user"
        className={loginEmailInput}
        type="text"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <label htmlFor="pass">Senha:</label>
      <input
        id="pass"
        className={loginPasswordInput}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={loginKeep}>
        <input
          id="keepLog"
          type="checkbox"
          checked={keepLogin}
          onChange={(e) => setKeepLogin(e.target.checked)}
        />
        <label htmlFor="keepLog">Lembrar de mim</label>
      </div>
      <button className={loginButton} onClick={(e) => handleLoginRequest()}>
        Login
      </button>
      <p className={loginWarning}>{errorMessage}</p>
    </div>
  );
}
