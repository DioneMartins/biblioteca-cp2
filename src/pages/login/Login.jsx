import React, { useEffect, useState } from 'react';
import { Navbar, LoginComponent, Logged } from '../../components';
import { checkIfUserExists } from '../../api/login';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [didChange, setDidChange] = useState('');

  useEffect(() => {
    setIsLoggedIn(checkIfUserExists());
  }, [didChange]);

  const receivedUpdate = (value) => {
    setDidChange(value);
  };

  return (
    <div>
      <Navbar />
      {isLoggedIn ? (
        <Logged changer={receivedUpdate} />
      ) : (
        <LoginComponent changer={receivedUpdate} />
      )}
    </div>
  );
}
