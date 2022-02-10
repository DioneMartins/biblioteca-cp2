import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from './LoginComponent.module.css';

const {
  loginWrapper,
  loginMessage,
  loginEmailInput,
  loginPasswordInput,
  loginButton,
  loginWarning,
} = styles;

export default function LoginComponent() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleLoginRequest() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        pickErrorMessage(errorCode);
      });
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
      <button className={loginButton} onClick={(e) => handleLoginRequest()}>
        Login
      </button>
      <p className={loginWarning}>{errorMessage}</p>
    </div>
  );
}
