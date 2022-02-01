import React from 'react';
import { Navbar, Unfinished } from '../../components';

export default function Login() {
  return (
    <div>
      <Navbar />
      <Unfinished
        pageName="Futuro componente de login. Prioridade: 6"
        message={[
          'Login só está disponível para administradores',
          'Usuário',
          'Input',
          'Senha',
          'Input',
          'Button: Login',
        ]}
      />
    </div>
  );
}
