import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { changeLocalStorageName, getUserAttribute } from '../../../api/login';
import styles from './TextToUpdate.module.css';

const { loggedUpdateInfo, loggedUpdateName, loggedNameInput, loggedTextChangeName } = styles;

export default function TextToUpdate({ wasUpdated, desiredUpdate }) {
  const [passwordMessage, setPasswordMessage] = useState('Aguarde');
  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (desiredUpdate === 'password') {
      handleUpdatePassword();
    } else if (desiredUpdate === 'name') {
      setName(getUserAttribute('userName'));
    }
  }, [desiredUpdate]);

  function handleUpdatePassword() {
    const email = user.email;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setPasswordMessage('Email enviado!');
      })
      .catch((error) => {
        setPasswordMessage(error.code);
      });
  }

  function handleUpdateName() {
    updateProfile(user, { displayName: name }).then(() => {
      changeLocalStorageName();
      wasUpdated('New update');
      setNameMessage('Pronto!');
    });
  }
  return (
    <div className={loggedUpdateInfo}>
      {desiredUpdate === 'password' ? (
        <div>
          <p>{passwordMessage}</p>
        </div>
      ) : null}
      {desiredUpdate === 'name' ? (
        <div className={loggedUpdateName}>
          <div>
            <label htmlFor="name">Novo nome:</label>
            <input
              id="name"
              className={loggedNameInput}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className={loggedTextChangeName}
            onClick={(e) => {
              handleUpdateName();
            }}
          >
            Alterar
          </button>
          <p>{nameMessage}</p>
        </div>
      ) : null}
    </div>
  );
}

TextToUpdate.propTypes = {
  desiredUpdate: PropTypes.string.isRequired,
};
