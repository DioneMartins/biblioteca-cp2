import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginComponent() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debugLoggedMessage, setDebug] = useState('Não logado');

  function handleLoginRequest() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDebug('Logado');
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <>
      <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={(e) => handleLoginRequest()}>Login</button>
      <p>{debugLoggedMessage}</p>
    </>
  );
}
