import React from 'react';
import { Header, Navbar, HomeCards, Unfinished } from '../../components';

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <HomeCards />
      <Unfinished
        pageName="Futuro componente do rodapé."
        message={['Direito de uso', 'Github', 'Email de contato', 'Autores']}
        respDev="Daniel"
        devOrder="1"
      />
    </div>
  );
}
