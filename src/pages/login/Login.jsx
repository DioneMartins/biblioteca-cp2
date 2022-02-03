import React from 'react';
import { Navbar, LoginComponent, Unfinished } from '../../components';

export default function Login() {
  return (
    <div>
      <Navbar />
      <LoginComponent />
      <Unfinished
        pageName="Futuro componente de login."
        message={['Login só está disponível para administradores']}
        respDev="Argo"
        devOrder="In Development"
      />
    </div>
  );
}
