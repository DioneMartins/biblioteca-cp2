import React from 'react';
import { Navbar, LoginComponent, Unfinished } from '../../components';

export default function Login() {
  return (
    <div>
      <Navbar />
      <LoginComponent />
      <Unfinished
        pageName="Futuro componente de login. Prioridade: 6"
        message={[
          'Login só está disponível para administradores',
          'Usuário',
          'Input',
          'Senha',
          'Button: Login',
        ]}
      />
    </div>
  );
}
